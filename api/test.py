"""Vercel Function: verifies that a learner program runs successfully."""

import json
from http.server import BaseHTTPRequestHandler
from run import handler as RunHandler


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            size = int(self.headers.get("Content-Length", "0"))
            request = json.loads(self.rfile.read(size) or b"{}")
            code = request.get("code", "")
            runner = RunHandler.__new__(RunHandler)
            result = runner._execute(code, "")
            passed = bool(isinstance(code, str) and code.strip()) and result["exit_code"] == 0
            self._send_json(200, {
                "all_passed": passed,
                "results": [{
                    "name": "Program runs successfully",
                    "passed": passed,
                    "expected": "Write and run any non-empty Python program without errors.",
                    "actual": result["stdout"],
                    "error": result["stderr"] if not passed else "",
                    "duration_ms": result["duration_ms"],
                }],
            })
        except (ValueError, json.JSONDecodeError):
            self._send_json(400, {"error": "Send a valid JSON request."})

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

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
