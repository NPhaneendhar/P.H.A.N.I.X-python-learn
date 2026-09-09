#!/usr/bin/env python3
import urllib.request
import urllib.error
import json
import time
import subprocess
import sys
import os

def run_tests():
    print("Starting automated test verification for PyLearn...")
    
    # 1. Start server in a subprocess
    port = 8085
    proc = subprocess.Popen([sys.executable, "server.py", str(port)], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(1.2) # Allow server to bind

    base_url = f"http://127.0.0.1:{port}"
    passed = True

    try:
        # Test 1: GET / (index.html)
        print("\n[Test 1] Fetching root index.html...")
        req = urllib.request.Request(f"{base_url}/")
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            assert resp.status == 200
            assert "Phanix" in content
            assert "code-editor" in content
            print("  ✓ Root page served successfully with status 200 and expected markup")

        # Test 2: GET /api/curriculum
        print("\n[Test 2] Fetching /api/curriculum...")
        with urllib.request.urlopen(f"{base_url}/api/curriculum") as resp:
            curriculum = json.loads(resp.read().decode("utf-8"))
            assert len(curriculum) >= 10, f"Expected 10 modules, got {len(curriculum)}"
            first_lesson = curriculum[0]["lessons"][0]
            assert "quiz" in first_lesson
            assert "challenge" in first_lesson
            print(f"  ✓ Curriculum loaded successfully ({len(curriculum)} modules, verified lessons, quizzes, challenges)")

        # Test 3: GET /api/cheatsheet
        print("\n[Test 3] Fetching /api/cheatsheet...")
        with urllib.request.urlopen(f"{base_url}/api/cheatsheet") as resp:
            cheatsheet = json.loads(resp.read().decode("utf-8"))
            assert len(cheatsheet) >= 5
            print(f"  ✓ Cheatsheet loaded successfully ({len(cheatsheet)} categories)")

        # Test 4: POST /api/run
        print("\n[Test 4] Testing Python code execution (/api/run)...")
        run_data = json.dumps({"code": "a = [10, 20, 30]\nprint('Sum is:', sum(a))"}).encode("utf-8")
        req = urllib.request.Request(f"{base_url}/api/run", data=run_data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            assert result["stdout"].strip() == "Sum is: 60"
            assert result["exit_code"] == 0
            print(f"  ✓ Code executed cleanly in {result['duration_ms']}ms: {result['stdout'].strip()}")

        # Test 5: POST /api/run with syntax error
        print("\n[Test 5] Testing error handling (/api/run)...")
        err_data = json.dumps({"code": "print('missing quote)"}).encode("utf-8")
        req = urllib.request.Request(f"{base_url}/api/run", data=err_data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            assert result["exit_code"] != 0
            assert "SyntaxError" in result["stderr"]
            print("  ✓ Syntax error properly caught and returned in stderr")

        # Test 6: POST /api/run with infinite loop timeout
        print("\n[Test 6] Testing execution timeout protection...")
        loop_data = json.dumps({"code": "while True:\n    pass"}).encode("utf-8")
        req = urllib.request.Request(f"{base_url}/api/run", data=loop_data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            assert "timed out" in result["stderr"]
            print("  ✓ Infinite loop safely intercepted with timeout error")

        # Test 7: POST /api/test (automated test evaluator)
        print("\n[Test 7] Testing Challenge Test Evaluation (/api/test)...")
        solution_code = 'print("Coding with Python")\nprint("Level 1 Complete")'
        test_payload = json.dumps({
            "code": solution_code,
            "lesson_id": "lesson-1-1"
        }).encode("utf-8")
        req = urllib.request.Request(f"{base_url}/api/test", data=test_payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            eval_result = json.loads(resp.read().decode("utf-8"))
            assert eval_result["all_passed"] is True, f"Expected all_passed=True, got {eval_result}"
            print("  ✓ Challenge test runner evaluated solution: ALL TESTS PASSED!")

        print("\n========================================================")
        print(" 🎉 ALL AUTOMATED BACKEND & FRONTEND TESTS PASSED (7/7)!")
        print("========================================================")

    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        passed = False
    finally:
        proc.terminate()
        proc.wait()

    sys.exit(0 if passed else 1)

if __name__ == "__main__":
    run_tests()
