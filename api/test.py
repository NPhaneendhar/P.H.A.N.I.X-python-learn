"""Vercel Function: verifies a learner program in an isolated sandbox."""

from run import RequestError, handler as RunHandler


class handler(RunHandler):
    def do_POST(self):
        try:
            request = self._read_json_request()
            code, stdin_input = self._get_code_and_input(request)
        except RequestError as error:
            self._send_json(error.status, {"error": str(error)})
            return

        try:
            result = self._execute(code, stdin_input)
            passed = bool(code.strip()) and result["exit_code"] == 0
            self._send_json(200, {
                "all_passed": passed,
                "results": [{
                    "name": "Program runs successfully",
                    "passed": passed,
                    "expected": "Write and run any non-empty Python program without errors.",
                    "actual": result["stdout"],
                    "error": result["stderr"] if not passed else "",
                    "duration_ms": result["duration_ms"],
                    "output_truncated": result.get("output_truncated", False),
                }],
            })
        except Exception:
            self._send_json(503, {"error": "The code runner is temporarily unavailable."})
