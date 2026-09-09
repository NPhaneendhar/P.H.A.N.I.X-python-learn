import json
import os

CURRICULUM = [
    {
        "id": "module-1",
        "title": "Module 1: Python Basics & Variables",
        "icon": "🚀",
        "description": "Master the fundamentals of Python syntax, outputting data, variables, and data types.",
        "lessons": [
            {
                "id": "lesson-1-1",
                "title": "Hello, Python! & Output",
                "difficulty": "Beginner",
                "xp": 50,
                "summary": "Learn how to use the print() function, write comments, and output data.",
                "content": """### Welcome to Python! 🐍

Python is one of the most popular, readable, and versatile programming languages in the world. It is used for web development, artificial intelligence, data science, automation, and more.

#### The `print()` Function
To display information to the screen, we use the built-in `print()` function:

```python
print("Hello, World!")
print(42)
print("Welcome", "to", "Python!")
```

#### Code Comments
Comments are notes for humans reading the code. Python ignores them during execution:

```python
# This is a single-line comment
print("Code runs here")  # Inline comment
```

#### Key Rules:
1. Strings must be enclosed in quotes (single `'...'` or double `"..."`).
2. Python is case-sensitive: `print()` works, but `Print()` will raise an error!
3. Multiple arguments separated by commas in `print()` are separated by spaces by default.
""",
                "starter_code": """# Welcome to PyLearn!
# Try printing your name and a welcome message:
print("Hello, Python learner!")

# Exercise: Print a greeting with your favorite programming topic
print("I am excited to learn Python!")
""",
                "quiz": {
                    "question": "What is the correct way to output 'Python is awesome' to the console?",
                    "options": [
                        "echo 'Python is awesome'",
                        "print(\"Python is awesome\")",
                        "System.out.println(\"Python is awesome\")",
                        "console.log(\"Python is awesome\")"
                    ],
                    "correct_index": 1,
                    "explanation": "In Python, the built-in print() function is used to display text or values to the screen."
                },
                "challenge": {
                    "instructions": "Write code that prints exactly two lines:\nLine 1: `Coding with Python`\nLine 2: `Level 1 Complete`",
                    "starter": """# Complete the challenge below:
# Print 'Coding with Python' on line 1 and 'Level 1 Complete' on line 2

""",
                    "hints": [
                        "Use two separate print() calls.",
                        "Make sure capitalization and spelling match exactly: 'Coding with Python' and 'Level 1 Complete'."
                    ],
                    "solution": """print("Coding with Python")
print("Level 1 Complete")
""",
                    "test_cases": [
                        {
                            "name": "Check exact output lines",
                            "expected_output": "Coding with Python\nLevel 1 Complete\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-1-2",
                "title": "Variables & Data Types",
                "difficulty": "Beginner",
                "xp": 60,
                "summary": "Understand how to store values in variables and work with integers, floats, strings, and booleans.",
                "content": """### Storing Data in Variables 📦

A **variable** is a named container for storing data values. In Python, you create a variable the moment you first assign a value to it using `=`:

```python
age = 25              # int (integer)
price = 19.99         # float (decimal number)
course_name = "Python"# str (string)
is_active = True      # bool (boolean: True or False)
```

#### Checking Types with `type()`
You can inspect the type of any variable using `type()`:

```python
x = 100
print(type(x))  # <class 'int'>
```

#### Variable Naming Rules:
- Names must start with a letter or an underscore (`_`).
- Names cannot start with a number.
- Names can only contain alphanumeric characters and underscores (`a-z`, `A-Z`, `0-9`, and `_`).
- Python convention uses **snake_case** for variable names: e.g., `user_score`, `first_name`.
""",
                "starter_code": """# Variable experimentation
user_name = "Alex"
level = 1
xp = 150.5
is_pro = True

print(user_name, "is at level", level)
print("XP:", xp, "| Pro member:", is_pro)
""",
                "quiz": {
                    "question": "Which of the following is an invalid Python variable name?",
                    "options": [
                        "user_age",
                        "_total_score",
                        "2nd_place",
                        "player2"
                    ],
                    "correct_index": 2,
                    "explanation": "Variable names in Python cannot start with a number (like '2nd_place')."
                },
                "challenge": {
                    "instructions": "Create three variables:\n1. `item_name` with value `\"Laptop\"`\n2. `price` with value `899.99`\n3. `in_stock` with value `True`\nThen print them together on one line using `print(item_name, price, in_stock)`.",
                    "starter": """# Define the three variables and print them:

""",
                    "hints": [
                        "Assign item_name = \"Laptop\", price = 899.99, in_stock = True.",
                        "Call print(item_name, price, in_stock) at the end."
                    ],
                    "solution": """item_name = "Laptop"
price = 899.99
in_stock = True
print(item_name, price, in_stock)
""",
                    "test_cases": [
                        {
                            "name": "Check variables and printed output",
                            "expected_output": "Laptop 899.99 True\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-1-3",
                "title": "Type Casting & Conversion",
                "difficulty": "Beginner",
                "xp": 60,
                "summary": "Convert between data types using int(), float(), and str().",
                "content": """### Type Casting 🔄

Sometimes you need to convert data from one type to another. This is called **type casting**.

#### Built-in Conversion Functions:
- `int(x)`: Converts `x` to an integer (truncating decimals).
- `float(x)`: Converts `x` to a floating-point number.
- `str(x)`: Converts `x` to a string representation.
- `bool(x)`: Converts `x` to a boolean (`0`, `""`, `None`, and empty collections convert to `False`; everything else is `True`).

```python
# String to Integer
num_str = "42"
num_int = int(num_str)
print(num_int + 8)  # 50

# Float to Integer (decimals are truncated!)
pi = 3.99
print(int(pi))      # 3
```
""",
                "starter_code": """a = "25"
b = "75"

print("Concatenation:", a + b)
sum_val = int(a) + int(b)
print("Numeric Sum:", sum_val)
""",
                "quiz": {
                    "question": "What is the output of `print(int(7.85))` in Python?",
                    "options": [
                        "8",
                        "7",
                        "7.85",
                        "TypeError"
                    ],
                    "correct_index": 1,
                    "explanation": "int() truncates towards zero (it cuts off the decimal part), so 7.85 becomes 7 without rounding up."
                },
                "challenge": {
                    "instructions": "You are given two string variables: `str_val1 = '15'` and `str_val2 = '4.5'`. Convert `str_val1` to an integer and `str_val2` to a float, calculate their sum, and print the result.",
                    "starter": """str_val1 = "15"
str_val2 = "4.5"

# Convert str_val1 to int and str_val2 to float, then print their sum:

""",
                    "hints": [
                        "Use int(str_val1) and float(str_val2).",
                        "Add them together: result = int(str_val1) + float(str_val2).",
                        "Print the result: print(result)."
                    ],
                    "solution": """str_val1 = "15"
str_val2 = "4.5"
result = int(str_val1) + float(str_val2)
print(result)
""",
                    "test_cases": [
                        {
                            "name": "Check sum of casted values",
                            "expected_output": "19.5\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-2",
        "title": "Module 2: Operators & Expressions",
        "icon": "⚡",
        "description": "Perform calculations and logical comparisons with arithmetic and boolean operators.",
        "lessons": [
            {
                "id": "lesson-2-1",
                "title": "Arithmetic Operators & Math",
                "difficulty": "Beginner",
                "xp": 60,
                "summary": "Use addition, subtraction, multiplication, division, floor division, modulo, and exponentiation.",
                "content": """### Python Arithmetic Operators ➗

Python supports all standard mathematical operations:

| Operator | Name | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division (always returns float) | `10 / 4` | `2.5` |
| `//` | Floor Division (integer part) | `10 // 4` | `2` |
| `%` | Modulo (remainder) | `10 % 4` | `2` |
| `**` | Exponentiation (power) | `2 ** 3` | `8` |

#### Order of Operations (PEMDAS)
Precedence:
1. Parentheses `()`
2. Exponentiation `**`
3. Multiplication `*`, Division `/`, Floor Division `//`, Modulo `%`
4. Addition `+`, Subtraction `-`
""",
                "starter_code": """# Practice math operators
total_cents = 387
dollars = total_cents // 100
remaining_cents = total_cents % 100

print("Dollars:", dollars)
print("Remaining cents:", remaining_cents)
""",
                "quiz": {
                    "question": "What is the value of `20 // 6` and `20 % 6` in Python?",
                    "options": [
                        "3.33 and 2",
                        "3 and 2",
                        "4 and 2",
                        "3 and 0"
                    ],
                    "correct_index": 1,
                    "explanation": "20 // 6 is 3 (integer division quotient), and 20 % 6 is 2 (remainder: 20 - 3*6 = 2)."
                },
                "challenge": {
                    "instructions": "Given a total number of seconds `total_sec = 3665`, calculate:\n- `hours` (how many whole hours)\n- `minutes` (how many remaining whole minutes)\n- `seconds` (remaining seconds)\nThen print them in this format: `Hours: <hours>, Minutes: <minutes>, Seconds: <seconds>`",
                    "starter": """total_sec = 3665

# Calculate hours, minutes, seconds and print:

""",
                    "hints": [
                        "hours = total_sec // 3600",
                        "rem = total_sec % 3600",
                        "minutes = rem // 60",
                        "seconds = rem % 60"
                    ],
                    "solution": """total_sec = 3665
hours = total_sec // 3600
rem = total_sec % 3600
minutes = rem // 60
seconds = rem % 60
print(f"Hours: {hours}, Minutes: {minutes}, Seconds: {seconds}")
""",
                    "test_cases": [
                        {
                            "name": "Check formatted time breakdown",
                            "expected_output": "Hours: 1, Minutes: 1, Seconds: 5\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-2-2",
                "title": "Comparison & Logical Operators",
                "difficulty": "Beginner",
                "xp": 60,
                "summary": "Compare values and combine conditions with and, or, and not.",
                "content": """### Comparison & Logic ⚖️

Comparison operators return a boolean (`True` or `False`).

#### Comparison:
- `==` : Equal to
- `!=` : Not equal to
- `>`  : Greater than
- `<`  : Less than
- `>=` : Greater than or equal to
- `<=` : Less than or equal to

#### Logical:
- `and` : `True` if **both** conditions are true.
- `or`  : `True` if **at least one** condition is true.
- `not` : Inverts the boolean value.
""",
                "starter_code": """score = 85
attendance = 92

passed_course = (score >= 70) and (attendance >= 80)
print("Passed course?", passed_course)
print("Needs re-test?", not passed_course)
""",
                "quiz": {
                    "question": "What does the expression `not (True or False)` evaluate to?",
                    "options": [
                        "True",
                        "False",
                        "None",
                        "Error"
                    ],
                    "correct_index": 1,
                    "explanation": "True or False is True. Applying 'not True' results in False."
                },
                "challenge": {
                    "instructions": "Write code that checks if `number = 48` is:\n1. Greater than 0\n2. Even (`number % 2 == 0`)\n3. Less than 100\nCombine all 3 conditions using `and`, store in `is_valid`, and print `is_valid`.",
                    "starter": """number = 48

# Write the boolean condition check and print it:

""",
                    "hints": [
                        "is_valid = (number > 0) and (number % 2 == 0) and (number < 100)",
                        "print(is_valid)"
                    ],
                    "solution": """number = 48
is_valid = (number > 0) and (number % 2 == 0) and (number < 100)
print(is_valid)
""",
                    "test_cases": [
                        {
                            "name": "Check validity boolean output",
                            "expected_output": "True\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-3",
        "title": "Module 3: Control Flow (Conditionals)",
        "icon": "🔀",
        "description": "Make decisions in your code using if, elif, else, and conditional expressions.",
        "lessons": [
            {
                "id": "lesson-3-1",
                "title": "If, Elif, and Else",
                "difficulty": "Beginner",
                "xp": 70,
                "summary": "Branch your code execution based on dynamic conditions.",
                "content": """### Making Decisions with `if` Statements 🧭

Indentation (4 spaces) defines code blocks in Python:

```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: Needs Improvement")
```

Python checks conditions top-to-bottom and exits the block as soon as a condition matches.
""",
                "starter_code": """temp = 22

if temp > 30:
    print("It's a hot day!")
elif temp >= 20:
    print("Pleasant weather!")
else:
    print("It's chilly!")
""",
                "quiz": {
                    "question": "What happens if both an `if` and an `elif` condition are True?",
                    "options": [
                        "Both blocks will run",
                        "Only the first matching block (the `if`) runs",
                        "The last matching block runs",
                        "Python raises an IndentationError"
                    ],
                    "correct_index": 1,
                    "explanation": "Python executes only the first matching branch in an if/elif/else chain and skips the remaining branches."
                },
                "challenge": {
                    "instructions": "Given `speed = 75`, write an if-elif-else block that prints:\n- `Too fast` if speed is greater than 70\n- `Too slow` if speed is less than 40\n- `Optimal speed` otherwise.",
                    "starter": """speed = 75

# Write the if-elif-else logic here:

""",
                    "hints": [
                        "if speed > 70: print('Too fast')",
                        "elif speed < 40: print('Too slow')",
                        "else: print('Optimal speed')"
                    ],
                    "solution": """speed = 75
if speed > 70:
    print("Too fast")
elif speed < 40:
    print("Too slow")
else:
    print("Optimal speed")
""",
                    "test_cases": [
                        {
                            "name": "Check speed category output",
                            "expected_output": "Too fast\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-3-2",
                "title": "Ternary Operators & Truthiness",
                "difficulty": "Beginner",
                "xp": 65,
                "summary": "Write concise inline conditionals and understand truthy/falsy values in Python.",
                "content": """### Ternary Operator & Truthiness 💡

#### Ternary Operator
Single-line conditional assignment:
```python
age = 20
status = "Adult" if age >= 18 else "Minor"
```

#### Truthy vs Falsy
- **Falsy**: `0`, `0.0`, `""`, `[]`, `{}`, `None`, `False`
- **Truthy**: Any non-zero number, non-empty string, or non-empty collection.
""",
                "starter_code": """points = 120
badge = "Gold" if points >= 100 else "Silver"
print("Badge earned:", badge)

cart = []
if not cart:
    print("Your shopping cart is empty.")
""",
                "quiz": {
                    "question": "Which of the following values is considered Truthy in Python?",
                    "options": [
                        "0",
                        "\"\"",
                        "[]",
                        "\"0\""
                    ],
                    "correct_index": 3,
                    "explanation": "A non-empty string like \"0\" has length 1, making it Truthy! 0, \"\", and [] are Falsy."
                },
                "challenge": {
                    "instructions": "Given `balance = 250`, use a single-line ternary conditional expression to assign either `\"Approved\"` (if balance >= 100) or `\"Declined\"` to variable `tx_status`. Then print `tx_status`.",
                    "starter": """balance = 250

# Use ternary expression to set tx_status and print it:

""",
                    "hints": [
                        "tx_status = \"Approved\" if balance >= 100 else \"Declined\"",
                        "print(tx_status)"
                    ],
                    "solution": """balance = 250
tx_status = "Approved" if balance >= 100 else "Declined"
print(tx_status)
""",
                    "test_cases": [
                        {
                            "name": "Check ternary assignment output",
                            "expected_output": "Approved\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-4",
        "title": "Module 4: Loops & Iteration",
        "icon": "🔁",
        "description": "Automate repetitive tasks with for loops, while loops, range, and loop control statements.",
        "lessons": [
            {
                "id": "lesson-4-1",
                "title": "For Loops & The range() Function",
                "difficulty": "Beginner",
                "xp": 75,
                "summary": "Iterate over numbers and sequences using for loops and range.",
                "content": """### Iterating with `for` Loops 🔄

A `for` loop iterates over items in a sequence or a range of numbers.

#### The `range()` Function:
- `range(stop)`: 0 to `stop - 1`
- `range(start, stop)`: `start` to `stop - 1`
- `range(start, stop, step)`: increments by `step`

```python
for i in range(3):
    print("Iteration", i)

# Summing numbers
total = sum(range(1, 11))  # 55
```
""",
                "starter_code": """total = 0
for num in range(1, 6):
    total += num
    print(f"Adding {num}, current total: {total}")

print("Final Sum:", total)
""",
                "quiz": {
                    "question": "What numbers will `range(2, 9, 3)` generate?",
                    "options": [
                        "2, 3, 4, 5, 6, 7, 8, 9",
                        "2, 5, 8",
                        "2, 5, 8, 11",
                        "3, 6, 9"
                    ],
                    "correct_index": 1,
                    "explanation": "Starts at 2, steps by 3 (2 -> 5 -> 8), and stops before reaching 9."
                },
                "challenge": {
                    "instructions": "Use a `for` loop and `range()` to calculate the product of all integers from 1 to 6 inclusive (i.e. `1 * 2 * 3 * 4 * 5 * 6 = 720`). Store the result in `product` and print `product`.",
                    "starter": """product = 1

# Calculate 1 * 2 * 3 * 4 * 5 * 6 and print product:

""",
                    "hints": [
                        "for i in range(1, 7): product *= i",
                        "print(product)"
                    ],
                    "solution": """product = 1
for i in range(1, 7):
    product *= i
print(product)
""",
                    "test_cases": [
                        {
                            "name": "Check factorial of 6 output",
                            "expected_output": "720\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-4-2",
                "title": "While Loops & Loop Control",
                "difficulty": "Beginner",
                "xp": 75,
                "summary": "Repeat code while a condition is true, and control execution with break, continue, and enumerate.",
                "content": """### While Loops & Controls ⏳

A `while` loop runs as long as the condition is `True`.

#### Loop Controls:
- `break`: Exits the loop immediately.
- `continue`: Skips to the next iteration.
- `enumerate(iterable, start=0)`: Yields pairs of `(index, item)`.

```python
fruits = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(fruits, start=1):
    print(f"{idx}. {fruit}")
```
""",
                "starter_code": """skills = ["Python", "Algorithms", "Databases"]
for idx, skill in enumerate(skills, start=1):
    print(f"Step {idx}: Learn {skill}")
""",
                "quiz": {
                    "question": "What is the difference between `break` and `continue`?",
                    "options": [
                        "`break` skips the current iteration; `continue` exits the loop.",
                        "`break` exits the entire loop; `continue` skips to the next iteration.",
                        "They both do the exact same thing.",
                        "`break` is only for while loops; `continue` is only for for loops."
                    ],
                    "correct_index": 1,
                    "explanation": "`break` terminates loop execution entirely; `continue` proceeds immediately to the next cycle."
                },
                "challenge": {
                    "instructions": "Loop through numbers from 1 to 10. If a number is divisible by 2 (even), skip it using `continue`. Print all remaining odd numbers on separate lines.",
                    "starter": """for n in range(1, 11):
    # Skip if even:

    # Print odd number:
    pass
""",
                    "hints": [
                        "if n % 2 == 0: continue",
                        "print(n)"
                    ],
                    "solution": """for n in range(1, 11):
    if n % 2 == 0:
        continue
    print(n)
""",
                    "test_cases": [
                        {
                            "name": "Check odd numbers printed",
                            "expected_output": "1\n3\n5\n7\n9\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-5",
        "title": "Module 5: Data Structures",
        "icon": "📚",
        "description": "Store and organize data with Lists, Dictionaries, Sets, Tuples, and List Comprehensions.",
        "lessons": [
            {
                "id": "lesson-5-1",
                "title": "Lists & List Operations",
                "difficulty": "Intermediate",
                "xp": 80,
                "summary": "Create, index, slice, and manipulate ordered, mutable collections of items.",
                "content": """### Lists in Python 📋

A list is an ordered, mutable sequence:

```python
languages = ["Python", "JavaScript", "Rust"]

# Indexing & Slicing
print(languages[0])   # "Python"
print(languages[-1])  # "Rust"
nums = [0, 1, 2, 3, 4]
print(nums[1:4])      # [1, 2, 3]

# Methods
languages.append("Go")
languages.sort()
print("Length:", len(languages))
```
""",
                "starter_code": """scores = [88, 92, 79, 95, 84]
scores.append(100)
scores.sort(reverse=True)
print("Top 3 scores:", scores[:3])
""",
                "quiz": {
                    "question": "If `colors = ['red', 'green', 'blue', 'yellow']`, what is `colors[-2]`?",
                    "options": [
                        "'green'",
                        "'blue'",
                        "'yellow'",
                        "IndexError"
                    ],
                    "correct_index": 1,
                    "explanation": "Negative indexing counts from right: -1 is 'yellow', -2 is 'blue'."
                },
                "challenge": {
                    "instructions": "You are given `numbers = [12, -7, 5, -3, 28, 0, -1]`. Write code to filter out all negative numbers, sort the remaining numbers in ascending order, and print the resulting list.",
                    "starter": """numbers = [12, -7, 5, -3, 28, 0, -1]

# Filter out negatives, sort ascending, and print:

""",
                    "hints": [
                        "filtered = [n for n in numbers if n >= 0]",
                        "filtered.sort()",
                        "print(filtered)"
                    ],
                    "solution": """numbers = [12, -7, 5, -3, 28, 0, -1]
filtered = [n for n in numbers if n >= 0]
filtered.sort()
print(filtered)
""",
                    "test_cases": [
                        {
                            "name": "Check filtered sorted list",
                            "expected_output": "[0, 5, 12, 28]\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-5-2",
                "title": "Dictionaries (Key-Value Pairs)",
                "difficulty": "Intermediate",
                "xp": 85,
                "summary": "Store associations and lookup data fast using Python dictionaries.",
                "content": """### Python Dictionaries 📖

A dictionary maps unique keys to values:

```python
user = {
    "username": "codemaster",
    "level": 4
}

# Safe lookup with .get()
email = user.get("email", "Not Provided")

# Adding & iterating
user["xp"] = 1200
for key, value in user.items():
    print(f"{key} -> {value}")
```
""",
                "starter_code": """phone_book = {"Alice": "555-0100", "Bob": "555-0199"}
phone_book["Charlie"] = "555-0250"
for name, num in phone_book.items():
    print(f"{name}: {num}")
""",
                "quiz": {
                    "question": "What happens when accessing `data['missing']` vs `data.get('missing')`?",
                    "options": [
                        "Both return None",
                        "`data['missing']` raises KeyError, while `.get()` returns None (or a default)",
                        "Both raise KeyError",
                        "`.get()` deletes the key"
                    ],
                    "correct_index": 1,
                    "explanation": "Direct indexing raises KeyError on missing keys; .get() returns None or a default value gracefully."
                },
                "challenge": {
                    "instructions": "Count the frequency of each character in `word = 'banana'`. Store counts in a dictionary `counts` and print `counts`.\nExpected output: `{'b': 1, 'a': 3, 'n': 2}`.",
                    "starter": """word = "banana"
counts = {}

# Count occurrences of each letter and print counts:

""",
                    "hints": [
                        "for char in word: counts[char] = counts.get(char, 0) + 1",
                        "print(counts)"
                    ],
                    "solution": """word = "banana"
counts = {}
for char in word:
    counts[char] = counts.get(char, 0) + 1
print(counts)
""",
                    "test_cases": [
                        {
                            "name": "Check character frequency dictionary",
                            "expected_output": "{'b': 1, 'a': 3, 'n': 2}\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-5-3",
                "title": "Tuples, Sets, & List Comprehensions",
                "difficulty": "Intermediate",
                "xp": 90,
                "summary": "Master immutable tuples, unique sets, and pythonic one-line list comprehensions.",
                "content": """### Sets & List Comprehensions ⚡

#### Sets:
Sets hold unique items and support set operations:
```python
unique_tags = set(["py", "py", "ai", "web"])  # {'py', 'ai', 'web'}
```

#### List Comprehensions:
```python
# [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6]
evens_squared = [x**2 for x in numbers if x % 2 == 0]  # [4, 16, 36]
```
""",
                "starter_code": """# Compare traditional loop vs comprehension
squares = [x**2 for x in range(5)]
print("Squares:", squares)
""",
                "quiz": {
                    "question": "What is the output of `len(set([1, 2, 2, 3, 3, 3, 4]))`?",
                    "options": ["7", "4", "3", "TypeError"],
                    "correct_index": 1,
                    "explanation": "set() discards duplicates, leaving {1, 2, 3, 4}, length 4."
                },
                "challenge": {
                    "instructions": "Given `raw_words = ['apple', 'BANANA', 'cherry', 'AVOCADO', 'blueberry']`, use a list comprehension to create a list of all words starting with 'a' or 'A', converted to lowercase. Store in `a_words` and print `a_words`.",
                    "starter": """raw_words = ["apple", "BANANA", "cherry", "AVOCADO", "blueberry"]

# Create a_words using a list comprehension and print:

""",
                    "hints": [
                        "a_words = [w.lower() for w in raw_words if w.lower().startswith('a')]",
                        "print(a_words)"
                    ],
                    "solution": """raw_words = ["apple", "BANANA", "cherry", "AVOCADO", "blueberry"]
a_words = [w.lower() for w in raw_words if w.lower().startswith("a")]
print(a_words)
""",
                    "test_cases": [
                        {
                            "name": "Check list comprehension output",
                            "expected_output": "['apple', 'avocado']\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-6",
        "title": "Module 6: Functions & Scope",
        "icon": "⚙️",
        "description": "Write reusable, modular code with functions, parameters, return values, *args, and lambdas.",
        "lessons": [
            {
                "id": "lesson-6-1",
                "title": "Defining Functions & Return Values",
                "difficulty": "Intermediate",
                "xp": 80,
                "summary": "Encapsulate logic into reusable functions with parameters and return statements.",
                "content": """### Creating Functions with `def` 🛠️

```python
def greet(name, title="Developer"):
    \"\"\"Greets a user with their title.\"\"\"
    return f"Hello, {title} {name}!"

print(greet("Sarah"))
```

- If a function doesn't execute a `return` statement, it returns `None`.
""",
                "starter_code": """def is_even(number):
    return number % 2 == 0

print("Is 10 even?", is_even(10))
print("Is 7 even?", is_even(7))
""",
                "quiz": {
                    "question": "What is the return value of a Python function that has no `return` statement?",
                    "options": ["0", "False", "None", "\"\""],
                    "correct_index": 2,
                    "explanation": "Functions without an explicit return statement return None."
                },
                "challenge": {
                    "instructions": "Define a function `is_prime(n)` that returns `True` if `n` is prime (greater than 1 with no divisors other than 1 and itself) and `False` otherwise.\nThen test and print `[is_prime(2), is_prime(4), is_prime(17), is_prime(1)]`.",
                    "starter": """def is_prime(n):
    # Your code here:
    pass

print([is_prime(2), is_prime(4), is_prime(17), is_prime(1)])
""",
                    "hints": [
                        "if n <= 1: return False",
                        "for i in range(2, int(n**0.5) + 1): if n % i == 0: return False",
                        "return True"
                    ],
                    "solution": """def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

print([is_prime(2), is_prime(4), is_prime(17), is_prime(1)])
""",
                    "test_cases": [
                        {
                            "name": "Check is_prime outputs",
                            "expected_output": "[True, False, True, False]\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-6-2",
                "title": "*args, **kwargs, & Lambdas",
                "difficulty": "Intermediate",
                "xp": 85,
                "summary": "Accept variable numbers of arguments and create anonymous one-liner lambda functions.",
                "content": """### Flexible Arguments & Lambdas 🎯

- `*args`: Collects positional arguments into a **tuple**.
- `**kwargs`: Collects keyword arguments into a **dictionary**.
- `lambda`: Anonymous one-liner functions: `lambda x, y: x + y`
""",
                "starter_code": """words = ["banana", "pie", "apple", "watermelon"]
words_by_len = sorted(words, key=lambda w: len(w))
print("Sorted by length:", words_by_len)
""",
                "quiz": {
                    "question": "What type is `args` inside `def func(*args):`?",
                    "options": ["list", "tuple", "dict", "set"],
                    "correct_index": 1,
                    "explanation": "*args packages extra positional arguments into an immutable tuple."
                },
                "challenge": {
                    "instructions": "Write a function `sum_all(*numbers, multiplier=1)` that sums all `*numbers` and multiplies that total by `multiplier`.\nPrint `sum_all(1, 2, 3, 4, multiplier=2)`.",
                    "starter": """def sum_all(*numbers, multiplier=1):
    # Your code here:
    pass

print(sum_all(1, 2, 3, 4, multiplier=2))
""",
                    "hints": [
                        "return sum(numbers) * multiplier"
                    ],
                    "solution": """def sum_all(*numbers, multiplier=1):
    return sum(numbers) * multiplier

print(sum_all(1, 2, 3, 4, multiplier=2))
""",
                    "test_cases": [
                        {
                            "name": "Check sum_all with multiplier",
                            "expected_output": "20\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-7",
        "title": "Module 7: String Manipulation & Formatting",
        "icon": "🔤",
        "description": "Master string methods, slicing, search/replace, and modern f-string formatting.",
        "lessons": [
            {
                "id": "lesson-7-1",
                "title": "String Methods & Slicing",
                "difficulty": "Beginner",
                "xp": 75,
                "summary": "Transform, clean, split, and join strings using built-in methods.",
                "content": """### String Methods in Python ✂️

Strings are immutable sequences with useful methods:
- `.strip()`: Removes leading/trailing whitespace.
- `.split(delimiter)`: Splits into a list of strings.
- `delimiter.join(list)`: Joins list items into a string.
- `.replace(old, new)`: Replaces occurrences.
""",
                "starter_code": """sentence = "learn python in 2026"
words = sentence.split()
capitalized = [w.capitalize() for w in words]
print("Title Case:", " ".join(capitalized))
""",
                "quiz": {
                    "question": "What does `'a,b,c'.split(',')` return?",
                    "options": ["('a', 'b', 'c')", "['a', 'b', 'c']", "'abc'", "{'a', 'b', 'c'}"],
                    "correct_index": 1,
                    "explanation": "split() returns a list of substring tokens."
                },
                "challenge": {
                    "instructions": "Write a function `make_acronym(phrase)` that takes a phrase like `\"Application Programming Interface\"` and returns the uppercase acronym `\"API\"`.\nPrint `make_acronym(\"Application Programming Interface\")`.",
                    "starter": """def make_acronym(phrase):
    # Your code here:
    pass

print(make_acronym("Application Programming Interface"))
""",
                    "hints": [
                        "return ''.join(word[0].upper() for word in phrase.split())"
                    ],
                    "solution": """def make_acronym(phrase):
    return "".join(word[0].upper() for word in phrase.split())

print(make_acronym("Application Programming Interface"))
""",
                    "test_cases": [
                        {
                            "name": "Check acronym output",
                            "expected_output": "API\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-7-2",
                "title": "Modern f-Strings Formatting",
                "difficulty": "Beginner",
                "xp": 75,
                "summary": "Embed expressions, format numbers, dates, and tables cleanly with f-strings.",
                "content": """### Formatting with f-Strings 🎨

Embed expressions and formats directly:
```python
name = "Ada"
age = 36
pi = 3.14159

print(f"{name} is {age} years old.")
print(f"Pi: {pi:.2f}")           # 3.14
print(f"Large: {1000000:,}")      # 1,000,000
```
""",
                "starter_code": """item = "Mechanical Keyboard"
price = 129.50
discount = 0.15
final_price = price * (1 - discount)
print(f"{item} on sale: ${final_price:.2f} (Save {discount:.0%})")
""",
                "quiz": {
                    "question": "Which f-string specifier formats float `x = 45.6789` to 2 decimal places?",
                    "options": ["f\"{x.2}\"", "f\"{x:.2f}\"", "f\"{x:2d}\"", "f\"{round(x, 2):f}\""],
                    "correct_index": 1,
                    "explanation": ":.2f indicates fixed-point float formatting with 2 digits after the decimal."
                },
                "challenge": {
                    "instructions": "Given `item = 'Coffee'`, `qty = 3`, and `price = 4.75`, print formatted receipt:\n`3 x Coffee @ $4.75 = $14.25`\nEnsure prices are formatted to two decimal places.",
                    "starter": """item = "Coffee"
qty = 3
price = 4.75

# Print the formatted receipt string:

""",
                    "hints": [
                        "total = qty * price",
                        "print(f\"{qty} x {item} @ ${price:.2f} = ${total:.2f}\")"
                    ],
                    "solution": """item = "Coffee"
qty = 3
price = 4.75
total = qty * price
print(f"{qty} x {item} @ ${price:.2f} = ${total:.2f}")
""",
                    "test_cases": [
                        {
                            "name": "Check formatted receipt string",
                            "expected_output": "3 x Coffee @ $4.75 = $14.25\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-8",
        "title": "Module 8: Error & Exception Handling",
        "icon": "🛡️",
        "description": "Handle runtime errors gracefully using try, except, else, finally, and custom exceptions.",
        "lessons": [
            {
                "id": "lesson-8-1",
                "title": "Try, Except, Else, and Finally",
                "difficulty": "Intermediate",
                "xp": 85,
                "summary": "Prevent crashes by catching exceptions and running cleanup code.",
                "content": """### Exception Handling ⚠️

Catch runtime errors using `try` / `except`:

```python
try:
    num = int("abc")
except ValueError as e:
    print("Invalid format!")
else:
    print("Success!")
finally:
    print("Always runs.")
```
""",
                "starter_code": """def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"

print("10 / 2 =", safe_divide(10, 2))
print("10 / 0 =", safe_divide(10, 0))
""",
                "quiz": {
                    "question": "When does code inside `finally` execute?",
                    "options": [
                        "Only when an exception occurs",
                        "Only when NO exceptions occur",
                        "Always, regardless of whether an exception occurred",
                        "Only upon fatal error"
                    ],
                    "correct_index": 2,
                    "explanation": "The finally block always runs, making it ideal for resource cleanup."
                },
                "challenge": {
                    "instructions": "Write a function `parse_integer(value, default=0)` that converts `value` to int using `int()`. If a `ValueError` or `TypeError` occurs, return `default`.\nPrint `[parse_integer('42'), parse_integer('invalid', -1), parse_integer(None)]`.",
                    "starter": """def parse_integer(value, default=0):
    # Your code here:
    pass

print([parse_integer('42'), parse_integer('invalid', -1), parse_integer(None)])
""",
                    "hints": [
                        "try: return int(value)",
                        "except (ValueError, TypeError): return default"
                    ],
                    "solution": """def parse_integer(value, default=0):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print([parse_integer('42'), parse_integer('invalid', -1), parse_integer(None)])
""",
                    "test_cases": [
                        {
                            "name": "Check safe integer parsing output",
                            "expected_output": "[42, -1, 0]\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-9",
        "title": "Module 9: Object-Oriented Programming (OOP)",
        "icon": "🏗️",
        "description": "Model real-world entities using Classes, Objects, Methods, and Inheritance.",
        "lessons": [
            {
                "id": "lesson-9-1",
                "title": "Classes, Objects, and __init__",
                "difficulty": "Intermediate",
                "xp": 90,
                "summary": "Create classes, instantiate objects, and define attributes with the constructor.",
                "content": """### Object-Oriented Python 🏛️

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

dog1 = Dog("Buddy", "Labrador")
print(dog1.bark())
```

- `__init__`: Constructor method called when an object is instantiated.
- `self`: References the specific object instance calling the method.
""",
                "starter_code": """class Player:
    def __init__(self, username):
        self.username = username
        self.score = 0
    
    def add_points(self, points):
        self.score += points
        return f"{self.username}: {self.score} pts"

p1 = Player("PixelCoder")
print(p1.add_points(50))
""",
                "quiz": {
                    "question": "What is the primary role of the `self` parameter in a class method?",
                    "options": [
                        "Imports external modules",
                        "References the current instance of the class",
                        "Represents the superclass",
                        "An optional modifier"
                    ],
                    "correct_index": 1,
                    "explanation": "self represents the instance on which the method is called."
                },
                "challenge": {
                    "instructions": "Create a `BankAccount` class with:\n1. `__init__(self, owner, balance=0)`\n2. `deposit(self, amount)`: adds amount to balance and returns new balance\n3. `withdraw(self, amount)`: if amount <= balance, deducts it and returns balance; else returns `\"Insufficient funds\"`\n\nInstantiate `acc = BankAccount('Alice', 100)`, run `acc.deposit(50)`, run `acc.withdraw(30)`, and print `acc.balance`.",
                    "starter": """class BankAccount:
    # Implement class here:
    pass

acc = BankAccount("Alice", 100)
acc.deposit(50)
acc.withdraw(30)
print(acc.balance)
""",
                    "hints": [
                        "def deposit(self, amount): self.balance += amount; return self.balance",
                        "def withdraw(self, amount): if amount <= self.balance: self.balance -= amount; return self.balance; return 'Insufficient funds'"
                    ],
                    "solution": """class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return self.balance
        return "Insufficient funds"

acc = BankAccount("Alice", 100)
acc.deposit(50)
acc.withdraw(30)
print(acc.balance)
""",
                    "test_cases": [
                        {
                            "name": "Check BankAccount balance after transactions",
                            "expected_output": "120\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-9-2",
                "title": "Inheritance & Special Methods",
                "difficulty": "Intermediate",
                "xp": 95,
                "summary": "Reuse logic via class inheritance and customize object behavior with __str__.",
                "content": """### Inheritance & Special Methods 🧬

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Dog(Animal):
    def speak(self):  # Override
        return f"{self.name} barks!"
```

- `super().__init__(...)` delegates to the parent class's constructor.
- `__str__` determines how the object prints when converted to string.
""",
                "starter_code": """class Device:
    def __init__(self, brand):
        self.brand = brand

class Phone(Device):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model

    def __str__(self):
        return f"{self.brand} {self.model}"

print(Phone("Google", "Pixel"))
""",
                "quiz": {
                    "question": "What does `super().__init__(...)` do in a subclass?",
                    "options": [
                        "Creates a static method",
                        "Calls the parent class constructor",
                        "Overrides all child methods",
                        "Deletes parent attributes"
                    ],
                    "correct_index": 1,
                    "explanation": "super() provides access to the parent class constructor and methods."
                },
                "challenge": {
                    "instructions": "Create a class `Rectangle` with `__init__(self, width, height)` and a method `area(self)` returning `width * height`.\nThen create a subclass `Square(Rectangle)` whose constructor takes `side_length` and passes it to `super().__init__(side_length, side_length)`.\nInstantiate `sq = Square(5)` and print `sq.area()`.",
                    "starter": """class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    # Implement constructor with super():
    pass

sq = Square(5)
print(sq.area())
""",
                    "hints": [
                        "class Square(Rectangle):",
                        "    def __init__(self, side_length):",
                        "        super().__init__(side_length, side_length)"
                    ],
                    "solution": """class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, side_length):
        super().__init__(side_length, side_length)

sq = Square(5)
print(sq.area())
""",
                    "test_cases": [
                        {
                            "name": "Check Square area inheritance",
                            "expected_output": "25\n"
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "module-10",
        "title": "Module 10: Hands-on Mini Projects",
        "icon": "🏆",
        "description": "Put your Python skills to work building real-world utilities and algorithmic solvers.",
        "lessons": [
            {
                "id": "lesson-10-1",
                "title": "Project: Password Strength Checker",
                "difficulty": "Advanced",
                "xp": 120,
                "summary": "Build a security evaluation utility analyzing password length, diversity, and complexity.",
                "content": """### Project: Password Security Evaluator 🔐

Evaluate passwords based on:
1. Length >= 8
2. Has uppercase `[A-Z]`
3. Has lowercase `[a-z]`
4. Has digit `[0-9]`
5. Has special character `[!@#$%^&*]`

- **Strong**: Meets all 5 criteria.
- **Medium**: Length >= 6 and meets at least 2 bonus criteria (upper, digit, special).
- **Weak**: Everything else.
""",
                "starter_code": """pwd = "PyDev2026!"
has_upper = any(c.isupper() for c in pwd)
has_digit = any(c.isdigit() for c in pwd)
print(f"Upper: {has_upper}, Digit: {has_digit}")
""",
                "quiz": {
                    "question": "What is the most pythonic way to check if any character in string `s` is a digit?",
                    "options": [
                        "any(c.isdigit() for c in s)",
                        "s.find('0123456789')",
                        "int(s)",
                        "[c for c in s if c == 0]"
                    ],
                    "correct_index": 0,
                    "explanation": "any(c.isdigit() for c in s) cleanly tests each character and short-circuits on the first digit found."
                },
                "challenge": {
                    "instructions": "Write a function `check_password(pwd)` returning:\n- `'Strong'` if length >= 8, has upper, lower, digit, and special (from `!@#$%^&*`)\n- `'Medium'` if length >= 6 and has at least two of (upper, digit, special)\n- `'Weak'` otherwise.\n\nPrint `[check_password('P@ssword1'), check_password('secret123'), check_password('hi')]`.",
                    "starter": """def check_password(pwd):
    # Your evaluation logic here:
    pass

print([check_password('P@ssword1'), check_password('secret123'), check_password('hi')])
""",
                    "hints": [
                        "specials = '!@#$%^&*'",
                        "has_upper = any(c.isupper() for c in pwd)",
                        "has_lower = any(c.islower() for c in pwd)",
                        "has_digit = any(c.isdigit() for c in pwd)",
                        "has_special = any(c in specials for c in pwd)"
                    ],
                    "solution": """def check_password(pwd):
    specials = "!@#$%^&*"
    has_upper = any(c.isupper() for c in pwd)
    has_lower = any(c.islower() for c in pwd)
    has_digit = any(c.isdigit() for c in pwd)
    has_special = any(c in specials for c in pwd)

    if len(pwd) >= 8 and has_upper and has_lower and has_digit and has_special:
        return "Strong"
    bonus = sum([has_upper, has_digit, has_special])
    if len(pwd) >= 6 and bonus >= 2:
        return "Medium"
    return "Weak"

print([check_password('P@ssword1'), check_password('secret123'), check_password('hi')])
""",
                    "test_cases": [
                        {
                            "name": "Check password classifications",
                            "expected_output": "['Strong', 'Medium', 'Weak']\n"
                        }
                    ]
                }
            },
            {
                "id": "lesson-10-2",
                "title": "Project: Text Statistics & Word Frequency",
                "difficulty": "Advanced",
                "xp": 120,
                "summary": "Process natural language text to compute word counts, vocabulary size, and average word length.",
                "content": """### Project: Text Statistics 📊

Calculate key metrics on input text:
- `words`: Total word count (split by whitespace)
- `characters`: Total characters excluding spaces
- `avg_length`: Average word length rounded to 1 decimal place (or 0 if empty)
""",
                "starter_code": """text = "Code every single day"
words = text.split()
print("Words:", len(words))
""",
                "quiz": {
                    "question": "Which Python standard library class is specialized for tallying frequency counts?",
                    "options": [
                        "collections.Counter",
                        "math.Frequency",
                        "itertools.count",
                        "functools.reduce"
                    ],
                    "correct_index": 0,
                    "explanation": "collections.Counter is the standard tool for counting occurrences of items."
                },
                "challenge": {
                    "instructions": "Write a function `analyze_text(text)` that returns a dictionary:\n- `'words'`: number of words\n- `'characters'`: character count without spaces\n- `'avg_length'`: average word length rounded to 1 decimal place (or 0 if no words)\n\nPrint `analyze_text(\"Code every single day\")`.\nExpected: `{'words': 4, 'characters': 18, 'avg_length': 4.5}`.",
                    "starter": """def analyze_text(text):
    # Your code here:
    pass

print(analyze_text("Code every single day"))
""",
                    "hints": [
                        "words = text.split()",
                        "chars = sum(len(w) for w in words)",
                        "avg = round(chars / len(words), 1) if words else 0",
                        "return {'words': len(words), 'characters': chars, 'avg_length': avg}"
                    ],
                    "solution": """def analyze_text(text):
    words = text.split()
    chars = sum(len(w) for w in words)
    avg = round(chars / len(words), 1) if words else 0
    return {
        "words": len(words),
        "characters": chars,
        "avg_length": avg
    }

print(analyze_text("Code every single day"))
""",
                    "test_cases": [
                        {
                            "name": "Check text analysis dictionary output",
                            "expected_output": "{'words': 4, 'characters': 18, 'avg_length': 4.5}\n"
                        }
                    ]
                }
            }
        ]
    }
]

CHEATSHEET = [
    {
        "category": "Basic Syntax & Types",
        "items": [
            {
                "name": "Variables & Types",
                "code": "x = 42             # int\ny = 3.14           # float\nname = 'Alice'     # str\nis_valid = True    # bool",
                "desc": "Dynamically typed variables; types are inferred at assignment."
            },
            {
                "name": "Type Casting",
                "code": "int('10')          # 10\nfloat('3.5')       # 3.5\nstr(100)           # '100'\nbool(0)            # False",
                "desc": "Convert data types explicitly using constructor functions."
            },
            {
                "name": "Comments",
                "code": "# Single line comment\n\"\"\"\nMulti-line docstring\nor block comment\n\"\"\"",
                "desc": "Use # for single lines and triple quotes for docstrings."
            }
        ]
    },
    {
        "category": "Operators & Logic",
        "items": [
            {
                "name": "Arithmetic",
                "code": "a + b     # Addition\na - b     # Subtraction\na * b     # Multiplication\na / b     # Float division\na // b    # Floor division (int)\na % b     # Modulo (remainder)\na ** b    # Power (exponent)",
                "desc": "Standard math operators; / always produces a float."
            },
            {
                "name": "Comparison & Logic",
                "code": "a == b    # Equal\na != b    # Not equal\na and b   # Logical AND\na or b    # Logical OR\nnot a     # Logical NOT",
                "desc": "Evaluate conditions to True or False."
            }
        ]
    },
    {
        "category": "Control Flow",
        "items": [
            {
                "name": "If - Elif - Else",
                "code": "if score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelse:\n    grade = 'C'",
                "desc": "Branching execution paths with indentation blocks."
            },
            {
                "name": "Ternary Operator",
                "code": "status = 'Passed' if score >= 70 else 'Failed'",
                "desc": "Concise single-line conditional assignment."
            },
            {
                "name": "For Loop & Range",
                "code": "for i in range(5):          # 0 to 4\n    print(i)\nfor item in ['a', 'b', 'c']:\n    print(item)",
                "desc": "Iterate over collections or arithmetic ranges."
            },
            {
                "name": "While Loop",
                "code": "count = 5\nwhile count > 0:\n    print(count)\n    count -= 1",
                "desc": "Execute repeatedly while condition is truthy."
            },
            {
                "name": "Loop Controls",
                "code": "break       # Exit loop immediately\ncontinue    # Skip to next iteration\npass        # Do nothing placeholder",
                "desc": "Control loop execution flow."
            }
        ]
    },
    {
        "category": "Data Structures",
        "items": [
            {
                "name": "Lists (Mutable)",
                "code": "items = [1, 2, 3]\nitems.append(4)      # [1, 2, 3, 4]\nitems.pop()          # removes 4\nitems.sort()         # in-place sort\nsub = items[1:3]     # slicing",
                "desc": "Ordered, mutable sequences with 0-based indexing."
            },
            {
                "name": "Dictionaries (Key-Value)",
                "code": "user = {'name': 'Sam', 'age': 28}\nuser['email'] = 'sam@test.com'\nval = user.get('role', 'Guest')\nfor k, v in user.items():\n    print(k, v)",
                "desc": "Fast key-value store; .get() avoids KeyError."
            },
            {
                "name": "Sets (Unique)",
                "code": "s = {1, 2, 3, 3}     # {1, 2, 3}\ns.add(4)\nunion = s | {4, 5}   # {1, 2, 3, 4, 5}\ninter = s & {2, 3}   # {2, 3}",
                "desc": "Unordered collection of unique items with math set operations."
            },
            {
                "name": "List Comprehensions",
                "code": "# [expr for item in iter if cond]\nevens = [x for x in range(10) if x % 2 == 0]\nsquared = [x**2 for x in [1, 2, 3]]",
                "desc": "Compact pythonic syntax to create transformed lists."
            }
        ]
    },
    {
        "category": "Functions & OOP",
        "items": [
            {
                "name": "Function Definition",
                "code": "def calculate(a, b, tax=0.05):\n    \"\"\"Docstring explanation.\"\"\"\n    return (a + b) * (1 + tax)",
                "desc": "Define functions with default parameters and return values."
            },
            {
                "name": "Flexible Args (*args, **kwargs)",
                "code": "def log_event(*args, **kwargs):\n    # args is tuple, kwargs is dict\n    print(args, kwargs)",
                "desc": "Accept variable positional and keyword arguments."
            },
            {
                "name": "Lambda Expressions",
                "code": "square = lambda x: x ** 2\nsorted_users = sorted(users, key=lambda u: u['age'])",
                "desc": "One-line anonymous functions, ideal for sort keys."
            },
            {
                "name": "Classes & OOP",
                "code": "class User:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f'Hello, {self.name}!'",
                "desc": "Class blueprint with constructor __init__ and instance methods."
            }
        ]
    },
    {
        "category": "Error Handling",
        "items": [
            {
                "name": "Try - Except - Finally",
                "code": "try:\n    res = 10 / divisor\nexcept ZeroDivisionError as e:\n    print('Cannot divide by zero')\nelse:\n    print('Success:', res)\nfinally:\n    print('Cleanup complete')",
                "desc": "Catch exceptions to prevent runtime crashes."
            },
            {
                "name": "Raising Exceptions",
                "code": "if age < 0:\n    raise ValueError('Age cannot be negative')",
                "desc": "Trigger intentional exceptions on invalid states."
            }
        ]
    }
]

def main():
    with open("data/curriculum.json", "w", encoding="utf-8") as f:
        json.dump(CURRICULUM, f, indent=2)
    print(f"Generated data/curriculum.json ({len(CURRICULUM)} modules)")

    with open("data/cheatsheet.json", "w", encoding="utf-8") as f:
        json.dump(CHEATSHEET, f, indent=2)
    print(f"Generated data/cheatsheet.json ({len(CHEATSHEET)} categories)")

if __name__ == "__main__":
    main()
