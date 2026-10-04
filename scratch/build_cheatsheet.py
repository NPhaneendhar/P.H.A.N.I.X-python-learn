import json

CATEGORIES = [
    {
        "category": "Basic Syntax & Data Types",
        "icon": "🔤",
        "desc": "Variables, naming rules, data types, type casting, and comments.",
        "items": [
            {
                "name": "Variables & Dynamic Typing",
                "desc": "Assign values to names. Python dynamically detects the data type.",
                "use_case": "Storing user profile details, flags, scores, and calculated results.",
                "examples": [
                    {"label": "Basics", "code": "name = 'Phani'\nage = 24\nis_active = True\nscore = 98.5\nprint(f'{name} ({age}) - Active: {is_active}')"},
                    {"label": "Multiple Assignment", "code": "x, y, z = 10, 20, 30\nstatus, code = 'OK', 200\nprint(x + y + z, status, code)"}
                ]
            },
            {
                "name": "Type Checking & Casting",
                "desc": "Check types with type() and convert between int, float, str, and bool.",
                "use_case": "Converting text inputs into numbers before calculations.",
                "examples": [
                    {"label": "Conversion", "code": "text_val = '142'\nnum = int(text_val)\nprice = float('19.99')\nprint(type(num), num * 2, price)"},
                    {"label": "Truthiness", "code": "print(bool(0), bool(1))       # False, True\nprint(bool(''), bool('text'))  # False, True\nprint(bool([]), bool([1, 2]))  # False, True"}
                ]
            },
            {
                "name": "Numbers & Arithmetic",
                "desc": "Integers, floats, division, modulo, and exponents.",
                "use_case": "Calculations, finance, counters, and statistics.",
                "examples": [
                    {"label": "Operators", "code": "a, b = 15, 4\nprint(a + b)   # 19 (add)\nprint(a / b)   # 3.75 (float div)\nprint(a // b)  # 3 (integer div)\nprint(a % b)   # 3 (remainder)\nprint(a ** b)  # 50625 (exponent)"},
                    {"label": "Rounding & Abs", "code": "pi = 3.14159265\nprint(round(pi, 2))  # 3.14\nprint(abs(-42))      # 42"}
                ]
            },
            {
                "name": "Comments & Docstrings",
                "desc": "Single-line comments with # and multi-line documentation with triple quotes.",
                "use_case": "Documenting code, function parameters, and algorithms.",
                "examples": [
                    {"label": "Syntax", "code": "# Single line explanation\ndef compute_hash(data):\n    \"\"\"Return secure SHA-256 hash.\"\"\"\n    return f'hash_{len(data)}'\n\nprint(compute_hash.__doc__)"},
                    {"label": "Multi-line", "code": "\"\"\"\nAuthor: Phaneendhar Nittala\nProject: PyLearn Platform\nVersion: 4.8\n\"\"\"\nprint('Documentation ready')"}
                ]
            },
            {
                "name": "Type Hints & Annotations",
                "desc": "Specify expected argument and return types for clarity and IDE tools.",
                "use_case": "Building robust, maintainable libraries and APIs.",
                "examples": [
                    {"label": "Functions", "code": "def calculate_risk(ip: str, port: int) -> dict:\n    return {'ip': ip, 'port': port, 'safe': port != 23}\n\nres = calculate_risk('192.168.1.1', 80)\nprint(res)"},
                    {"label": "Variables", "code": "user_id: int = 1001\ntags: list[str] = ['admin', 'forensics']\nprint(user_id, tags)"}
                ]
            }
        ]
    },
    {
        "category": "Operators & Expressions",
        "icon": "⚖️",
        "desc": "Comparison, boolean logic, identity, membership, and bitwise operations.",
        "items": [
            {
                "name": "Comparison Operators",
                "desc": "Evaluate expressions to return boolean True or False.",
                "use_case": "Form validation, grading, threshold checks, and access controls.",
                "examples": [
                    {"label": "Comparisons", "code": "x, y = 20, 30\nprint(x == y)  # False\nprint(x != y)  # True\nprint(x < y)   # True\nprint(x >= 18) # True"},
                    {"label": "Chained", "code": "score = 85\n# Chained comparison syntax\nif 80 <= score < 90:\n    print('Grade: B+ (Solid performance)')"}
                ]
            },
            {
                "name": "Logical Operators",
                "desc": "Combine conditions using and, or, and not with short-circuit evaluation.",
                "use_case": "Authentication checks, complex business logic, and security rules.",
                "examples": [
                    {"label": "and / or / not", "code": "is_admin = True\nhas_mfa = False\nis_valid = is_admin and (has_mfa or True)\nprint('Access granted:', is_valid)\nprint('Not admin:', not is_admin)"},
                    {"label": "Short-Circuit", "code": "# 'or' returns first truthy value\ndefault_role = None or 'student'\nprint(default_role)  # student"}
                ]
            },
            {
                "name": "Membership & Identity",
                "desc": "Check if an item exists with 'in' and verify object identity with 'is'.",
                "use_case": "Scanning lists, checking for None, and validating allowed options.",
                "examples": [
                    {"label": "in / not in", "code": "allowed = ['root', 'admin', 'auditor']\nuser = 'admin'\nprint(user in allowed)      # True\nprint('guest' not in allowed) # True"},
                    {"label": "is / is not", "code": "token = None\nif token is None:\n    print('Please authenticate first')"}
                ]
            },
            {
                "name": "Walrus Operator (:=)",
                "desc": "Assign values to variables inside expressions while evaluating.",
                "use_case": "Regex matching, reading data streams, and reducing duplicate calls.",
                "examples": [
                    {"label": "In Condition", "code": "text = 'Python Programming'\nif (n := len(text)) > 10:\n    print(f'Text is long: {n} chars')"},
                    {"label": "In Loop", "code": "data = ['alpha', 'beta', 'done', 'gamma']\ni = 0\nwhile (item := data[i]) != 'done':\n    print('Processing:', item)\n    i += 1"}
                ]
            },
            {
                "name": "Bitwise Operators",
                "desc": "Perform low-level operations on binary bits: &, |, ^, ~, <<, >>.",
                "use_case": "Permissions masks, cryptographic encoding, and packet inspection.",
                "examples": [
                    {"label": "Bitwise Math", "code": "a, b = 6, 3      # 110, 011 in binary\nprint(a & b)       # 2   (010 AND)\nprint(a | b)       # 7   (111 OR)\nprint(a ^ b)       # 5   (101 XOR)\nprint(a << 1)      # 12  (shift left)"},
                    {"label": "Flag Masking", "code": "READ, WRITE, EXEC = 4, 2, 1\nperm = READ | EXEC  # 5\nprint('Can read?', bool(perm & READ))"}
                ]
            }
        ]
    },
    {
        "category": "Strings & Text Processing",
        "icon": "🧵",
        "desc": "Slicing, formatting, f-strings, splitting, replacement, and regex.",
        "items": [
            {
                "name": "f-Strings & String Formatting",
                "desc": "Modern string interpolation with expressions and formatting specs.",
                "use_case": "Dynamic message formatting, table alignment, and financial displays.",
                "examples": [
                    {"label": "f-Strings", "code": "user = 'Phaneendhar'\nbalance = 1250.8\nprint(f'User: {user:>12} | Bal: ₹{balance:,.2f}')\n# Debug spec in 3.8+\nx = 42\nprint(f'{x=}')"},
                    {"label": "Padding & Hex", "code": "num = 255\nprint(f'Hex: 0x{num:02X}')      # 0xFF\nprint(f'Padded: {42:05d}')        # 00042"}
                ]
            },
            {
                "name": "String Slicing & Reversing",
                "desc": "Extract substrings with [start:stop:step]. Negative indices count from end.",
                "use_case": "Parsing fixed-width fields, filename extensions, and reversing strings.",
                "examples": [
                    {"label": "Slicing", "code": "msg = 'Forensics'\nprint(msg[0:4])   # Fore\nprint(msg[:4])    # Fore\nprint(msg[4:])    # nsics\nprint(msg[-3:])   # ics"},
                    {"label": "Step & Reverse", "code": "code = 'ABCDEF'\nprint(code[::2])   # ACE (every 2nd)\nprint(code[::-1])  # FEDCBA (reversed)"}
                ]
            },
            {
                "name": "Case & Trimming Methods",
                "desc": "Change case and remove surrounding whitespace or characters.",
                "use_case": "Cleaning user inputs, normalising email addresses, and header parsing.",
                "examples": [
                    {"label": "Trimming", "code": "raw = '   user@test.com  \\n'\nclean = raw.strip()\nprint(repr(clean))"},
                    {"label": "Casing", "code": "title = 'digital forensics investigation'\nprint(title.upper())\nprint(title.title())\nprint(title.capitalize())"}
                ]
            },
            {
                "name": "Split, Join & Replace",
                "desc": "Break text into lists, join lists into strings, and substitute substrings.",
                "use_case": "Parsing CSV records, building URLs, and sanitising content.",
                "examples": [
                    {"label": "Split & Join", "code": "csv_line = '192.168.1.1,80,HTTP,OPEN'\nparts = csv_line.split(',')\nprint(parts)\nrejoined = ' -> '.join(parts)\nprint(rejoined)"},
                    {"label": "Replace & Count", "code": "text = 'attack from 10.0.0.1, alert 10.0.0.1'\nmasked = text.replace('10.0.0.1', '[REDACTED]')\nprint(masked)\nprint('Occurrences:', text.count('10.0.0.1'))"}
                ]
            },
            {
                "name": "Search & Validation",
                "desc": "Check prefixes, suffixes, numeric content, and substring positions.",
                "use_case": "Validating file extensions, URL schemes, and user phone numbers.",
                "examples": [
                    {"label": "Starts/EndsWith", "code": "url = 'https://nittala-forensic-suite.vercel.app'\nprint(url.startswith('https://'))  # True\nprint(url.endswith('.vercel.app'))  # True"},
                    {"label": "Find & IsDigit", "code": "text = 'Phanix-2026'\nprint(text.find('2026'))  # 7\nprint('98490'.isdigit())  # True\nprint('alpha1'.isalnum()) # True"}
                ]
            }
        ]
    },
    {
        "category": "Control Flow & Loops",
        "icon": "🔀",
        "desc": "Branching conditionals, for loops, while loops, and loop control directives.",
        "items": [
            {
                "name": "If - Elif - Else",
                "desc": "Conditional branching based on true/false evaluations with indentation.",
                "use_case": "Evaluating security levels, grading scores, and routing requests.",
                "examples": [
                    {"label": "Multi-way Branch", "code": "threat_score = 75\nif threat_score >= 80:\n    severity = 'CRITICAL'\nelif threat_score >= 50:\n    severity = 'MEDIUM'\nelse:\n    severity = 'LOW'\nprint(f'Severity: {severity}')"},
                    {"label": "Nested", "code": "is_logged_in = True\nis_admin = False\nif is_logged_in:\n    print('Dashboard' if is_admin else 'Learner Portal')"}
                ]
            },
            {
                "name": "Ternary Conditional Expression",
                "desc": "Concise inline if-else expression for quick value assignment.",
                "use_case": "Setting default fallbacks, status labels, and badge colors.",
                "examples": [
                    {"label": "Inline Value", "code": "status_code = 200\nmsg = 'Success' if status_code == 200 else 'Error'\nprint(msg)"},
                    {"label": "In Print / Formatting", "code": "xp = 120\nprint(f'Rank: {\"Master\" if xp >= 100 else \"Novice\"}')"}
                ]
            },
            {
                "name": "For Loops & range()",
                "desc": "Iterate over collections, strings, or numeric ranges generated by range().",
                "use_case": "Batch processing, counting iterations, and generating sequences.",
                "examples": [
                    {"label": "Range Variations", "code": "# range(start, stop, step)\nfor i in range(1, 6):\n    print(i, end=' ')\nprint()\nfor n in range(10, 0, -2):\n    print(n, end=' ')"},
                    {"label": "Collection Loop", "code": "languages = ['Python', 'SQL', 'Bash']\nfor lang in languages:\n    print(f'Mastering {lang}')"}
                ]
            },
            {
                "name": "Enumerate & Zip",
                "desc": "Loop with index counter via enumerate() and pair sequences with zip().",
                "use_case": "Numbering listed items, matching parallel lists, and creating dictionaries.",
                "examples": [
                    {"label": "enumerate()", "code": "evidence = ['pcap_log', 'disk_img', 'memory_dump']\nfor idx, item in enumerate(evidence, start=1):\n    print(f'{idx}. {item}')"},
                    {"label": "zip()", "code": "keys = ['ip', 'port', 'status']\nvals = ['10.0.0.5', 443, 'open']\nrecord = dict(zip(keys, vals))\nprint(record)"}
                ]
            },
            {
                "name": "While Loops & Sentinels",
                "desc": "Execute code repeatedly while a specified condition evaluates to True.",
                "use_case": "Polling server status, retrying operations, and simulation steps.",
                "examples": [
                    {"label": "Countdown", "code": "attempts = 3\nwhile attempts > 0:\n    print(f'Attempts remaining: {attempts}')\n    attempts -= 1\nprint('Lockout initiated')"},
                    {"label": "Sentinel Flag", "code": "running = True\ncount = 0\nwhile running:\n    count += 1\n    if count >= 3:\n        running = False\nprint('Completed cycles:', count)"}
                ]
            },
            {
                "name": "Break, Continue & Else on Loop",
                "desc": "break terminates early; continue skips to next cycle; else runs on normal exit.",
                "use_case": "Searching for items, skipping bad rows, and validating search completions.",
                "examples": [
                    {"label": "Break & Continue", "code": "for n in range(1, 10):\n    if n % 2 == 0:\n        continue  # skip evens\n    if n > 7:\n        break     # stop\n    print(n, end=' ')"},
                    {"label": "For-Else Pattern", "code": "target = 42\nfor num in [10, 20, 30]:\n    if num == target:\n        print('Found!')\n        break\nelse:\n    print('Not found in sequence (loop else triggered)')"}
                ]
            },
            {
                "name": "Match-Case Pattern Matching",
                "desc": "Modern pattern matching syntax introduced in Python 3.10+.",
                "use_case": "Command dispatchers, protocol decoding, and API response handlers.",
                "examples": [
                    {"label": "Match Values", "code": "command = 'start'\nmatch command:\n    case 'start':\n        print('System starting...')\n    case 'stop' | 'halt':\n        print('System stopping...')\n    case _:\n        print('Unknown command')"},
                    {"label": "Pattern Guard", "code": "point = (10, 20)\nmatch point:\n    case (x, y) if x == y:\n        print(f'Diagonal at {x}')\n    case (x, y):\n        print(f'Point at x={x}, y={y}')"}
                ]
            }
        ]
    },
    {
        "category": "Data Structures & Collections",
        "icon": "📦",
        "desc": "Lists, dictionaries, sets, tuples, unpacking, and comprehensions.",
        "items": [
            {
                "name": "Lists (Mutable Sequences)",
                "desc": "Ordered, mutable sequences supporting indexing, appending, sorting, and slicing.",
                "use_case": "Shopping carts, logs, queues, dynamic collections, and histories.",
                "examples": [
                    {"label": "Common Methods", "code": "items = ['recon', 'scan']\nitems.append('exploit')     # add to end\nitems.insert(0, 'osint')    # insert at index\nitems.pop()                 # remove last\nitems.sort()                # in-place sort\nprint(items, len(items))"},
                    {"label": "Copying & Slicing", "code": "nums = [1, 2, 3, 4, 5]\nsub = nums[1:4]          # [2, 3, 4]\nclone = nums.copy()        # shallow copy\nprint(sub, clone == nums)"}
                ]
            },
            {
                "name": "Dictionaries (Key-Value Maps)",
                "desc": "Unordered key-value stores. Fast lookup, assignment, and iteration.",
                "use_case": "JSON payloads, database records, lookup tables, and user sessions.",
                "examples": [
                    {"label": "CRUD & .get()", "code": "profile = {'user': 'Phani', 'role': 'Admin'}\nprofile['email'] = 'phani@test.com' # insert/update\nrole = profile.get('role', 'Guest')   # safe read\nmissing = profile.get('phone', 'N/A')\nprint(profile, role, missing)"},
                    {"label": "Iteration", "code": "config = {'debug': False, 'port': 8000}\nfor key, val in config.items():\n    print(f'{key}: {val}')"}
                ]
            },
            {
                "name": "Sets (Unique Values)",
                "desc": "Unordered collections of unique elements. Fast membership and set math.",
                "use_case": "Deduplication, finding shared elements, and permission intersections.",
                "examples": [
                    {"label": "Deduplication", "code": "tags = ['python', 'cyber', 'python', 'tools']\nunique_tags = set(tags)\nprint(unique_tags)  # {'python', 'cyber', 'tools'}"},
                    {"label": "Set Operations", "code": "team_a = {'Alice', 'Bob', 'Charlie'}\nteam_b = {'Bob', 'David', 'Alice'}\nprint('Common:', team_a & team_b) # intersection\nprint('Combined:', team_a | team_b) # union\nprint('A only:', team_a - team_b) # difference"}
                ]
            },
            {
                "name": "Tuples & Unpacking",
                "desc": "Immutable ordered sequences. Used for fixed records and multi-value returns.",
                "use_case": "Coordinates, RGB colors, database rows, and function returns.",
                "examples": [
                    {"label": "Unpacking", "code": "point = (192, 168, 1, 1)\nfirst, second, *rest = point\nprint(first, second, rest) # 192 168 [1, 1]"},
                    {"label": "Swap Variables", "code": "a, b = 100, 200\na, b = b, a  # elegant Python swap\nprint(a, b)  # 200 100"}
                ]
            },
            {
                "name": "List & Dict Comprehensions",
                "desc": "Compact syntax to transform, filter, and create new collections in one line.",
                "use_case": "Data cleaning, mathematical transforms, and creating lookup tables.",
                "examples": [
                    {"label": "List Comprehension", "code": "# [expression for item in iterable if condition]\nscores = [45, 88, 92, 60, 75]\npassing = [s for s in scores if s >= 70]\nsquares = [x**2 for x in range(5)]\nprint('Passing:', passing, 'Squares:', squares)"},
                    {"label": "Dict Comprehension", "code": "users = ['phani', 'asha', 'ravi']\nuser_lengths = {u: len(u) for u in users}\nprint(user_lengths)"}
                ]
            }
        ]
    },
    {
        "category": "Functions, Lambdas & Scope",
        "icon": "⚡",
        "desc": "Function declarations, parameters, *args, **kwargs, lambdas, and scope rules.",
        "items": [
            {
                "name": "Function Definition & Return",
                "desc": "Declare reusable functions with def, parameters, and return values.",
                "use_case": "Modularizing code, standardizing computations, and testable units.",
                "examples": [
                    {"label": "Basic Function", "code": "def calculate_tax(amount, rate=0.05):\n    \"\"\"Calculate total with tax.\"\"\"\n    return round(amount * (1 + rate), 2)\n\nprint(calculate_tax(100))      # 105.0\nprint(calculate_tax(100, 0.18)) # 118.0"},
                    {"label": "Multiple Return", "code": "def min_max_avg(nums):\n    return min(nums), max(nums), sum(nums) / len(nums)\n\nlo, hi, avg = min_max_avg([10, 20, 30])\nprint(f'Lo: {lo}, Hi: {hi}, Avg: {avg}')"}
                ]
            },
            {
                "name": "*args and **kwargs (Flexible Input)",
                "desc": "*args captures arbitrary positional arguments as tuple; **kwargs as dict.",
                "use_case": "Wrapper functions, decorators, logging handlers, and flexible APIs.",
                "examples": [
                    {"label": "*args (Positional)", "code": "def sum_all(*numbers):\n    return sum(numbers)\n\nprint(sum_all(1, 2, 3, 4, 5)) # 15"},
                    {"label": "**kwargs (Keyword)", "code": "def log_event(event_type, **meta):\n    print(f'[{event_type}]')\n    for k, v in meta.items():\n        print(f'  {k} = {v}')\n\nlog_event('LOGIN', user='phani', ip='127.0.0.1', safe=True)"}
                ]
            },
            {
                "name": "Lambda (Anonymous) Functions",
                "desc": "Short, inline, single-expression anonymous functions.",
                "use_case": "Custom sort keys, callbacks, and map/filter transformations.",
                "examples": [
                    {"label": "Sort Key", "code": "students = [{'name': 'Maya', 'grade': 88}, {'name': 'Arun', 'grade': 95}]\n# Sort by grade descending\nstudents.sort(key=lambda s: s['grade'], reverse=True)\nprint(students)"},
                    {"label": "Simple Lambda", "code": "double = lambda x: x * 2\nprint(double(21))  # 42"}
                ]
            },
            {
                "name": "Variable Scope & global / nonlocal",
                "desc": "LEGB rule (Local, Enclosing, Global, Built-in) determines name resolution.",
                "use_case": "Managing shared state, closures, and inner helper functions.",
                "examples": [
                    {"label": "Closure & nonlocal", "code": "def make_counter(start=0):\n    count = start\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nc = make_counter(10)\nprint(c(), c(), c()) # 11 12 13"},
                    {"label": "Global", "code": "PLATFORM = 'PHANIX'\ndef show_brand():\n    return f'Powered by {PLATFORM}'\nprint(show_brand())"}
                ]
            },
            {
                "name": "Decorators (Function Wrappers)",
                "desc": "Wrap functions to extend or modify behavior without modifying original code.",
                "use_case": "Timing execution, authentication, caching, and logging.",
                "examples": [
                    {"label": "Simple Decorator", "code": "def logged(func):\n    def wrapper(*args, **kwargs):\n        print(f'Calling {func.__name__}...')\n        res = func(*args, **kwargs)\n        print('Done!')\n        return res\n    return wrapper\n\n@logged\ndef greet(name):\n    return f'Hello, {name}'\n\nprint(greet('Phani'))"},
                    {"label": "Timer Pattern", "code": "import time\ndef timer(f):\n    def wrap(*a, **kw):\n        t0 = time.perf_counter()\n        val = f(*a, **kw)\n        print(f'Time: {time.perf_counter()-t0:.4f}s')\n        return val\n    return wrap"}
                ]
            }
        ]
    },
    {
        "category": "Error & Exception Handling",
        "icon": "🛡️",
        "desc": "try, except, else, finally, raising exceptions, and context managers.",
        "items": [
            {
                "name": "Try - Except - Else - Finally",
                "desc": "Gracefully handle errors, run cleanup code, and prevent crashes.",
                "use_case": "File handling, network requests, user inputs, and database transactions.",
                "examples": [
                    {"label": "Full Block", "code": "try:\n    divisor = 2\n    result = 100 / divisor\nexcept ZeroDivisionError as err:\n    print('Cannot divide by zero:', err)\nelse:\n    print('Computed successfully:', result)\nfinally:\n    print('Cleanup complete (always runs)')"},
                    {"label": "Multiple Exceptions", "code": "try:\n    val = int('abc')\nexcept (ValueError, TypeError) as e:\n    print('Invalid format:', type(e).__name__)"}
                ]
            },
            {
                "name": "Raising Exceptions",
                "desc": "Trigger intentional exceptions with the raise statement.",
                "use_case": "Validating arguments, enforcing contracts, and failing fast on errors.",
                "examples": [
                    {"label": "Validation", "code": "def set_port(port: int):\n    if not (1 <= port <= 65535):\n        raise ValueError(f'Port out of range: {port}')\n    return port\n\nprint(set_port(8080))"},
                    {"label": "Reraise", "code": "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Logged internally')\n    # raise  # re-raises original error"}
                ]
            },
            {
                "name": "Custom Exception Classes",
                "desc": "Create domain-specific exception classes by inheriting from Exception.",
                "use_case": "Building custom libraries, forensic parsers, and enterprise systems.",
                "examples": [
                    {"label": "Custom Error", "code": "class TamperDetectedError(Exception):\n    \"\"\"Raised when file checksum mismatch occurs.\"\"\"\n    pass\n\ndef verify(hash_a, hash_b):\n    if hash_a != hash_b:\n        raise TamperDetectedError('Checksum mismatch!')\n    return True\n\nprint(verify('abc', 'abc'))"},
                    {"label": "Error With Code", "code": "class APIError(Exception):\n    def __init__(self, code, msg):\n        super().__init__(f'[{code}] {msg}')\n        self.code = code"}
                ]
            },
            {
                "name": "Assertions for Debugging",
                "desc": "assert condition, 'Message' verifies assumptions during development.",
                "use_case": "Internal invariants, defensive checks, and automated unit testing.",
                "examples": [
                    {"label": "assert statement", "code": "def calculate_discount(price, pct):\n    assert 0 <= pct <= 1, 'Discount percent must be 0 to 1'\n    return price * (1 - pct)\n\nprint(calculate_discount(100, 0.2)) # 80.0"},
                    {"label": "Test Assert", "code": "result = 2 + 2\nassert result == 4, 'Math is broken!'\nprint('Test passed')"}
                ]
            }
        ]
    },
    {
        "category": "File I/O & Path Operations",
        "icon": "📁",
        "desc": "Reading, writing, with statement, pathlib, os paths, and CSV parsing.",
        "items": [
            {
                "name": "Reading & Writing Text Files",
                "desc": "Use the with open() context manager to guarantee automatic file closing.",
                "use_case": "Configuration files, text analysis, report exports, and data logs.",
                "examples": [
                    {"label": "Write & Read", "code": "# Write file safely\nwith open('demo.txt', 'w', encoding='utf-8') as f:\n    f.write('Phanix Python Platform\\nVersion 4.8')\n\n# Read back\nwith open('demo.txt', 'r', encoding='utf-8') as f:\n    content = f.read()\nprint(content)"},
                    {"label": "Append Mode", "code": "with open('audit.log', 'a', encoding='utf-8') as f:\n    f.write('EVENT: System online\\n')"}
                ]
            },
            {
                "name": "Iterating Files Line by Line",
                "desc": "Memory-efficient streaming iteration over large files without loading into RAM.",
                "use_case": "Analyzing gigabyte-scale access logs, pcap exports, and forensic dumps.",
                "examples": [
                    {"label": "Line Iteration", "code": "# Process line by line without memory bloat\nwith open('demo.txt', 'r') as f:\n    for line_num, line in enumerate(f, 1):\n        print(f'{line_num}: {line.strip()}')"},
                    {"label": "Strip & Filter", "code": "lines = ['INFO ok', 'ERROR fail', 'INFO ready']\nerrors = [l for l in lines if l.startswith('ERROR')]\nprint(errors)"}
                ]
            },
            {
                "name": "Modern pathlib Module",
                "desc": "Object-oriented filesystem paths with intuitive slash syntax and utilities.",
                "use_case": "Cross-platform path manipulation on Linux, macOS, and Windows.",
                "examples": [
                    {"label": "Pathlib Basics", "code": "from pathlib import Path\n\ncurrent = Path('.')\nprint('Is dir?', current.is_dir())\n\np = Path('data') / 'cheatsheet.json'\nprint('Name:', p.name, '| Suffix:', p.suffix)\nprint('Exists?', p.exists())"},
                    {"label": "Read/Write Text", "code": "tmp = Path('sample.txt')\ntmp.write_text('Hello Pathlib!')\nprint(tmp.read_text())\ntmp.unlink() # delete file"}
                ]
            },
            {
                "name": "CSV Processing (csv Module)",
                "desc": "Built-in csv module for reading and writing comma-separated data.",
                "use_case": "Spreadsheet export, database dumps, and tabular security logs.",
                "examples": [
                    {"label": "DictReader", "code": "import csv\nimport io\n\nraw_csv = 'ip,status\\n10.0.0.1,allow\\n10.0.0.2,block'\nreader = csv.DictReader(io.StringIO(raw_csv))\nfor row in reader:\n    print(row['ip'], '->', row['status'])"},
                    {"label": "Writer", "code": "import csv, io\nout = io.StringIO()\nwriter = csv.writer(out)\nwriter.writerow(['ID', 'Action'])\nwriter.writerow([1, 'Investigate'])\nprint(out.getvalue())"}
                ]
            }
        ]
    },
    {
        "category": "Built-in Functions & Utilities",
        "icon": "🧮",
        "desc": "len, sum, min, max, sorted, any, all, collections, and itertools.",
        "items": [
            {
                "name": "Aggregations & Math Functions",
                "desc": "len(), sum(), min(), max(), abs(), round(), and divmod().",
                "use_case": "Score tallying, performance metrics, and statistical summaries.",
                "examples": [
                    {"label": "Basics", "code": "nums = [14, 28, 7, 42, 35]\nprint('Count:', len(nums))\nprint('Sum:', sum(nums))\nprint('Min / Max:', min(nums), max(nums))\nq, r = divmod(42, 5) # (8, 2)\nprint('Divmod:', q, r)"},
                    {"label": "Key in Max", "code": "words = ['python', 'c', 'javascript']\nlongest = max(words, key=len)\nprint('Longest:', longest) # javascript"}
                ]
            },
            {
                "name": "sorted() & reversed()",
                "desc": "Return new sorted or reversed lists without modifying the original collection.",
                "use_case": "Leaderboards, ranking, timeline ordering, and sorting by multiple keys.",
                "examples": [
                    {"label": "Custom Sort", "code": "data = [('Alice', 85), ('Bob', 95), ('Charlie', 70)]\n# Sort by score ascending\nsorted_data = sorted(data, key=lambda x: x[1])\nprint(sorted_data)"},
                    {"label": "Reversed", "code": "items = [1, 2, 3, 4]\nrev = list(reversed(items))\nprint(rev) # [4, 3, 2, 1]"}
                ]
            },
            {
                "name": "all() and any() Logic Checks",
                "desc": "all() returns True if every item is truthy; any() returns True if at least one is.",
                "use_case": "Batch validation, password rule checks, and compliance verification.",
                "examples": [
                    {"label": "Validation", "code": "checks = [True, True, True]\nprint('All passed?', all(checks))  # True\n\nflags = [False, False, True]\nprint('Any alerted?', any(flags))  # True"},
                    {"label": "With Generator", "code": "scores = [85, 92, 78, 90]\nall_passing = all(s >= 70 for s in scores)\nprint('All >= 70?', all_passing) # True"}
                ]
            },
            {
                "name": "collections (Counter, defaultdict)",
                "desc": "High-performance specialized container datatypes from the standard library.",
                "use_case": "Word frequency counters, log event grouping, and histogram generation.",
                "examples": [
                    {"label": "Counter", "code": "from collections import Counter\nevents = ['LOGIN', 'VIEW', 'LOGIN', 'ERROR', 'LOGIN']\ncounts = Counter(events)\nprint(counts.most_common(2)) # [('LOGIN', 3), ('VIEW', 1)]"},
                    {"label": "defaultdict", "code": "from collections import defaultdict\ngroups = defaultdict(list)\ngroups['admin'].append('Phani')\ngroups['user'].append('Asha')\nprint(dict(groups))"}
                ]
            }
        ]
    },
    {
        "category": "Object-Oriented Programming (OOP)",
        "icon": "🏗️",
        "desc": "Classes, __init__, inheritance, super(), properties, dunder methods, and OOP principles.",
        "items": [
            {
                "name": "Class Definition & __init__",
                "desc": "Create custom blueprints with constructor __init__ and instance attributes.",
                "use_case": "Modeling real-world objects, entities, states, and business models.",
                "examples": [
                    {"label": "Basic Class", "code": "class Investigator:\n    def __init__(self, name: str, badge_no: int):\n        self.name = name\n        self.badge_no = badge_no\n        self.cases = []\n\n    def assign_case(self, case_id: str):\n        self.cases.append(case_id)\n        return f'Assigned {case_id}'\n\ninv = Investigator('Phaneendhar', 49)\ninv.assign_case('CASE-2026-X')\nprint(inv.name, inv.cases)"},
                    {"label": "Self Keyword", "code": "# 'self' represents the specific instance of the class\nclass Device:\n    def ping(self):\n        return 'PONG'\nprint(Device().ping())"}
                ]
            },
            {
                "name": "Inheritance & super()",
                "desc": "Inherit attributes and methods from a parent class; call parent with super().",
                "use_case": "Extending base classes, specializing models, and reducing duplicated code.",
                "examples": [
                    {"label": "Inheritance", "code": "class Artifact:\n    def __init__(self, filename: str):\n        self.filename = filename\n\nclass MemoryDump(Artifact):\n    def __init__(self, filename: str, ram_size_mb: int):\n        super().__init__(filename)\n        self.ram_size_mb = ram_size_mb\n\ndump = MemoryDump('mem.raw', 8192)\nprint(dump.filename, f'{dump.ram_size_mb} MB')"},
                    {"label": "isinstance()", "code": "print(isinstance(dump, Artifact))   # True\nprint(issubclass(MemoryDump, Artifact)) # True"}
                ]
            },
            {
                "name": "Special Dunder Methods (__str__, __len__)",
                "desc": "Define operator behaviors and representation using double underscore methods.",
                "use_case": "Printing objects cleanly, enabling len(obj), and equality comparisons.",
                "examples": [
                    {"label": "Dunder Methods", "code": "class EvidenceBag:\n    def __init__(self, tag):\n        self.tag = tag\n        self.items = []\n\n    def __len__(self):\n        return len(self.items)\n\n    def __str__(self):\n        return f'EvidenceBag[{self.tag}] ({len(self)} items)'\n\nbag = EvidenceBag('CASE-99')\nbag.items.append('Hard Drive')\nprint(str(bag))\nprint(len(bag))"},
                    {"label": "__eq__ Equality", "code": "class IP:\n    def __init__(self, addr): self.addr = addr\n    def __eq__(self, o): return self.addr == o.addr\nprint(IP('1.1.1.1') == IP('1.1.1.1'))"}
                ]
            },
            {
                "name": "@property & Encapsulation",
                "desc": "Access methods like attributes with getters and setters for data validation.",
                "use_case": "Validating private attributes and computed properties.",
                "examples": [
                    {"label": "Property & Setter", "code": "class Account:\n    def __init__(self, balance):\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError('Balance cannot be negative')\n        self._balance = value\n\nacc = Account(500)\nacc.balance = 750\nprint('Balance:', acc.balance)"},
                    {"label": "Read-Only", "code": "class Circle:\n    def __init__(self, r): self.r = r\n    @property\n    def area(self): return 3.14159 * (self.r ** 2)\nprint(round(Circle(5).area, 2))"}
                ]
            },
            {
                "name": "@classmethod and @staticmethod",
                "desc": "@classmethod receives cls; @staticmethod receives neither self nor cls.",
                "use_case": "Alternative constructors, factory methods, and stateless utilities.",
                "examples": [
                    {"label": "Classmethod Factory", "code": "class User:\n    def __init__(self, username, role):\n        self.username = username\n        self.role = role\n\n    @classmethod\n    def guest(cls):\n        return cls('anonymous', 'Guest')\n\n    @staticmethod\n    def is_valid_name(name):\n        return len(name) >= 3\n\ng = User.guest()\nprint(g.username, g.role)\nprint(User.is_valid_name('Phani'))"},
                    {"label": "Usage", "code": "print(User.is_valid_name('ab')) # False"}
                ]
            }
        ]
    },
    {
        "category": "JSON, APIs & Web Networking",
        "icon": "🌐",
        "desc": "json serialization, urllib requests, REST APIs, and query parameters.",
        "items": [
            {
                "name": "JSON Serialization (loads & dumps)",
                "desc": "Serialize Python objects to JSON strings and parse JSON strings back.",
                "use_case": "Interacting with REST APIs, configuration storage, and data exchange.",
                "examples": [
                    {"label": "loads & dumps", "code": "import json\n\ndata = {'project': 'PHANIX', 'stars': 150, 'active': True}\n# To JSON string\njson_str = json.dumps(data, indent=2)\nprint(json_str)\n\n# Back to Python dict\nparsed = json.loads(json_str)\nprint(parsed['project'])"},
                    {"label": "File Load/Dump", "code": "# json.dump(obj, file) writes directly to disk\n# json.load(file) parses directly from disk\nprint('JSON module ready')"}
                ]
            },
            {
                "name": "HTTP GET Requests (urllib.request)",
                "desc": "Standard library HTTP client without external dependencies.",
                "use_case": "Fetching live threat intelligence, currency rates, and public APIs.",
                "examples": [
                    {"label": "HTTP GET", "code": "import urllib.request\nimport json\n\nurl = 'https://httpbin.org/get'\nreq = urllib.request.Request(url, headers={'User-Agent': 'PHANIX/4.8'})\n# with urllib.request.urlopen(req) as resp:\n#     data = json.loads(resp.read().decode('utf-8'))\nprint('HTTP client ready with User-Agent')"},
                    {"label": "Reading Status", "code": "# resp.status -> 200, resp.getheaders() -> list\nprint('Status codes: 200 OK, 404 Not Found')"}
                ]
            },
            {
                "name": "HTTP POST with JSON Payload",
                "desc": "Send POST requests with headers, JSON encoded body, and status inspection.",
                "use_case": "Submitting forms, logging alerts to webhooks, and interacting with APIs.",
                "examples": [
                    {"label": "POST Request", "code": "import urllib.request\nimport json\n\npayload = json.dumps({'alert': 'Tamper Attempt'}).encode('utf-8')\nreq = urllib.request.Request(\n    'https://httpbin.org/post',\n    data=payload,\n    headers={'Content-Type': 'application/json'},\n    method='POST'\n)\nprint('POST request prepared with Content-Type application/json')"},
                    {"label": "Handling Errors", "code": "import urllib.error\n# try: ... except urllib.error.HTTPError as e: print(e.code)"}
                ]
            },
            {
                "name": "URL Parsing & Encoding (urllib.parse)",
                "desc": "Parse URL components and safely encode query string parameters.",
                "use_case": "Constructing search URLs, extracting hostnames, and routing query parameters.",
                "examples": [
                    {"label": "URL Parse", "code": "from urllib.parse import urlparse, parse_qs\n\nraw_url = 'https://nittala-forensic-suite.vercel.app/scan?target=10.0.0.1&mode=deep'\nparsed = urlparse(raw_url)\nprint('Domain:', parsed.netloc)\nprint('Path:', parsed.path)\nquery = parse_qs(parsed.query)\nprint('Target:', query['target'][0])"},
                    {"label": "URL Encode", "code": "from urllib.parse import urlencode\nparams = {'q': 'python cheatsheet', 'limit': 10}\nprint('Encoded:', urlencode(params))"}
                ]
            }
        ]
    },
    {
        "category": "Forensics, Security & Cryptography",
        "icon": "🔐",
        "desc": "Cryptographic hashing, Base64, token generation, timestamps, and IOC regex.",
        "items": [
            {
                "name": "Cryptographic Hashing (hashlib)",
                "desc": "Generate secure SHA-256, SHA-1, and MD5 hashes for integrity verification.",
                "use_case": "Verifying evidence files, password hashing, and detecting tampering.",
                "examples": [
                    {"label": "SHA-256 Hash", "code": "import hashlib\n\ndata = b'Digital Evidence File 2026'\nhash_obj = hashlib.sha256(data)\nhex_digest = hash_obj.hexdigest()\nprint('SHA-256:', hex_digest)"},
                    {"label": "MD5 Hash", "code": "import hashlib\nmd5_val = hashlib.md5(b'audit_log').hexdigest()\nprint('MD5:', md5_val)"}
                ]
            },
            {
                "name": "Base64 Encoding & Decoding",
                "desc": "Encode binary data into ASCII characters and decode back safely.",
                "use_case": "Handling binary certificates, QR payloads, auth headers, and web tokens.",
                "examples": [
                    {"label": "Encode & Decode", "code": "import base64\n\nmessage = 'PHANIX Forensic Suite 4.8'\nencoded = base64.b64encode(message.encode('utf-8'))\nprint('Base64:', encoded.decode('utf-8'))\n\ndecoded = base64.b64decode(encoded).decode('utf-8')\nprint('Decoded:', decoded)"},
                    {"label": "URL Safe B64", "code": "url_safe = base64.urlsafe_b64encode(b'payload')\nprint(url_safe.decode('utf-8'))"}
                ]
            },
            {
                "name": "Cryptographically Secure Secrets",
                "desc": "Generate cryptographically strong random tokens, keys, and numbers.",
                "use_case": "Session tokens, CSRF keys, password resets, and API keys.",
                "examples": [
                    {"label": "Secure Tokens", "code": "import secrets\n\n# 16-byte random hex token (32 chars)\nsession_token = secrets.token_hex(16)\nurl_token = secrets.token_urlsafe(16)\nprint('Session Token:', session_token)\nprint('URL Safe Token:', url_token)"},
                    {"label": "Secure Random", "code": "import secrets\nsecure_num = secrets.randbelow(1000) # 0 to 999\nprint('Secure Int:', secure_num)"}
                ]
            },
            {
                "name": "Evidence Timestamps & UTC",
                "desc": "Timezone-aware UTC timestamps and ISO-8601 formatting for audit trails.",
                "use_case": "Forensic timelines, chain of custody logs, and incident timestamps.",
                "examples": [
                    {"label": "UTC ISO-8601", "code": "from datetime import datetime, timezone\n\nnow_utc = datetime.now(timezone.utc)\niso_string = now_utc.isoformat()\nprint('UTC Timestamp:', iso_string)\nprint('Formatted:', now_utc.strftime('%Y-%m-%d %H:%M:%S UTC'))"},
                    {"label": "Parse Timestamp", "code": "from datetime import datetime\nts = datetime.strptime('2026-10-04 12:00:00', '%Y-%m-%d %H:%M:%S')\nprint('Parsed Epoch:', ts.timestamp())"}
                ]
            },
            {
                "name": "Regex for Forensics & IOC Extraction",
                "desc": "Regular expressions to extract IPv4 addresses, emails, and hashes from logs.",
                "use_case": "Incident triage, parsing network logs, and threat hunting.",
                "examples": [
                    {"label": "IP Extraction", "code": "import re\n\nlog_text = 'Alert from 192.168.1.50 and 10.0.0.1 on port 443'\nip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'\nips = re.findall(ip_pattern, log_text)\nprint('Extracted IPs:', ips)"},
                    {"label": "SHA256 Match", "code": "import re\ntext = 'File hash is e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'\nsha_pattern = r'\\b[a-fA-F0-9]{64}\\b'\nhashes = re.findall(sha_pattern, text)\nprint('Matched Hash:', hashes)"}
                ]
            }
        ]
    }
]

def main():
    with open("data/cheatsheet.json", "w", encoding="utf-8") as f:
        json.dump(CATEGORIES, f, indent=2)
    print(f"Generated data/cheatsheet.json ({len(CATEGORIES)} categories, {sum(len(c['items']) for c in CATEGORIES)} topics)")

if __name__ == "__main__":
    main()
