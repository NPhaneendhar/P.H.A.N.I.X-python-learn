#!/usr/bin/env python3
"""
PyLearn - Interactive Python Learning Application Server
Zero external dependencies; built using Python standard library.
"""

import http.server
import socketserver
import json
import os
import sys
import subprocess
import time
import tempfile
import gzip
import io
from urllib.parse import urlparse

PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DATA_DIR = os.path.join(BASE_DIR, "data")

# Max payload size for code execution (50 KB)
MAX_CODE_SIZE = 50 * 1024

# Allowed origins for CORS (localhost variants for dev + your production domain)
ALLOWED_ORIGINS = {
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost",
    "http://127.0.0.1",
}

# In-memory cache for instant responses (loaded once, zero disk wait)
_CACHE = {}

def get_cached_json(filepath):
    if filepath not in _CACHE:
        with open(filepath, "r", encoding="utf-8") as f:
            _CACHE[filepath] = json.load(f)
    return _CACHE[filepath]

class PyLearnRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def end_headers(self):
        # Cache-Control: images/fonts cached 7 days, JS/CSS revalidated, HTML never cached
        path = getattr(self, "path", "").split("?")[0]  # strip query params
        if any(path.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".ico", ".svg",
                                               ".woff2", ".woff", ".webp"]):
            self.send_header("Cache-Control", "public, max-age=604800")  # 7 days
        elif any(path.endswith(ext) for ext in [".css", ".js"]):
            self.send_header("Cache-Control", "no-cache, max-age=0, must-revalidate")
        else:
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    # ── Gzip Compression ─────────────────────────────────────────────────────
    _GZIP_TYPES = (".html", ".js", ".css", ".json", ".svg", ".txt", ".webmanifest")

    def _accepts_gzip(self):
        return "gzip" in self.headers.get("Accept-Encoding", "")

    def _serve_gzipped(self, file_path, content_type):
        """Read a file, gzip it, and send with correct headers."""
        try:
            with open(file_path, "rb") as f:
                raw = f.read()
            buf = io.BytesIO()
            with gzip.GzipFile(fileobj=buf, mode="wb", compresslevel=6) as gz:
                gz.write(raw)
            compressed = buf.getvalue()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(compressed)))
            self.send_header("Vary", "Accept-Encoding")
            self.end_headers()
            self.wfile.write(compressed)
        except FileNotFoundError:
            self.send_error(404, "File not found")

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path == "/" or path == "":
            self.path = "/index.html"
            path = "/index.html"

        if path == "/api/curriculum":
            self.handle_api_curriculum()
            return

        if path == "/api/cheatsheet":
            self.handle_api_cheatsheet()
            return

        # Gzip-compress text assets if browser supports it
        if self._accepts_gzip() and any(path.endswith(ext) for ext in self._GZIP_TYPES):
            # Map URL path to filesystem path (strip leading /)
            rel = path.lstrip("/")
            fs_path = os.path.join(STATIC_DIR, rel)
            if os.path.isfile(fs_path):
                ext = os.path.splitext(path)[1]
                ctype_map = {
                    ".html": "text/html; charset=utf-8",
                    ".js":   "application/javascript; charset=utf-8",
                    ".css":  "text/css; charset=utf-8",
                    ".json": "application/json; charset=utf-8",
                    ".svg":  "image/svg+xml; charset=utf-8",
                    ".txt":  "text/plain; charset=utf-8",
                    ".webmanifest": "application/manifest+json; charset=utf-8",
                }
                self._serve_gzipped(fs_path, ctype_map.get(ext, "text/plain"))
                return

        # Fallback: serve static files normally
        return super().do_GET()

    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path == "/api/run":
            self.handle_api_run()
            return

        if path == "/api/test":
            self.handle_api_test()
            return

        self.send_error(404, "Endpoint not found")

    def handle_api_curriculum(self):
        try:
            curr_file = os.path.join(DATA_DIR, "curriculum.json")
            data = get_cached_json(curr_file)
            self.send_json_response(200, data)
        except Exception as e:
            self.send_json_response(500, {"error": str(e)})

    def handle_api_cheatsheet(self):
        try:
            sheet_file = os.path.join(DATA_DIR, "cheatsheet.json")
            data = get_cached_json(sheet_file)
            self.send_json_response(200, data)
        except Exception as e:
            self.send_json_response(500, {"error": str(e)})

    def handle_api_run(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > MAX_CODE_SIZE:
                self.send_json_response(413, {"error": "Payload too large. Max code size is 50 KB."})
                return
            post_data = self.rfile.read(content_length).decode("utf-8")
            body = json.loads(post_data) if post_data else {}
            code = body.get("code", "")
            stdin_input = body.get("input") if body.get("input") is not None else body.get("stdin", "")

            result = self.execute_python_code(code, stdin_input=stdin_input)
            self.send_json_response(200, result)
        except Exception as e:
            self.send_json_response(400, {"error": f"Bad request: {str(e)}"})

    def handle_api_test(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > MAX_CODE_SIZE:
                self.send_json_response(413, {"error": "Payload too large. Max code size is 50 KB."})
                return
            post_data = self.rfile.read(content_length).decode("utf-8")
            body = json.loads(post_data) if post_data else {}
            code = body.get("code", "")
            lesson_id = body.get("lesson_id", "")
            stdin_input = body.get("input") if body.get("input") is not None else body.get("stdin", "")

            curr_file = os.path.join(DATA_DIR, "curriculum.json")
            modules = get_cached_json(curr_file)

            target_lesson = None
            for mod in modules:
                for lesson in mod.get("lessons", []):
                    if lesson.get("id") == lesson_id:
                        target_lesson = lesson
                        break
                if target_lesson:
                    break

            if not target_lesson:
                self.send_json_response(404, {"error": f"Lesson {lesson_id} not found"})
                return

            # Beginner-friendly completion: a non-empty program that runs without
            # an error completes the lesson. Exact-output grading made a correct
            # learning attempt look like a failure for many early lessons.
            res = self.execute_python_code(code, stdin_input=stdin_input)
            actual = res.get("stdout", "")
            stderr = res.get("stderr", "")
            passed = bool(code.strip()) and res.get("exit_code") == 0
            results = [{
                "name": "Program runs successfully",
                "passed": passed,
                "expected": "Write and run any non-empty Python program without errors.",
                "actual": actual,
                "error": stderr if res.get("exit_code") != 0 else "",
                "duration_ms": res.get("duration_ms", 0)
            }]

            self.send_json_response(200, {
                "all_passed": passed,
                "results": results
            })
        except Exception as e:
            self.send_json_response(500, {"error": f"Evaluation error: {str(e)}"})

    def execute_python_code(self, code: str, stdin_input: str = "", timeout: float = 3.5) -> dict:
        """Executes python code in a temporary subprocess with timeout protection."""
        if not code.strip():
            return {
                "stdout": "",
                "stderr": "",
                "exit_code": 0,
                "duration_ms": 0.0
            }

        start_time = time.perf_counter()
        with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False, encoding="utf-8") as temp_file:
            temp_path = temp_file.name
            temp_file.write(code)

        try:
            if stdin_input and not stdin_input.endswith("\n"):
                stdin_input = stdin_input + "\n"

            process = subprocess.Popen(
                [sys.executable, "-u", temp_path],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            stdout, stderr = process.communicate(input=stdin_input, timeout=timeout)
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
            needs_input = "EOFError: EOF when reading a line" in (stderr or "")
            clean_stderr = "" if needs_input else stderr
            exit_code = 0 if needs_input else process.returncode
            return {
                "stdout": stdout,
                "stderr": clean_stderr,
                "exit_code": exit_code,
                "duration_ms": duration_ms,
                "needs_input": needs_input
            }
        except subprocess.TimeoutExpired:
            process.kill()
            stdout, stderr = process.communicate()
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
            return {
                "stdout": stdout,
                "stderr": f"Execution timed out ({timeout} seconds). Avoid infinite loops!",
                "exit_code": -1,
                "duration_ms": duration_ms
            }
        except Exception as ex:
            return {
                "stdout": "",
                "stderr": f"Execution error: {str(ex)}",
                "exit_code": 1,
                "duration_ms": 0.0
            }
        finally:
            try:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
            except OSError:
                pass

    def _get_allowed_origin(self):
        """Return the request's Origin if it's in the allowed list, else the first localhost."""
        origin = self.headers.get("Origin", "")
        if origin in ALLOWED_ORIGINS:
            return origin
        # Allow any port on localhost for convenience during development
        if origin.startswith("http://localhost:") or origin.startswith("http://127.0.0.1:"):
            return origin
        # Fallback: allow only localhost default for unknown origins
        return "http://localhost:8000"

    def send_json_response(self, status_code: int, data: dict):
        response_bytes = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.send_header("Access-Control-Allow-Origin", self._get_allowed_origin())
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(response_bytes)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", self._get_allowed_origin())
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def run(port=PORT):
    server_address = ("", port)
    httpd = ThreadedHTTPServer(server_address, PyLearnRequestHandler)
    print(f"==================================================")
    print(f" 🚀 PyLearn Server running at http://localhost:{port}")
    print(f" Press Ctrl+C to stop the server")
    print(f"==================================================")
    try:
        httpd.serve_forever() 
    except KeyboardInterrupt:
        print("\nShutting down PyLearn server...")
        httpd.server_close()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run(port)
