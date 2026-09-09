# 🐍 PyLearn — Interactive Python Learning Platform

PyLearn is a full-featured, zero-dependency interactive application designed to guide beginners to intermediate learners through mastering Python programming. It features a complete hands-on curriculum, in-browser code editor, real-time Python execution engine, automated test grading, concept check quizzes, freeform playground, and a gamified XP/badge reward system.

---

## ✨ Features

- **🎓 10 Structured Modules (Beginner to Advanced)**:
  1. **Python Basics & Variables**: Output (`print`), comments, variables, types (`int`, `float`, `str`, `bool`), type casting.
  2. **Operators & Expressions**: Arithmetic, PEMDAS precedence, floor division, modulo, comparison, boolean logic (`and`, `or`, `not`).
  3. **Control Flow**: `if`, `elif`, `else` conditionals, truthy/falsy evaluation, ternary expressions.
  4. **Loops & Iteration**: `for` loops, `range()`, `while` loops, `break`, `continue`, `enumerate()`.
  5. **Data Structures**: Lists, indexing, slicing, dictionaries, key-value mappings, sets, tuples, list comprehensions.
  6. **Functions & Scope**: `def`, parameters, return values, `*args`, `**kwargs`, lambda functions.
  7. **String Processing**: String methods (`split`, `join`, `strip`, `replace`), modern `f-strings`.
  8. **Error & Exception Handling**: `try`, `except`, `else`, `finally`, handling runtime exceptions safely.
  9. **Object-Oriented Programming (OOP)**: Classes, instances, `__init__`, `self`, methods, inheritance, `super()`, `__str__`.
  10. **Practical Mini-Projects**: Password security analyzer, text frequency statistics, and inventory systems.

- **⚡ Real-Time Code Execution**:
  - Live sandboxed execution powered by a lightweight Python backend (`server.py`).
  - Strict 3.5s timeout protection against accidental infinite loops (`while True:`).
  - Accurate stdout and stderr capture with execution runtime benchmarking (milliseconds).
  - Keyboard shortcut: **Ctrl + Enter** (or **Cmd + Enter**) to run code instantly.

- **🎯 Automated Challenge Grader**:
  - Each lesson includes a hands-on coding challenge with unit test cases.
  - Compares output against specifications and provides exact diffs on failure.
  - Multi-tier progressive hints system.
  - Confetti particle celebration upon passing challenges!

- **🧠 Interactive Quick Quizzes**:
  - Check-for-understanding multiple-choice question for every lesson with instant feedback and explanations.

- **🛠️ Freeform Code Playground**:
  - Scratchpad for testing any arbitrary Python code.
  - Pre-loaded algorithm & project templates (Fibonacci memoization, QuickSort, Palindrome checker, Text adventure engine, Word frequency counter).

- **📑 Searchable Python Cheat Sheet**:
  - Categorized quick reference cards for syntax, data structures, and OOP idioms.
  - One-click copy-to-clipboard functionality.
  - Live search filter.

- **🏆 Gamification & Rewards**:
  - Earn Experience Points (XP) for lessons, quizzes, and challenges.
  - Track daily learning streaks.
  - 11 unlockable achievement badges (e.g. *Hello World Pioneer*, *Loop Champion*, *OOP Architect*).
  - Personalized Certificate of Completion with customizable name.

- **💾 Local Persistence**:
  - Automatically saves code edits, quiz scores, XP, and badges to browser `localStorage`.

- **🎨 Modern Responsive UI**:
  - Sleek dark/light mode toggle.
  - Line numbers with auto-indentation and tab handling.
  - Glassmorphic card styling and responsive layout.

---

## 🚀 Quick Start

### 1. Launch the Server
From the project directory:
```bash
python3 server.py
# Or use the convenience script:
./run.sh
```

By default, the server starts on port `8000`:
```
http://localhost:8000
```

To specify a custom port:
```bash
./run.sh 8080
```

### 2. Run Automated Verification Tests
To run the automated test suite verifying all API endpoints and execution mechanics:
```bash
python3 test_app.py
```

---

## 📁 Project Structure

```
python-learning-app/
├── server.py             # Zero-dependency Python HTTP server & sandboxed code runner
├── run.sh                # Startup runner script
├── test_app.py           # Automated test suite (endpoints, runner, timeout, grader)
├── generate_data.py      # Dataset generator for curriculum and cheatsheet
├── data/
│   ├── curriculum.json   # 10 modules, lessons, quizzes, challenges, test cases
│   └── cheatsheet.json   # Categorized reference guide & code snippets
├── static/
│   ├── index.html        # Main SPA interface (Learn, Playground, Challenges, Cheat Sheet, Badges)
│   ├── css/
│   │   └── style.css     # Design system, themes, editor layout, animations
│   └── js/
│       └── app.js        # SPA client controller, editor engine, grader, gamification
└── README.md             # Documentation
```

---

## 💻 Tech Stack
- **Backend**: Pure Python Standard Library (`http.server`, `socketserver`, `subprocess`, `json`, `tempfile`, `urllib`). No `pip install` required!
- **Frontend**: Vanilla JavaScript (ES6+), CSS3 with CSS variables & Flexbox/Grid, semantic HTML5.
