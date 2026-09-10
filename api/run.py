"""Vercel Function: executes a short learner Python program."""

import json
import os
import subprocess
import sys
import tempfile
import time
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            size = int(self.headers.get("Content-Length", "0"))
            request = json.loads(self.rfile.read(size) or b"{}")
            self._send_json(200, self._execute(request.get("code", ""), request.get("input", "")))
        except (ValueError, json.JSONDecodeError):
            self._send_json(400, {"error": "Send a valid JSON request."})

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def _execute(self, code, stdin_input):
        if not isinstance(code, str) or not code.strip():
            return {"stdout": "", "stderr": "", "exit_code": 0, "duration_ms": 0}
        started = time.perf_counter()
        temp_path = None
        try:
            with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False, encoding="utf-8") as file:
                file.write(code)
                temp_path = file.name
            completed = subprocess.run(
                [sys.executable, "-u", temp_path], input=str(stdin_input), text=True,
                capture_output=True, timeout=3.5, check=False
            )
            return {
                "stdout": completed.stdout,
                "stderr": completed.stderr,
                "exit_code": completed.returncode,
                "duration_ms": round((time.perf_counter() - started) * 1000, 2),
            }
        except subprocess.TimeoutExpired:
            return {"stdout": "", "stderr": "Execution timed out (3.5 seconds). Avoid infinite loops!", "exit_code": -1, "duration_ms": round((time.perf_counter() - started) * 1000, 2)}
        finally:
            if temp_path and os.path.exists(temp_path):
                os.remove(temp_path)

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(body)
