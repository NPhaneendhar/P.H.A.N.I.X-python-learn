"""Vercel Function: executes learner code in an isolated Vercel Sandbox."""

import io
import json
import logging
import subprocess
import time
from datetime import timedelta
from http.server import BaseHTTPRequestHandler

from vercel.api import session
from vercel.sandbox import NetworkPolicy
from vercel.sandbox import sync as sandbox


MAX_REQUEST_BYTES = 64 * 1024
MAX_CODE_BYTES = 50 * 1024
MAX_INPUT_BYTES = 8 * 1024
MAX_OUTPUT_CHARS = 12_000
EXECUTION_TIMEOUT_SECONDS = 3.5
SANDBOX_SESSION_SECONDS = 7


class RequestError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


class CappedTextOutput(io.StringIO):
    """Keep response memory bounded even if submitted code prints continuously."""

    def __init__(self, limit=MAX_OUTPUT_CHARS):
        super().__init__()
        self.limit = limit
        self.truncated = False

    def write(self, value):
        value = str(value)
        remaining = max(0, self.limit - self.tell())
        if remaining:
            super().write(value[:remaining])
        if len(value) > remaining:
            self.truncated = True
        return len(value)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            request = self._read_json_request()
            code, stdin_input = self._get_code_and_input(request)
        except RequestError as error:
            self._send_json(error.status, {"error": str(error)})
            return

        try:
            self._send_json(200, self._execute(code, stdin_input))
        except Exception:
            # Do not return SDK, credential, or infrastructure details to callers.
            logging.exception("Sandbox execution failed")
            self._send_json(503, {"error": "The code runner is temporarily unavailable."})

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def _read_json_request(self):
        raw_length = self.headers.get("Content-Length")
        if raw_length is None:
            raise RequestError(411, "Content-Length is required.")
        try:
            size = int(raw_length)
        except ValueError:
            raise RequestError(400, "Invalid Content-Length.")
        if size < 0:
            raise RequestError(400, "Invalid Content-Length.")
        if size > MAX_REQUEST_BYTES:
            raise RequestError(413, "Request is too large.")
        try:
            request = json.loads(self.rfile.read(size) or b"{}")
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise RequestError(400, "Send a valid JSON request.")
        if not isinstance(request, dict):
            raise RequestError(400, "Send a JSON object.")
        return request

    @staticmethod
    def _get_code_and_input(request):
        code = request.get("code", "")
        stdin_input = request.get("input")
        if stdin_input is None:
            stdin_input = request.get("stdin", "")
        if not isinstance(code, str) or not isinstance(stdin_input, str):
            raise RequestError(400, "Code and input must be strings.")
        if len(code.encode("utf-8")) > MAX_CODE_BYTES:
            raise RequestError(413, "Code is too large.")
        if len(stdin_input.encode("utf-8")) > MAX_INPUT_BYTES:
            raise RequestError(413, "Input is too large.")
        return code, stdin_input

    def _execute(self, code, stdin_input):
        if not code.strip():
            return {"stdout": "", "stderr": "", "exit_code": 0, "duration_ms": 0}

        stdout = CappedTextOutput()
        stderr = CappedTextOutput()
        # User code runs in an ephemeral microVM with no app files, credentials,
        # or network access. Never pass the function's environment into it.
        with session():
            with sandbox.create_sandbox(
                persistent=False,
                execution_time_limit=timedelta(seconds=SANDBOX_SESSION_SECONDS),
                network_policy=NetworkPolicy.deny_all(),
            ) as box:
                box.fs.write_text("main.py", code)
                run_started = time.perf_counter()
                result = box.run_process(
                    "python",
                    ["-I", "-u", "main.py"],
                    input=stdin_input,
                    kill_after=EXECUTION_TIMEOUT_SECONDS,
                    stdout=stdout,
                    stderr=stderr,
                    check=False,
                )
                duration_ms = round((time.perf_counter() - run_started) * 1000, 2)

        needs_input = "EOFError: EOF when reading a line" in stderr.getvalue()
        timed_out = result.returncode in (-9, 137) or duration_ms >= EXECUTION_TIMEOUT_SECONDS * 1000
        clean_stderr = "" if needs_input else stderr.getvalue()
        exit_code = 0 if needs_input else result.returncode
        if timed_out:
            clean_stderr = "Execution timed out (3.5 seconds). Avoid infinite loops!"
            exit_code = -1

        stdout_text = stdout.getvalue()
        if stdout.truncated:
            stdout_text += "\n[Output truncated at the safety limit.]"
        if stderr.truncated and clean_stderr:
            clean_stderr += "\n[Error output truncated at the safety limit.]"

        return {
            "stdout": stdout_text,
            "stderr": clean_stderr,
            "exit_code": exit_code,
            "duration_ms": duration_ms,
            "needs_input": needs_input,
            "output_truncated": stdout.truncated or stderr.truncated,
        }

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
