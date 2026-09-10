"""Vercel Function: serves the Python cheat sheet as JSON."""

import json
from http.server import BaseHTTPRequestHandler
from pathlib import Path


DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "cheatsheet.json"


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self._send_json(200, json.loads(DATA_FILE.read_text(encoding="utf-8")))
        except Exception:
            self._send_json(500, {"error": "Cheat sheet data is unavailable."})

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
