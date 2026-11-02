/**
 * Phanix - Interactive Python Learning Platform
 * Client Application Logic
 */

// URL-based Reset Check (e.g. visit /?reset=true to start fresh)
if (new URLSearchParams(window.location.search).has('reset')) {
  [
    'pylearn_xp',
    'pylearn_streak',
    'pylearn_last_streak_date',
    'pylearn_completed_lessons',
    'pylearn_completed_quizzes',
    'pylearn_completed_challenges',
    'pylearn_badges',
    'pylearn_user_codes',
    'pylearn_playground_code',
    'pylearn_current_lesson'
  ].forEach(k => localStorage.removeItem(k));
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Application State
const state = {
  modules: [],
  cheatsheet: [],
  currentLessonId: null,
  xp: parseInt(localStorage.getItem('pylearn_xp') || '0', 10),
  streak: parseInt(localStorage.getItem('pylearn_streak') || '1', 10),
  completedLessons: JSON.parse(localStorage.getItem('pylearn_completed_lessons') || '[]'),
  completedQuizzes: JSON.parse(localStorage.getItem('pylearn_completed_quizzes') || '[]'),
  completedChallenges: JSON.parse(localStorage.getItem('pylearn_completed_challenges') || '[]'),
  unlockedBadges: JSON.parse(localStorage.getItem('pylearn_badges') || '[]'),
  userCodes: JSON.parse(localStorage.getItem('pylearn_user_codes') || '{}'),
  theme: localStorage.getItem('pylearn_theme') || 'dark',
  learnerName: localStorage.getItem('pylearn_name') || 'Your Name',
  layoutMode: localStorage.getItem('pylearn_layout_mode') || 'split',
  fontSize: parseInt(localStorage.getItem('pylearn_font_size') || '15', 10),
  certificateUnlocked: localStorage.getItem('pylearn_cert_unlocked') === 'true',
  certificateId: localStorage.getItem('pylearn_cert_id') || null,
  certificateCompletedOn: localStorage.getItem('pylearn_cert_completed_on') || null
};

// Playground Preset Templates
const PLAYGROUND_TEMPLATES = {
  forensic_hasher: `# Digital Forensics: Cryptographic Evidence Hasher
import hashlib
import time

def hash_evidence(evidence_name, data_bytes):
    """Generates MD5, SHA-1, and SHA-256 digital forensics hashes."""
    md5_hash = hashlib.md5(data_bytes).hexdigest()
    sha1_hash = hashlib.sha1(data_bytes).hexdigest()
    sha256_hash = hashlib.sha256(data_bytes).hexdigest()
    
    return {
        "Evidence ID": evidence_name,
        "Timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        "MD5": md5_hash,
        "SHA-1": sha1_hash,
        "SHA-256": sha256_hash,
        "Byte Size": len(data_bytes)
    }

sample_evidence = b"DISK_IMAGE_SECTOR_0x7FFA: Unauthorized PowerShell script execution."
result = hash_evidence("EVIDENCE_ITEM_001.bin", sample_evidence)

print("=== PHANIX DIGITAL FORENSIC EVIDENCE LOG ===")
for key, value in result.items():
    print(f"{key:<14}: {value}")
print("============================================")
print("Chain of Custody Status: VERIFIED & INTACT ✓")
`,

  log_investigator: `# Cyber Security Incident Response: Log Threat Extractor
import re
from collections import Counter

auth_logs = """
2026-09-08 22:15:01 192.168.1.105 POST /login 401 Unauthorized
2026-09-08 22:15:04 192.168.1.105 POST /login 401 Unauthorized
2026-09-08 22:15:09 192.168.1.105 POST /login 401 Unauthorized
2026-09-08 22:15:15 192.168.1.105 POST /login 200 Success
2026-09-08 22:18:22 10.0.0.42 GET /index.html 200 OK
2026-09-08 22:20:11 45.33.32.156 GET /admin/' OR '1'='1 403 Forbidden
2026-09-08 22:20:13 45.33.32.156 GET /cgi-bin/test.cgi 404 Not Found
"""

# Extract all IP addresses
ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
ips = re.findall(ip_pattern, auth_logs)
ip_counts = Counter(ips)

print("=== FORENSIC LOG AUDIT REPORT ===")
print("Detected IP Addresses & Request Volume:")
for ip, count in ip_counts.items():
    print(f" - IP {ip:<15} -> {count} requests")

# Detect SQL injection attack pattern
sql_attacks = [line for line in auth_logs.strip().splitlines() if "' OR '" in line]
print(f"\nPotential SQL Injection Alerts Detected: {len(sql_attacks)}")
for alert in sql_attacks:
    print(f" ⚠️ Flagged: {alert}")
`,

  hello: `# Phanix Python Playground
import sys
import platform

print("Hello from Phanix!")
print(f"Python Version: {platform.python_version()}")
print(f"Platform: {platform.system()} {platform.release()}")
print("Try modifying this code and click 'Run Code'!")
`,

  fibonacci: `# Fibonacci Generator with Memoization
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

print("First 15 Fibonacci numbers:")
for i in range(15):
    print(f"F({i:2d}) = {fibonacci(i)}")
`,

  quicksort: `# QuickSort Algorithm Implementation
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

numbers = [38, 27, 43, 3, 9, 82, 10, 19, 50]
print("Original:", numbers)
print("Sorted:  ", quicksort(numbers))
`,

  palindrome: `# Palindrome & Anagram Checkers
def is_palindrome(text):
    cleaned = ''.join(c.lower() for c in text if c.isalnum())
    return cleaned == cleaned[::-1]

def are_anagrams(str1, str2):
    c1 = ''.join(sorted(str1.lower().replace(' ', '')))
    c2 = ''.join(sorted(str2.lower().replace(' ', '')))
    return c1 == c2

phrases = ["Racecar", "A man a plan a canal Panama", "Hello World"]
for p in phrases:
    print(f"'{p}' -> Palindrome? {is_palindrome(p)}")

print("\nAnagram Check:")
print("'listen' and 'silent'?", are_anagrams("listen", "silent"))
`,

  adventure: `# Mini Text Adventure Game Engine
class Room:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.exits = {}

entrance = Room("Castle Entrance", "A massive stone archway illuminated by torches.")
hall = Room("Great Hall", "A long hall with banners and a grand fireplace.")
armory = Room("Armory", "Racks of ancient swords and shields line the walls.")

entrance.exits["north"] = hall
hall.exits["south"] = entrance
hall.exits["east"] = armory
armory.exits["west"] = hall

print("=== Welcome to Citadel Quest ===")
current = entrance
print(f"Location: {current.name}")
print(current.description)
print("Available paths:", list(current.exits.keys()))
`,

  wordstats: `# Word Frequency Counter & Analyzer
from collections import Counter
import re

text = """Python is dynamic, readable, and powerful.
Python enables developers to write clear, logical code for small and large-scale projects."""

words = re.findall(r'\b\w+\b', text.lower())
counts = Counter(words)

print(f"Total Words: {len(words)}")
print(f"Unique Vocabulary: {len(counts)}")
print("\nTop 5 Most Frequent Words:")
for word, freq in counts.most_common(5):
    print(f" - '{word}': {freq} times")
`
};

// Available Achievement Badges
const BADGES_DEFINITIONS = [
  { id: 'first_run', title: 'Hello World Pioneer', icon: '🚀', desc: 'Ran Python code for the first time' },
  { id: 'first_quiz', title: 'Quiz Whiz', icon: '🧠', desc: 'Answered your first concept quiz correctly' },
  { id: 'first_challenge', title: 'Problem Solver', icon: '🎯', desc: 'Passed your first coding challenge' },
  { id: 'module-1', title: 'Syntax Apprentice', icon: '📘', desc: 'Completed all Module 1 lessons' },
  { id: 'module-3', title: 'Logic Navigator', icon: '🔀', desc: 'Mastered conditionals & control flow' },
  { id: 'module-4', title: 'Loop Champion', icon: '🔁', desc: 'Conquered loops and iteration' },
  { id: 'module-5', title: 'Data Structure Sage', icon: '📚', desc: 'Mastered lists, dicts, and comprehensions' },
  { id: 'module-6', title: 'Function Maestro', icon: '⚙️', desc: 'Crafted reusable functions and lambdas' },
  { id: 'module-9', title: 'OOP Architect', icon: '🏛️', desc: 'Built classes and leveraged inheritance' },
  { id: 'century_xp', title: 'Century Club', icon: '⭐', desc: 'Accumulated 200+ Experience Points' },
  { id: 'master_developer', title: 'Python Graduate', icon: '🎓', desc: 'Completed all challenges and modules' }
];

// Plain-language explanations shown in every lesson.
const CONCEPT_GUIDES = {
  'Hello, Python! & Output': ['`print()` tells Python to show words or numbers on the screen.', 'Use it to show a greeting, an answer, or a result while testing your program.', 'Put what you want to show inside `print()`, for example `print("Hello")`.'],
  'Variables & Data Types': ['A variable is a named box that remembers a value, such as a name, score, or price.', 'Use variables when a value will be needed again later in your program.', 'Write a name, then `=`, then the value: `age = 18`.'],
  'Type Casting & Conversion': ['Type casting changes one kind of value into another, such as text into a number.', 'Use it when user input is text but you need to do maths with it.', 'Use `int()`, `float()`, or `str()` around the value you want to change.'],
  'Arithmetic Operators & Math': ['Operators are maths symbols such as `+`, `-`, `*`, and `/`.', 'Use them for totals, prices, scores, distances, and any calculation.', 'Put numbers or variables on both sides of the operator: `total = price + tax`.'],
  'Comparison & Logical Operators': ['Comparisons ask a question and give `True` or `False`.', 'Use them when your program needs to check age, score, password, or any rule.', 'Write a check like `score >= 50`; join checks with `and` or `or` when needed.'],
  'If, Elif, and Else': ['`if` lets your program choose what to do based on a condition.', 'Use it for grades, logins, discounts, game rules, and many other decisions.', 'Write the condition after `if`, end it with `:`, then indent the code below it.'],
  'Ternary Operators & Truthiness': ['A ternary expression is a short one-line choice; truthiness means whether Python sees a value as true or false.', 'Use it for small simple choices, such as showing “Adult” or “Minor”.', 'Write `answer_if_true if condition else answer_if_false`.'],
  'For Loops & The range() Function': ['A `for` loop repeats code once for every item or number.', 'Use it to go through a list, print repeated messages, or count a fixed number of times.', 'Use `for number in range(3):` and indent the action you want repeated.'],
  'While Loops & Loop Control': ['A `while` loop keeps repeating while its condition is true.', 'Use it when you do not know exactly how many repeats you need, such as asking until an answer is valid.', 'Change something inside the loop so the condition can become false; use `break` to stop early.'],
  'Lists & List Operations': ['A list is one variable that stores many items in order, like a shopping list.', 'Use it for names, marks, products, tasks, or any group of values.', 'Make one with square brackets: `fruits = ["apple", "banana"]`; get the first item with `fruits[0]`.'],
  'Dictionaries (Key-Value Pairs)': ['A dictionary stores labelled information: each key has one value, like a form field and its answer.', 'Use it for a user profile, product details, settings, or any named data.', 'Make one with braces: `user = {"name": "Sam"}` and read it with `user["name"]`.'],
  'Tuples, Sets, & List Comprehensions': ['A tuple is fixed, a set keeps only unique items, and a list comprehension builds a list in one line.', 'Use tuples for values that should not change, sets to remove duplicates, and comprehensions for quick list transformations.', 'Choose `()`, `{}`, or `[]` based on the job, then run the example to see the difference.'],
  'Defining Functions & Return Values': ['A function is a reusable mini-program with a name.', 'Use functions when the same job may happen many times, such as calculating a total or greeting a user.', 'Write `def name():`, indent the steps, and use `return` when the function should give a result back.'],
  '*args, **kwargs, & Lambdas': ['`*args` accepts many unnamed values, `**kwargs` accepts named values, and a lambda is a tiny one-line function.', 'Use them when a function needs flexible input or a short calculation.', 'Start with normal functions first; then use these tools when you see why the input may change.'],
  'String Methods & Slicing': ['A string is text. Methods change or inspect that text; slicing takes out part of it.', 'Use them to clean names, split sentences, search text, or format messages.', 'Use a dot method like `name.upper()` or take part of text with `name[0:3]`.'],
  'Modern f-Strings Formatting': ['An f-string puts variables directly inside a piece of text.', 'Use it to make readable messages, receipts, reports, and labels.', 'Put `f` before quotes and place a variable in braces: `f"Hello, {name}"`.'],
  'Try, Except, Else, and Finally': ['These words help your program handle an error without suddenly stopping.', 'Use them for user input, files, network data, or any action that may fail.', 'Put risky code in `try`; tell Python what to do if it fails in `except`.'],
  'Classes, Objects, and __init__': ['A class is a blueprint; an object is one real thing created from that blueprint.', 'Use classes when many things have the same kind of information and actions, such as students or products.', 'Write a class, then create an object like `dog = Dog("Buddy")`.'],
  'Inheritance & Special Methods': ['Inheritance lets a new class reuse another class’s code; special methods customise built-in behaviour.', 'Use it when related objects share common features, such as a Dog and Cat both being Animals.', 'Put the parent class in brackets: `class Dog(Animal):`, then add or change only what is different.'],
  'Project: Password Strength Checker': ['This project checks several password rules and gives a strength result.', 'Use this kind of logic in signup forms and security tools.', 'Check one rule at a time, count the passed rules, then choose the final label.'],
  'Project: Text Statistics & Word Frequency': ['This project reads text and counts useful information, such as words and characters.', 'Use it in note apps, reports, search tools, and text-analysis projects.', 'First split the text into words, then count or calculate one result at a time.']
};

function formatConceptText(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escapeHTML(text) {
  return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function explainCodeLine(line) {
  const clean = line.trim();
  if (!clean) return 'This blank line separates the steps so the code is easier to read.';
  if (clean.startsWith('#')) return 'This is a comment. It explains the code to a person; Python does not run it.';
  if (/^for\s+.+\s+in\s+.+\s+if\s+/.test(clean) || (/\[.*\bfor\b.*\bif\b.*\]/.test(clean))) return 'This goes through items and keeps only the items that pass the condition.';
  if (clean.startsWith('for ')) return 'This repeats the indented code once for each item or number.';
  if (clean.startsWith('while ')) return 'This repeats the indented code while its condition is true.';
  if (clean.startsWith('def ')) return 'This creates a reusable function. The function runs only when you call its name later.';
  if (clean.startsWith('class ')) return 'This creates a class: a blueprint for making related objects.';
  if (clean.startsWith('try:')) return 'This starts code that might cause an error, so the program can handle it safely.';
  if (clean.startsWith('except ')) return 'This says what to do if the matching error happens.';
  if (clean.startsWith('with open(')) return 'This safely opens a file and closes it when this block finishes.';
  if (clean.startsWith('raise ')) return 'This deliberately stops the code and shows a clear error message.';
  if (clean.startsWith('if ')) return 'This checks a condition. The indented code runs only when the answer is true.';
  if (clean.startsWith('elif ')) return 'This checks another condition when the earlier condition was not true.';
  if (clean === 'else:' || clean.startsWith('else:')) return 'This runs when none of the earlier conditions were true.';
  if (clean.startsWith('print(')) return 'This shows the result on the screen.';
  if (clean.startsWith('return ')) return 'This sends the calculated result back from the function.';
  if (clean.includes('.append(')) return 'This adds one new item to the end of a list.';
  if (clean.includes('.sort(')) return 'This sorts the items in the list from smallest to largest.';
  if (clean.includes('sorted(')) return 'This creates a sorted version of the values, from smallest to largest by default.';
  if (/^[A-Za-z_]\w*\s*=/.test(clean)) return 'This stores a value in a variable so the program can use it later.';
  return 'Python runs this line as the next small step in the solution.';
}

function buildChallengeWalkthrough(challenge) {
  const hints = challenge.hints || [];
  const solutionLines = String(challenge.solution || '').split('\n').filter(line => line.trim());
  const plan = hints.length ? hints.map(hint => `<li>${escapeHTML(hint)}</li>`).join('') : '<li>Break the task into small steps and test each step.</li>';
  const lineGuide = solutionLines.length ? solutionLines.map(line => `<li><code>${escapeHTML(line)}</code><span>${explainCodeLine(line)}</span></li>`).join('') : '<li><span>Write one instruction at a time, then run your code.</span></li>';
  const solution = solutionLines.length ? `<pre><code>${escapeHTML(challenge.solution)}</code></pre>` : '';

  return `<details class="challenge-walkthrough">
    <summary><span class="walkthrough-toggle-icon" aria-hidden="true"></span><span>How to solve this task — explained step by step</span></summary>
    <div class="challenge-walkthrough-body">
      <p><strong>What you need to do:</strong> ${escapeHTML(challenge.instructions).replace(/\n/g, ' ')}</p>
      <strong>Small plan:</strong><ol>${plan}</ol>
      <strong>One working solution:</strong>${solution}
      <strong>What each code line does:</strong><ol class="solution-line-guide">${lineGuide}</ol>
    </div>
  </details>`;
}

function buildCheatsheetExampleGuide(code) {
  const lines = String(code || '').split('\n');
  return `<details class="sheet-line-guide">
    <summary>🔎 Explain every line</summary>
    <ol>${lines.map(line => `<li><code>${escapeHTML(line || 'blank line')}</code><span>${explainCodeLine(line)}</span></li>`).join('')}</ol>
    <p><strong>Try this next:</strong> Run the code once, change one small value, and run it again. This is how you learn what each line changes.</p>
  </details>`;
}

// DOM Elements
const elements = {
  headerXp: document.getElementById('header-xp'),
  headerStreak: document.getElementById('header-streak'),
  aboutNavBtn: document.getElementById('about-nav-btn'),
  themeToggle: document.getElementById('theme-toggle'),
  brandLink: document.getElementById('brand-link'),
  navButtons: document.querySelectorAll('.nav-btn'),
  viewPanels: document.querySelectorAll('.view-panel'),
  
  // Learn View & Layouts
  viewLearn: document.getElementById('view-learn'),
  layoutPresetSwitcher: document.getElementById('layout-preset-switcher'),
  layoutBtns: document.querySelectorAll('.layout-btn'),
  codeModeTheoryBtn: document.getElementById('code-mode-theory-btn'),
  jumpToCodeBtn: document.getElementById('jump-to-code-btn'),
  moduleListContainer: document.getElementById('module-list-container'),
  sidebarCollapseBtn: document.getElementById('sidebar-collapse-btn'),
  overallProgressBar: document.getElementById('overall-progress-bar'),
  overallProgressText: document.getElementById('overall-progress-text'),
  lessonDifficulty: document.getElementById('lesson-difficulty'),
  lessonXpBadge: document.getElementById('lesson-xp-badge'),
  lessonCompletedTag: document.getElementById('lesson-completed-tag'),
  lessonTitle: document.getElementById('lesson-title'),
  lessonBody: document.getElementById('lesson-body'),
  
  // Quiz
  quizQuestionText: document.getElementById('quiz-question-text'),
  quizOptionsList: document.getElementById('quiz-options-list'),
  quizFeedbackBox: document.getElementById('quiz-feedback-box'),
  
  // Workspace / Editor
  challengeInstructionsText: document.getElementById('challenge-instructions-text'),
  hintBtn: document.getElementById('hint-btn'),
  hintBox: document.getElementById('hint-box'),
  hintText: document.getElementById('hint-text'),
  resetCodeBtn: document.getElementById('reset-code-btn'),
  runCodeBtn: document.getElementById('run-code-btn'),
  testCodeBtn: document.getElementById('test-code-btn'),
  fontDecBtn: document.getElementById('font-dec-btn'),
  fontIncBtn: document.getElementById('font-inc-btn'),
  codeEditor: document.getElementById('code-editor'),
  editorSyntaxLayer: document.getElementById('editor-syntax-layer'),
  editorLineNumbers: document.getElementById('editor-line-numbers'),
  
  // Terminal (Learn)
  learnTerminalArea: document.getElementById('learn-terminal-area'),
  termDotClear: document.getElementById('term-dot-clear'),
  termDotMinimize: document.getElementById('term-dot-minimize'),
  termDotExpand: document.getElementById('term-dot-expand'),
  termTabs: document.querySelectorAll('#learn-terminal-area .term-tab'),
  stdoutView: document.getElementById('stdout-view'),
  stdinView: document.getElementById('stdin-view'),
  testsView: document.getElementById('tests-view'),
  stdoutContent: document.getElementById('stdout-content'),
  stderrContent: document.getElementById('stderr-content'),
  learnTerminalScreen: document.getElementById('learn-terminal-screen'),
  inputNeededBanner: document.getElementById('input-needed-banner'),
  termInteractiveInput: document.getElementById('term-interactive-input'),
  termSendInputBtn: document.getElementById('term-send-input-btn'),
  stdinContent: document.getElementById('stdin-content'),
  stdinBadge: document.getElementById('stdin-badge'),
  stdinSampleBtn: document.getElementById('stdin-sample-btn'),
  stdinClearBtn: document.getElementById('stdin-clear-btn'),
  stdinRunBtn: document.getElementById('stdin-run-btn'),
  stdinCharCount: document.getElementById('stdin-char-count'),
  testResultsContainer: document.getElementById('test-results-container'),
  testSummaryPill: document.getElementById('test-summary-pill'),
  termStatus: document.getElementById('term-status'),
  copyConsoleBtn: document.getElementById('copy-console-btn'),
  clearConsoleBtn: document.getElementById('clear-console-btn'),
  expandConsoleBtn: document.getElementById('expand-console-btn'),

  // Playground
  pgConsoleBox: document.getElementById('pg-console-box'),
  pgDotClear: document.getElementById('pg-dot-clear'),
  pgDotMinimize: document.getElementById('pg-dot-minimize'),
  pgDotExpand: document.getElementById('pg-dot-expand'),
  pgTemplateSelect: document.getElementById('pg-template-select'),
  pgClearBtn: document.getElementById('pg-clear-btn'),
  pgRunBtn: document.getElementById('pg-run-btn'),
  pgEditor: document.getElementById('pg-editor'),
  pgSyntaxLayer: document.getElementById('pg-syntax-layer'),
  pgLineNumbers: document.getElementById('pg-line-numbers'),
  pgTermTabs: document.querySelectorAll('.pg-term-tabs .term-tab'),
  pgStdoutView: document.getElementById('pg-stdout-view'),
  pgStdinView: document.getElementById('pg-stdin-view'),
  pgStdout: document.getElementById('pg-stdout'),
  pgStderr: document.getElementById('pg-stderr'),
  pgDurationMeta: document.getElementById('pg-duration-meta'),
  pgTermStatus: document.getElementById('pg-term-status'),
  pgCopyBtn: document.getElementById('pg-copy-btn'),
  pgClearConsoleBtn: document.getElementById('pg-clear-console-btn'),
  pgTerminalScreen: document.getElementById('pg-terminal-screen'),
  pgInteractiveInput: document.getElementById('pg-interactive-input'),
  pgSendInputBtn: document.getElementById('pg-send-input-btn'),
  pgInputNeededBanner: document.getElementById('pg-input-needed-banner'),
  pgStdinContent: document.getElementById('pg-stdin-content'),
  pgStdinBadge: document.getElementById('pg-stdin-badge'),
  pgStdinSampleBtn: document.getElementById('pg-stdin-sample-btn'),
  pgStdinClearBtn: document.getElementById('pg-stdin-clear-btn'),
  pgStdinRunBtn: document.getElementById('pg-stdin-run-btn'),
  pgStdinCharCount: document.getElementById('pg-stdin-char-count'),

  // Challenges Catalog
  challengesCatalogGrid: document.getElementById('challenges-catalog-grid'),

  // Cheat Sheet
  cheatsheetSearch: document.getElementById('cheatsheet-search'),
  cheatsheetSearchClear: document.getElementById('cheatsheet-search-clear'),
  cheatsheetGrid: document.getElementById('cheatsheet-grid'),
  cheatsheetNav: document.getElementById('cheatsheet-nav'),
  cheatsheetCount: document.getElementById('cheatsheet-count'),
  sheetViewToggle: document.getElementById('sheet-view-toggle'),
  sheetStartDismiss: document.getElementById('sheet-start-dismiss'),
  sheetStartCard: document.getElementById('sheet-start-card'),

  // Reviews
  reviewsForm: document.getElementById('reviews-form'),
  reviewName: document.getElementById('review-name'),
  reviewEmail: document.getElementById('review-email'),
  reviewTopic: document.getElementById('review-topic'),
  reviewMessage: document.getElementById('review-message'),

  // Achievements
  achXp: document.getElementById('ach-xp'),
  achLessons: document.getElementById('ach-lessons'),
  achChallenges: document.getElementById('ach-challenges'),
  achQuizzes: document.getElementById('ach-quizzes'),
  badgesGrid: document.getElementById('badges-grid'),
  certBox: document.getElementById('certificate-box'),
  certRecognitionBadge: document.getElementById('cert-recognition-badge'),
  certLearnerName: document.getElementById('cert-learner-name'),
  certDate: document.getElementById('cert-date'),
  certSerialId: document.getElementById('cert-serial-id'),
  certAccountEmail: document.getElementById('cert-account-email'),
  certDownloadBtn: document.getElementById('cert-download-btn'),
  certShareBtn: document.getElementById('cert-share-btn'),
  certStatus: document.getElementById('cert-status'),

  // Toast & Confetti
  toastContainer: document.getElementById('toast-container'),
  confettiCanvas: document.getElementById('confetti-canvas'),

  // Auth Elements
  userAuthWrapper: document.getElementById('user-auth-wrapper'),
  authBtnLogin: document.getElementById('auth-btn-login'),
  userPill: document.getElementById('user-pill'),
  userAvatar: document.getElementById('user-avatar'),
  userName: document.getElementById('user-name'),
  adminBadgeTag: document.getElementById('admin-badge-tag'),
  userDropdownMenu: document.getElementById('user-dropdown-menu'),
  userDropdownAvatar: document.getElementById('user-dropdown-avatar'),
  userDropdownName: document.getElementById('user-dropdown-name'),
  userDropdownEmail: document.getElementById('user-dropdown-email'),
  userDropdownRoleTag: document.getElementById('user-dropdown-role-tag'),
  userDropdownXp: document.getElementById('user-dropdown-xp'),
  userDropdownStreak: document.getElementById('user-dropdown-streak'),
  userDropdownLessons: document.getElementById('user-dropdown-lessons'),
  userDropdownProfileBtn: document.getElementById('user-dropdown-profile-btn'),
  userDropdownCertBtn: document.getElementById('user-dropdown-cert-btn'),
  userDropdownAdminBtn: document.getElementById('user-dropdown-admin-btn'),
  authBtnLogout: document.getElementById('auth-btn-logout'),
  authScreen: document.getElementById('auth-screen'),
  authModalOverlay: document.getElementById('auth-screen') || document.getElementById('auth-modal-overlay'),
  authModalClose: document.getElementById('auth-modal-close'),
  authModalTitle: document.getElementById('auth-modal-title'),
  authModalSubtitle: document.getElementById('auth-modal-subtitle'),
  tabLoginBtn: document.getElementById('tab-login-btn'),
  tabSignupBtn: document.getElementById('tab-signup-btn'),
  authAlert: document.getElementById('auth-alert'),
  authForm: document.getElementById('auth-form'),
  authNameGroup: document.getElementById('auth-name-group'),
  authNameInput: document.getElementById('auth-name-input'),
  authEmailInput: document.getElementById('auth-email-input'),
  authPasswordInput: document.getElementById('auth-password-input'),
  authForgotLink: document.getElementById('auth-forgot-link'),
  authSubmitBtn: document.getElementById('auth-submit-btn'),
  authSubmitText: document.getElementById('auth-submit-text'),
  authSpinner: document.getElementById('auth-spinner'),
  googleAuthBtn: document.getElementById('google-auth-btn'),
  authGuestBtn: document.getElementById('auth-guest-btn'),

  // Admin Elements
  navItemAdmin: document.getElementById('nav-item-admin'),
  navBtnAdmin: document.getElementById('nav-btn-admin'),
  adminRefreshBtn: document.getElementById('admin-refresh-btn'),
  adminStatUsers: document.getElementById('admin-stat-users'),
  adminStatXp: document.getElementById('admin-stat-xp'),
  adminStatLessons: document.getElementById('admin-stat-lessons'),
  adminStatStreak: document.getElementById('admin-stat-streak'),
  adminUserSearch: document.getElementById('admin-user-search'),
  adminTableCount: document.getElementById('admin-table-count'),
  adminLearnersTbody: document.getElementById('admin-learners-tbody')
};

// Initialize Application
async function initApp() {
  applyTheme(state.theme);
  updateDailyStreak();
  updateHeaderStats();
  applyFontSize(state.fontSize || 15);
  setupEventListeners();
  applyLayoutMode(state.layoutMode);
  setCurriculumCollapsed(localStorage.getItem('pylearn_curriculum_collapsed') === 'true');
  setupEditorHelpers(elements.codeEditor, elements.editorLineNumbers, elements.editorSyntaxLayer);
  setupEditorHelpers(elements.pgEditor, elements.pgLineNumbers, elements.pgSyntaxLayer);

  // Load playground initial forensic template or saved code
  const savedPgCode = localStorage.getItem('pylearn_playground_code');
  elements.pgEditor.value = savedPgCode || PLAYGROUND_TEMPLATES.forensic_hasher;
  updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
  updateSyntaxLayer(elements.pgEditor, elements.pgSyntaxLayer);

  // Initialize certificate name
  if (elements.certLearnerName) {
    elements.certLearnerName.value = state.learnerName;
  }
  updateCertificateStatus();

  try {
    await Promise.all([loadCurriculum(), loadCheatsheet()]);
    renderCurriculumTree();
    renderChallengesCatalog();
    renderCheatsheet();
    renderAchievements();
    checkAllProgress(); // restores badges for progress saved from an earlier visit

    // Select initial lesson
    const savedLesson = localStorage.getItem('pylearn_current_lesson');
    const firstLesson = state.modules[0]?.lessons[0]?.id;
    selectLesson(savedLesson || firstLesson || 'lesson-1-1');

    // Initialize Firebase Auth & Admin Check
    initFirebase();
  } catch (err) {
    console.error('Initialization error:', err);
    showToast('Failed to load curriculum data. Please refresh.', 'error');
  }
}

// Fetch data through the Python server. The data directory is intentionally not
// public, so requesting /data/*.json directly returns an HTML 404 page.
async function fetchApiJson(url, label) {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok || !contentType.includes('application/json')) {
    const responseText = await res.text();
    const detail = responseText.replace(/\s+/g, ' ').slice(0, 120);
    throw new Error(`${label} could not be loaded (${res.status}). ${detail || 'Start the Python server and refresh.'}`);
  }

  return res.json();
}

// Fetch Curriculum from Server API
async function loadCurriculum() {
  state.modules = await fetchApiJson('/api/curriculum', 'Curriculum');
}

// Fetch Cheat Sheet from Server API
async function loadCheatsheet() {
  state.cheatsheet = await fetchApiJson('/api/cheatsheet', 'Cheat sheet');
}

// Setup Event Listeners
function setupEventListeners() {
  if (elements.sidebarCollapseBtn) {
    elements.sidebarCollapseBtn.addEventListener('click', () => {
      const isCollapsed = !document.querySelector('.sidebar').classList.contains('collapsed');
      setCurriculumCollapsed(isCollapsed);
    });
  }
  // Theme Toggle
  elements.themeToggle.addEventListener('click', () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  // Navigation Tabs
  elements.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchView(targetId);
    });
  });

  // About button in header → opens about modal popup
  if (elements.aboutNavBtn) {
    elements.aboutNavBtn.addEventListener('click', openProfileModal);
  }


  elements.brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('view-learn');
  });

  // Layout Preset Switcher (1-Click View Switcher)
  if (elements.layoutBtns) {
    elements.layoutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-layout');
        applyLayoutMode(mode);
      });
    });
  }

  if (elements.jumpToCodeBtn) {
    elements.jumpToCodeBtn.addEventListener('click', () => {
      applyLayoutMode('code');
    });
  }

  if (elements.codeModeTheoryBtn) {
    elements.codeModeTheoryBtn.addEventListener('click', () => {
      applyLayoutMode('split');
    });
  }

  // Font Zoom Controls (A- / A+)
  if (elements.fontDecBtn) {
    elements.fontDecBtn.addEventListener('click', () => {
      applyFontSize((state.fontSize || 15) - 1);
    });
  }
  if (elements.fontIncBtn) {
    elements.fontIncBtn.addEventListener('click', () => {
      applyFontSize((state.fontSize || 15) + 1);
    });
  }

  // Learn View Editor Buttons
  elements.runCodeBtn.addEventListener('click', handleRunCode);
  elements.testCodeBtn.addEventListener('click', handleTestCode);
  elements.resetCodeBtn.addEventListener('click', handleResetCode);
  
  // Hint Button Toggle
  elements.hintBtn.addEventListener('click', () => {
    elements.hintBox.classList.toggle('show');
  });

  // Terminal Tabs (Learn)
  elements.termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const termType = tab.getAttribute('data-term-tab');
      switchTermTab(termType);
    });
  });

  // Stdin Buffer (Learn)
  function updateStdinStats() {
    if (!elements.stdinContent) return;
    const lines = elements.stdinContent.value.split('\n').filter(l => l.trim().length > 0).length;
    if (elements.stdinCharCount) {
      elements.stdinCharCount.textContent = `${lines} line${lines === 1 ? '' : 's'} buffered`;
    }
    if (elements.stdinBadge) {
      elements.stdinBadge.style.display = lines > 0 ? 'inline-block' : 'none';
    }
  }

  if (elements.stdinContent) {
    elements.stdinContent.addEventListener('input', updateStdinStats);
  }
  if (elements.stdinSampleBtn) {
    elements.stdinSampleBtn.addEventListener('click', () => {
      elements.stdinContent.value = "Phani\n25\nYes";
      updateStdinStats();
      showToast('Sample input loaded.', 'success');
    });
  }
  if (elements.stdinClearBtn) {
    elements.stdinClearBtn.addEventListener('click', () => {
      elements.stdinContent.value = '';
      updateStdinStats();
    });
  }
  if (elements.stdinRunBtn) {
    elements.stdinRunBtn.addEventListener('click', () => handleRunCode());
  }

  // Interactive Input Bar (Learn)
  function submitInteractiveInput() {
    const val = elements.termInteractiveInput ? elements.termInteractiveInput.value : '';
    if (!val.trim()) return;
    // Append to stdin buffer
    if (elements.stdinContent) {
      if (!elements.stdinContent.value.trim()) {
        elements.stdinContent.value = val;
      } else {
        elements.stdinContent.value += '\n' + val;
      }
      updateStdinStats();
    }
    const entered = val;
    if (elements.termInteractiveInput) elements.termInteractiveInput.value = '';
    handleRunCode(elements.stdinContent ? elements.stdinContent.value : entered);
  }

  if (elements.termInteractiveInput) {
    elements.termInteractiveInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitInteractiveInput();
      }
    });
  }
  if (elements.termSendInputBtn) {
    elements.termSendInputBtn.addEventListener('click', submitInteractiveInput);
  }

  // Console Action Controls (Learn)
  if (elements.clearConsoleBtn) {
    elements.clearConsoleBtn.addEventListener('click', () => {
      elements.stdoutContent.textContent = 'Console cleared.';
      elements.stderrContent.textContent = '';
      elements.stderrContent.style.display = 'none';
      if (elements.inputNeededBanner) elements.inputNeededBanner.style.display = 'none';
      setTerminalStatus('ready', 'Ready');
    });
  }
  if (elements.termDotClear) {
    elements.termDotClear.addEventListener('click', () => {
      elements.stdoutContent.textContent = 'Console cleared.';
      elements.stderrContent.textContent = '';
      elements.stderrContent.style.display = 'none';
      if (elements.inputNeededBanner) elements.inputNeededBanner.style.display = 'none';
      setTerminalStatus('ready', 'Ready');
    });
  }
  if (elements.copyConsoleBtn) {
    elements.copyConsoleBtn.addEventListener('click', () => {
      const text = [elements.stdoutContent.textContent, elements.stderrContent.textContent].filter(Boolean).join('\n').trim();
      copyToClipboard(text, elements.copyConsoleBtn);
    });
  }
  if (elements.expandConsoleBtn) {
    elements.expandConsoleBtn.addEventListener('click', () => {
      if (elements.learnTerminalArea) elements.learnTerminalArea.classList.toggle('expanded');
    });
  }
  if (elements.termDotExpand) {
    elements.termDotExpand.addEventListener('click', () => {
      if (elements.learnTerminalArea) elements.learnTerminalArea.classList.toggle('expanded');
    });
  }
  if (elements.termDotMinimize) {
    elements.termDotMinimize.addEventListener('click', () => {
      if (elements.learnTerminalArea) elements.learnTerminalArea.classList.toggle('minimized');
    });
  }

  // Playground Console Controls & Stdin
  if (elements.pgTermTabs) {
    elements.pgTermTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabType = tab.getAttribute('data-pg-tab');
        switchPgTab(tabType);
      });
    });
  }

  function updatePgStdinStats() {
    if (!elements.pgStdinContent) return;
    const lines = elements.pgStdinContent.value.split('\n').filter(l => l.trim().length > 0).length;
    if (elements.pgStdinCharCount) {
      elements.pgStdinCharCount.textContent = `${lines} line${lines === 1 ? '' : 's'} buffered`;
    }
    if (elements.pgStdinBadge) {
      elements.pgStdinBadge.style.display = lines > 0 ? 'inline-block' : 'none';
    }
  }

  if (elements.pgStdinContent) {
    elements.pgStdinContent.addEventListener('input', updatePgStdinStats);
  }
  if (elements.pgStdinSampleBtn) {
    elements.pgStdinSampleBtn.addEventListener('click', () => {
      elements.pgStdinContent.value = "10\n20\n30";
      updatePgStdinStats();
      showToast('Playground sample input loaded.', 'success');
    });
  }
  if (elements.pgStdinClearBtn) {
    elements.pgStdinClearBtn.addEventListener('click', () => {
      elements.pgStdinContent.value = '';
      updatePgStdinStats();
    });
  }
  if (elements.pgStdinRunBtn) {
    elements.pgStdinRunBtn.addEventListener('click', () => handlePlaygroundRun());
  }

  function submitPgInteractiveInput() {
    const val = elements.pgInteractiveInput ? elements.pgInteractiveInput.value : '';
    if (!val.trim()) return;
    if (elements.pgStdinContent) {
      if (!elements.pgStdinContent.value.trim()) {
        elements.pgStdinContent.value = val;
      } else {
        elements.pgStdinContent.value += '\n' + val;
      }
      updatePgStdinStats();
    }
    const entered = val;
    if (elements.pgInteractiveInput) elements.pgInteractiveInput.value = '';
    handlePlaygroundRun(elements.pgStdinContent ? elements.pgStdinContent.value : entered);
  }

  if (elements.pgInteractiveInput) {
    elements.pgInteractiveInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitPgInteractiveInput();
      }
    });
  }
  if (elements.pgSendInputBtn) {
    elements.pgSendInputBtn.addEventListener('click', submitPgInteractiveInput);
  }

  if (elements.pgCopyBtn) {
    elements.pgCopyBtn.addEventListener('click', () => {
      const text = [elements.pgStdout.textContent, elements.pgStderr.textContent].filter(Boolean).join('\n').trim();
      copyToClipboard(text, elements.pgCopyBtn);
    });
  }
  if (elements.pgClearConsoleBtn) {
    elements.pgClearConsoleBtn.addEventListener('click', () => {
      elements.pgStdout.textContent = '';
      elements.pgStderr.textContent = '';
      elements.pgStderr.style.display = 'none';
      if (elements.pgInputNeededBanner) elements.pgInputNeededBanner.style.display = 'none';
      setPgTerminalStatus('ready', 'Ready');
    });
  }
  if (elements.pgDotClear) {
    elements.pgDotClear.addEventListener('click', () => {
      elements.pgStdout.textContent = '';
      elements.pgStderr.textContent = '';
      elements.pgStderr.style.display = 'none';
      if (elements.pgInputNeededBanner) elements.pgInputNeededBanner.style.display = 'none';
      setPgTerminalStatus('ready', 'Ready');
    });
  }
  if (elements.pgDotExpand) {
    elements.pgDotExpand.addEventListener('click', () => {
      if (elements.pgConsoleBox) elements.pgConsoleBox.classList.toggle('expanded');
    });
  }
  if (elements.pgDotMinimize) {
    elements.pgDotMinimize.addEventListener('click', () => {
      if (elements.pgConsoleBox) elements.pgConsoleBox.classList.toggle('minimized');
    });
  }

  // Playground Template and Run
  elements.pgTemplateSelect.addEventListener('change', (e) => {
    const template = PLAYGROUND_TEMPLATES[e.target.value] || '';
    elements.pgEditor.value = template;
    updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
    updateSyntaxLayer(elements.pgEditor, elements.pgSyntaxLayer);
  });

  elements.pgClearBtn.addEventListener('click', () => {
    elements.pgEditor.value = '';
    elements.pgStdout.textContent = '';
    elements.pgStderr.textContent = '';
    elements.pgStderr.style.display = 'none';
    if (elements.pgInputNeededBanner) elements.pgInputNeededBanner.style.display = 'none';
    updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
    updateSyntaxLayer(elements.pgEditor, elements.pgSyntaxLayer);
  });

  elements.pgRunBtn.addEventListener('click', () => handlePlaygroundRun());

  // Cheat Sheet Search & Controls
  if (elements.cheatsheetSearch) {
    elements.cheatsheetSearch.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (elements.cheatsheetSearchClear) {
        elements.cheatsheetSearchClear.style.display = val ? 'flex' : 'none';
      }
      filterCheatsheet(val.toLowerCase());
    });
  }

  if (elements.cheatsheetSearchClear) {
    elements.cheatsheetSearchClear.addEventListener('click', () => {
      if (elements.cheatsheetSearch) {
        elements.cheatsheetSearch.value = '';
        elements.cheatsheetSearch.focus();
        elements.cheatsheetSearchClear.style.display = 'none';
        filterCheatsheet('');
      }
    });
  }

  // Keyboard shortcut '/' to search cheatsheet
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      const sheetView = document.getElementById('view-cheatsheet');
      if (sheetView && sheetView.classList.contains('active')) {
        e.preventDefault();
        elements.cheatsheetSearch?.focus();
      }
    }
  });

  if (elements.sheetStartDismiss && elements.sheetStartCard) {
    elements.sheetStartDismiss.addEventListener('click', () => {
      elements.sheetStartCard.style.display = 'none';
    });
  }

  // Layout View Switcher (Cards vs Compact)
  if (elements.sheetViewToggle) {
    elements.sheetViewToggle.querySelectorAll('.sheet-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.sheetViewToggle.querySelectorAll('.sheet-view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const viewMode = btn.dataset.view;
        if (elements.cheatsheetGrid) {
          if (viewMode === 'compact') {
            elements.cheatsheetGrid.classList.add('view-compact');
          } else {
            elements.cheatsheetGrid.classList.remove('view-compact');
          }
        }
      });
    });
  }

  // Copy Project URLs in Projects tab
  document.querySelectorAll('.copy-project-url').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || 'https://nittala-forensic-suite.vercel.app/';
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = '✓ Copied!';
        showToast('Website link copied: ' + url, 'success');
        setTimeout(() => { btn.textContent = '🔗 Copy Link'; }, 2000);
      } catch (err) {
        showToast('Website link: ' + url, 'info');
      }
    });
  });

  // Reviews form: prepares an email so feedback reaches the developer directly.
  if (elements.reviewsForm) {
    elements.reviewsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = elements.reviewName.value.trim() || 'Anonymous learner';
      const email = elements.reviewEmail.value.trim() || 'Not provided';
      const topic = elements.reviewTopic.value;
      const message = elements.reviewMessage.value.trim();
      const subject = `[Phanix] ${topic} from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`;
      showToast('Opening your default email app to send feedback...', 'info');
      window.location.href = `mailto:nittalaphaneendhar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Learner Name update on edit
  if (elements.certLearnerName) {
    elements.certLearnerName.addEventListener('input', () => {
      const name = elements.certLearnerName.value.trim() || 'Your Name';
      state.learnerName = name;
      localStorage.setItem('pylearn_name', name);
    });
  }

  // The browser's print dialog lets learners save a crisp, landscape PDF.
  if (elements.certDownloadBtn) {
    elements.certDownloadBtn.addEventListener('click', () => window.print());
  }

  // Reset Progress Button in Profile
  const achResetBtn = document.getElementById('ach-reset-btn');
  if (achResetBtn) {
    achResetBtn.addEventListener('click', () => window.resetAllProgress());
  }

  // Social Links Persistence
  const socialFields = ['gmail', 'linkedin', 'insta', 'github'];
  socialFields.forEach(field => {
    const el = document.getElementById('social-' + field);
    if (el) {
      el.value = localStorage.getItem('phanix_' + field) || '';
      el.addEventListener('input', (e) => {
        localStorage.setItem('phanix_' + field, e.target.value.trim());
      });
    }
  });
}

function setCurriculumCollapsed(isCollapsed) {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar || !elements.sidebarCollapseBtn) return;
  sidebar.classList.toggle('collapsed', isCollapsed);
  elements.sidebarCollapseBtn.textContent = isCollapsed ? '›' : '‹';
  elements.sidebarCollapseBtn.setAttribute('aria-label', isCollapsed ? 'Expand curriculum' : 'Collapse curriculum');
  elements.sidebarCollapseBtn.title = isCollapsed ? 'Expand curriculum' : 'Collapse curriculum';
  elements.sidebarCollapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
  localStorage.setItem('pylearn_curriculum_collapsed', String(isCollapsed));
}

// Layout Preset Mode Controller (Reading / Split / Code)
function applyLayoutMode(mode) {
  if (!['reading', 'split', 'code'].includes(mode)) mode = 'split';
  state.layoutMode = mode;
  localStorage.setItem('pylearn_layout_mode', mode);

  if (elements.viewLearn) {
    elements.viewLearn.classList.remove('layout-reading', 'layout-split', 'layout-code');
    elements.viewLearn.classList.add(`layout-${mode}`);
  }

  if (elements.layoutBtns) {
    elements.layoutBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-layout') === mode);
    });
  }

  if (elements.codeModeTheoryBtn) {
    elements.codeModeTheoryBtn.style.display = mode === 'code' ? 'inline-flex' : 'none';
  }

  // Refresh code editor line numbers when entering a mode with visible editor
  if (mode !== 'reading' && elements.codeEditor && elements.editorLineNumbers) {
    setTimeout(() => {
      updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
    }, 60);
  }
}
window.applyLayoutMode = applyLayoutMode;

// Switch Active View Panel (Seamless switching across all tabs)
function switchView(targetId) {
  elements.navButtons.forEach(btn => {
    if (btn.getAttribute('data-target') === targetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  elements.viewPanels.forEach(panel => {
    if (panel.id === targetId) {
      panel.classList.add('active');
      panel.style.display = 'flex';
    } else {
      panel.classList.remove('active');
      panel.style.display = 'none';
    }
  });

  if (elements.layoutPresetSwitcher) {
    elements.layoutPresetSwitcher.classList.toggle('hidden', targetId !== 'view-learn');
  }

  if (targetId === 'view-admin') {
    if (!currentUserIsAdmin) {
      showToast('🔒 Admin access required.', 'error');
      return;
    }
    loadAdminDashboard();
  }

  if (targetId === 'view-learn') {
    applyLayoutMode(state.layoutMode);
    updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
  } else if (targetId === 'view-achievements') {
    renderAchievements();
  } else if (targetId === 'view-challenges') {
    renderChallengesCatalog();
  }
}
window.switchView = switchView; // expose to inline onclick attributes

// Editor & Terminal Font Zoom Controller
function applyFontSize(sizePx) {
  sizePx = Math.max(12, Math.min(22, sizePx));
  state.fontSize = sizePx;
  localStorage.setItem('pylearn_font_size', String(sizePx));
  document.documentElement.style.setProperty('--editor-font-size', `${sizePx}px`);
  document.documentElement.style.setProperty('--term-font-size', `${sizePx}px`);
  document.documentElement.style.setProperty('--editor-line-height', `${Math.round(sizePx * 1.62)}px`);
}
window.applyFontSize = applyFontSize;

// High-Speed Python Syntax Tokenizer
function highlightPython(code) {
  if (!code) return '';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  const tokenRegex = /(f?b?r?"""[\s\S]*?"""|f?b?r?'''[\s\S]*?'''|f?b?r?"(?:\\.|[^"\\])*"|f?b?r?'(?:\\.|[^'\\])*')|(#.*)|(\b\d+(?:\.\d+)?\b)|(\bdef\s+)([A-Za-z_]\w*)|([A-Za-z_]\w*)|([+\-*/%=<>!&|^~:]+)/g;

  const KEYWORDS = new Set([
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def',
    'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if',
    'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise',
    'return', 'try', 'while', 'with', 'yield'
  ]);

  const BUILTINS = new Set([
    'print', 'input', 'len', 'range', 'int', 'str', 'float', 'bool', 'list', 'dict',
    'set', 'tuple', 'sum', 'min', 'max', 'abs', 'round', 'enumerate', 'zip',
    'sorted', 'reversed', 'open', 'type', 'isinstance', 'issubclass', 'id',
    'map', 'filter', 'any', 'all', 'format', 'repr', 'super', 'dir', 'help'
  ]);

  const CONSTANTS = new Set(['True', 'False', 'None']);

  let lastIndex = 0;
  let html = '';
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      html += esc(code.slice(lastIndex, match.index));
    }
    lastIndex = tokenRegex.lastIndex;

    const [full, str, comment, num, defPrefix, funcName, word, op] = match;

    if (str !== undefined) {
      html += `<span class="tok-string">${esc(str)}</span>`;
    } else if (comment !== undefined) {
      html += `<span class="tok-comment">${esc(comment)}</span>`;
    } else if (num !== undefined) {
      html += `<span class="tok-number">${esc(num)}</span>`;
    } else if (defPrefix !== undefined && funcName !== undefined) {
      html += `<span class="tok-keyword">${esc(defPrefix)}</span><span class="tok-funcname">${esc(funcName)}</span>`;
    } else if (word !== undefined) {
      if (KEYWORDS.has(word)) {
        html += `<span class="tok-keyword">${esc(word)}</span>`;
      } else if (BUILTINS.has(word)) {
        html += `<span class="tok-builtin">${esc(word)}</span>`;
      } else if (CONSTANTS.has(word)) {
        html += `<span class="tok-constant">${esc(word)}</span>`;
      } else {
        html += `<span class="tok-variable">${esc(word)}</span>`;
      }
    } else if (op !== undefined) {
      html += `<span class="tok-operator">${esc(op)}</span>`;
    } else {
      html += esc(full);
    }
  }

  if (lastIndex < code.length) {
    html += esc(code.slice(lastIndex));
  }

  if (code.endsWith('\n')) {
    html += ' ';
  }

  return html;
}

function updateSyntaxLayer(textarea, syntaxLayer) {
  if (!syntaxLayer || !textarea) return;
  const codeEl = syntaxLayer.querySelector('code') || syntaxLayer;
  codeEl.innerHTML = highlightPython(textarea.value);
  syntaxLayer.scrollTop = textarea.scrollTop;
  syntaxLayer.scrollLeft = textarea.scrollLeft;
}

// Code Editor Helpers: Auto-closing pairs, indent, and synced syntax highlighting
function setupEditorHelpers(textarea, lineNumbersEl, syntaxLayer) {
  const syncLines = () => updateLineNumbers(textarea, lineNumbersEl);
  const syncSyntax = () => updateSyntaxLayer(textarea, syntaxLayer);
  const notifyChange = () => {
    syncLines();
    syncSyntax();
    textarea.dispatchEvent(new Event('input'));
  };

  textarea.addEventListener('input', () => {
    syncLines();
    syncSyntax();
    if (textarea === elements.codeEditor && state.currentLessonId) {
      state.userCodes[state.currentLessonId] = textarea.value;
      localStorage.setItem('pylearn_user_codes', JSON.stringify(state.userCodes));
    } else if (textarea === elements.pgEditor) {
      localStorage.setItem('pylearn_playground_code', textarea.value);
    }
  });

  textarea.addEventListener('scroll', () => {
    lineNumbersEl.scrollTop = textarea.scrollTop;
    if (syntaxLayer) {
      syntaxLayer.scrollTop = textarea.scrollTop;
      syntaxLayer.scrollLeft = textarea.scrollLeft;
    }
  });

  textarea.addEventListener('keydown', (e) => {
    // Ctrl+Enter / Cmd+Enter runs code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (textarea === elements.codeEditor) {
        handleRunCode();
      } else {
        handlePlaygroundRun();
      }
      return;
    }

    const PAIRS = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'"
    };
    const CLOSERS = new Set([')', ']', '}', '"', "'"]);

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;

    // 1. Skip over closing bracket/quote if already typed
    if (CLOSERS.has(e.key) && start === end && val[start] === e.key) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      return;
    }

    // 2. Auto-close opening pair or wrap selection
    if (PAIRS[e.key]) {
      const closer = PAIRS[e.key];
      if (start !== end) {
        // Wrap selected text
        e.preventDefault();
        const selected = val.substring(start, end);
        textarea.value = val.substring(0, start) + e.key + selected + closer + val.substring(end);
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        notifyChange();
        return;
      } else {
        // Avoid auto-closing quote if right before alphanumeric word char
        const nextChar = val[start] || '';
        const isQuote = (e.key === '"' || e.key === "'");
        if (!isQuote || !/\w/.test(nextChar)) {
          e.preventDefault();
          textarea.value = val.substring(0, start) + e.key + closer + val.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 1;
          notifyChange();
          return;
        }
      }
    }

    // 3. Smart Backspace: deletes both if inside () [] {} "" ''
    if (e.key === 'Backspace' && start === end && start > 0) {
      const prev = val[start - 1];
      const next = val[start];
      if (PAIRS[prev] && PAIRS[prev] === next) {
        e.preventDefault();
        textarea.value = val.substring(0, start - 1) + val.substring(start + 1);
        textarea.selectionStart = textarea.selectionEnd = start - 1;
        notifyChange();
        return;
      }
    }

    // 4. Tab indentation (4 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      textarea.value = val.substring(0, start) + '    ' + val.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      notifyChange();
      return;
    }

    // 5. Auto-indent on Enter with smart brace expansion
    if (e.key === 'Enter') {
      const pos = start;
      const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
      const currentLine = val.substring(lineStart, pos);
      const match = currentLine.match(/^(\s+)/);
      let indent = match ? match[1] : '';

      // If line ends with ':', add 4 spaces
      if (currentLine.trim().endsWith(':')) {
        indent += '    ';
      }

      // Smart brace expansion e.g. { | }
      const prevChar = val[pos - 1];
      const nextChar = val[pos];
      if (prevChar && PAIRS[prevChar] && PAIRS[prevChar] === nextChar) {
        e.preventDefault();
        const insertText = '\n' + indent + '    \n' + indent;
        textarea.value = val.substring(0, pos) + insertText + val.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = pos + indent.length + 5;
        notifyChange();
        return;
      }

      if (indent.length > 0) {
        e.preventDefault();
        const insertText = '\n' + indent;
        textarea.value = val.substring(0, pos) + insertText + val.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = pos + insertText.length;
        notifyChange();
        return;
      }
    }
  });

  syncLines();
  syncSyntax();
}

function updateLineNumbers(textarea, lineNumbersEl) {
  const lines = textarea.value.split('\n').length;
  lineNumbersEl.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

// Render Sidebar Curriculum Accordion
function renderCurriculumTree() {
  elements.moduleListContainer.innerHTML = '';
  let totalLessons = 0;
  let completedCount = 0;

  state.modules.forEach((mod, modIdx) => {
    const group = document.createElement('div');
    group.className = `module-group ${modIdx === 0 ? 'open' : ''}`;
    group.id = `mod-group-${mod.id}`;

    const header = document.createElement('div');
    header.className = 'module-header';
    header.innerHTML = `
      <span>${mod.icon || '📌'} ${mod.title}</span>
      <span class="arrow">▶</span>
    `;
    header.addEventListener('click', () => {
      group.classList.toggle('open');
    });

    const sublist = document.createElement('ul');
    sublist.className = 'lesson-sublist';

    mod.lessons.forEach(lesson => {
      totalLessons++;
      const isCompleted = state.completedLessons.includes(lesson.id);
      if (isCompleted) completedCount++;

      const item = document.createElement('li');
      item.className = `lesson-item ${lesson.id === state.currentLessonId ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      item.id = `nav-lesson-${lesson.id}`;
      item.innerHTML = `
        <span>${lesson.title}</span>
        <span class="status-icon">${isCompleted ? '✓' : '○'}</span>
      `;
      item.addEventListener('click', () => {
        selectLesson(lesson.id);
      });
      sublist.appendChild(item);
    });

    group.appendChild(header);
    group.appendChild(sublist);
    elements.moduleListContainer.appendChild(group);
  });

  // Update overall progress bar
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  elements.overallProgressBar.style.width = `${pct}%`;
  elements.overallProgressText.textContent = `${pct}% Complete`;
}

// Select and Display a Specific Lesson
function selectLesson(lessonId) {
  let targetLesson = null;
  let parentMod = null;

  for (const mod of state.modules) {
    for (const l of mod.lessons) {
      if (l.id === lessonId) {
        targetLesson = l;
        parentMod = mod;
        break;
      }
    }
    if (targetLesson) break;
  }

  // Fallback to first lesson if saved ID was not found
  if (!targetLesson && state.modules.length > 0 && state.modules[0].lessons.length > 0) {
    targetLesson = state.modules[0].lessons[0];
    parentMod = state.modules[0];
    lessonId = targetLesson.id;
  }

  if (!targetLesson) return;

  state.currentLessonId = lessonId;
  localStorage.setItem('pylearn_current_lesson', lessonId);

  // Update sidebar active classes
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById(`nav-lesson-${lessonId}`);
  if (activeNav) {
    activeNav.classList.add('active');
    const parentGroup = document.getElementById(`mod-group-${parentMod.id}`);
    if (parentGroup) parentGroup.classList.add('open');
  }

  // Populate Header & Badges
  elements.lessonTitle.textContent = targetLesson.title;
  elements.lessonDifficulty.textContent = targetLesson.difficulty || 'Beginner';
  elements.lessonXpBadge.textContent = `+${targetLesson.xp || 50} XP`;
  elements.lessonCompletedTag.style.display = state.completedLessons.includes(lessonId) ? 'inline' : 'none';

  // Render Lesson Content with Educational Takeaway
  const conceptGuide = CONCEPT_GUIDES[targetLesson.title] || [
    targetLesson.summary || 'This lesson teaches one useful Python idea.',
    'Use this idea when you need to solve a similar real-world coding problem.',
    'Run the example, then change one small part and watch what happens.'
  ];
  const conceptGuideHtml = `
    <section class="concept-guide-card" aria-label="Simple explanation">
      <div class="concept-guide-title">🧭 Understand it simply</div>
      <div class="concept-guide-grid">
        <div><strong>What is it?</strong><p>${formatConceptText(conceptGuide[0])}</p></div>
        <div><strong>Where is it used?</strong><p>${formatConceptText(conceptGuide[1])}</p></div>
        <div><strong>How do I use it?</strong><p>${formatConceptText(conceptGuide[2])}</p></div>
      </div>
    </section>`;
  const takeawayHtml = `
    <div class="beginner-guide-card">
      <div class="takeaway-header">
        <span class="takeaway-icon">🪜</span>
        <span class="takeaway-title">Beginner way to learn this</span>
      </div>
      <ol class="beginner-guide-steps">
        <li>Read the example slowly from top to bottom.</li>
        <li>Press <strong>▶ Try in Editor</strong>, then press <strong>▶ Run</strong>.</li>
        <li>Change just one word or number and run it again. Learning by trying is enough.</li>
      </ol>
    </div>
    <div class="educational-takeaway-card">
      <div class="takeaway-header">
        <span class="takeaway-icon">💡</span>
        <span class="takeaway-title">Interactive Practice Tip</span>
      </div>
      <p class="takeaway-body">
        Experiment with the code examples! Click any <strong>▶ Try in Editor</strong> button above to load that snippet into your workspace, or modify the code and press <strong>▶ Run</strong> to see how Python responds.
      </p>
    </div>
  `;
  elements.lessonBody.innerHTML = conceptGuideHtml + parseMarkdownToHtml(targetLesson.content) + takeawayHtml;

  // Populate Quiz
  renderQuiz(targetLesson.quiz);

  // Populate Challenge Banner
  if (targetLesson.challenge) {
    elements.challengeInstructionsText.innerHTML = `${escapeHTML(targetLesson.challenge.instructions).replace(/\n/g, '<br>')}${buildChallengeWalkthrough(targetLesson.challenge)}`;
    elements.hintText.innerHTML = targetLesson.challenge.hints?.join('<br><br>') || 'No hints available.';
    elements.hintBox.classList.remove('show');
  }

  // Populate Editor with saved user code or starter code
  const codeToLoad = state.userCodes[lessonId] !== undefined ? state.userCodes[lessonId] : (targetLesson.starter_code || '');
  elements.codeEditor.value = codeToLoad;
  updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
  updateSyntaxLayer(elements.codeEditor, elements.editorSyntaxLayer);

  // Reset console
  elements.stdoutContent.textContent = "Press 'Run' or hit Ctrl+Enter to execute your Python code...";
  elements.stderrContent.textContent = '';
  elements.stderrContent.style.display = 'none';
  if (elements.inputNeededBanner) elements.inputNeededBanner.style.display = 'none';
  if (elements.termInteractiveInput) elements.termInteractiveInput.value = '';
  elements.testResultsContainer.innerHTML = '<p style="color: var(--text-muted);">Click "Check Solution" to run automated tests against your code.</p>';
  elements.testSummaryPill.textContent = '0/0';
  setTerminalStatus('ready', 'Ready');

  // Scroll to top of lesson content
  document.getElementById('lesson-content-area').scrollTop = 0;
}

// Global function to insert lesson snippet into workspace editor
window.insertCodeIntoEditor = function(btn) {
  const wrapper = btn.closest('.code-block-wrapper');
  if (!wrapper) return;
  const codeEl = wrapper.querySelector('code');
  if (!codeEl) return;
  const rawCode = codeEl.textContent.trim();
  elements.codeEditor.value = rawCode;
  updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
  updateSyntaxLayer(elements.codeEditor, elements.editorSyntaxLayer);
  if (elements.codeEditor) elements.codeEditor.dispatchEvent(new Event('input'));
  showToast('🚀 Example loaded into editor! Hit "Run" (Ctrl+Enter) to test.', 'success');
  setTerminalStatus('ready', 'Example Loaded');
};

// Markdown to HTML Parser with Interactive Try in Editor Code Blocks
function parseMarkdownToHtml(md) {
  if (!md) return '';
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/```python([\s\S]*?)```/g, (match, code) => {
      const cleanCode = code.trim();
      return `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-lang-label">🐍 Python Example</span>
          <button class="try-code-btn" onclick="insertCodeIntoEditor(this)">▶ Try in Editor</button>
        </div>
        <pre><code class="python-code">${escapeHTML(cleanCode)}</code></pre>
        <div class="example-explainer">
          <strong>Understand this example:</strong>
          <span>1. Python starts at the first line, then runs each line below it.</span>
          <span>2. Click <em>Try in Editor</em> and press <em>Run</em> to see what the code does.</span>
          <span>3. Change one value, such as a name or number, then run it again to learn by doing.</span>
        </div>
      </div>`;
    })
    .replace(/```([\s\S]*?)```/g, (match, code) => {
      const cleanCode = code.trim();
      return `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-lang-label">Code</span>
          <button class="try-code-btn" onclick="insertCodeIntoEditor(this)">▶ Try in Editor</button>
        </div>
        <pre><code>${escapeHTML(cleanCode)}</code></pre>
        <div class="example-explainer">
          <strong>Understand this example:</strong>
          <span>1. Read the code from the first line to the last line.</span>
          <span>2. Run it once and look carefully at the result.</span>
          <span>3. Change one small part and run it again — this is the best way to learn.</span>
        </div>
      </div>`;
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
    .replace(/\n\n+/g, '</p><p>');

  return `<p>${html}</p>`;
}

// Render Interactive Quick Quiz
function renderQuiz(quiz) {
  if (!quiz) {
    elements.quizQuestionText.textContent = 'No quiz for this lesson.';
    elements.quizOptionsList.innerHTML = '';
    elements.quizFeedbackBox.className = 'quiz-feedback';
    elements.quizFeedbackBox.textContent = '';
    return;
  }

  elements.quizQuestionText.textContent = quiz.question;
  elements.quizOptionsList.innerHTML = '';
  elements.quizFeedbackBox.className = 'quiz-feedback';
  elements.quizFeedbackBox.textContent = '';

  const isAlreadySolved = state.completedQuizzes.includes(state.currentLessonId);

  quiz.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `<span style="opacity: 0.6;">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;

    if (isAlreadySolved) {
      if (idx === quiz.correct_index) {
        btn.classList.add('correct');
      }
    }

    btn.addEventListener('click', () => {
      if (btn.disabled) return;

      if (idx === quiz.correct_index) {
        btn.classList.add('correct');
        elements.quizFeedbackBox.className = 'quiz-feedback show success';
        elements.quizFeedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${quiz.explanation || ''}`;

        if (!state.completedQuizzes.includes(state.currentLessonId)) {
          state.completedQuizzes.push(state.currentLessonId);
          localStorage.setItem('pylearn_completed_quizzes', JSON.stringify(state.completedQuizzes));
          addXP(25);
          showToast('+25 XP for mastering the quiz!', 'success');
          checkBadgeUnlock('first_quiz');
          checkAllProgress();
        }
      } else {
        btn.classList.add('wrong');
        elements.quizFeedbackBox.className = 'quiz-feedback show error';
        elements.quizFeedbackBox.innerHTML = `<strong>✗ Not quite.</strong> Try again! ${quiz.explanation || ''}`;
      }
    });

    elements.quizOptionsList.appendChild(btn);
  });
}

// Handle Code Execution (Run Button)
function recordCodeCompletion() {
  const lesson = getCurrentLesson();
  if (!lesson) return;

  let newlyCompleted = false;
  let newlyCompletedChallenge = false;
  if (!state.completedLessons.includes(lesson.id)) {
    state.completedLessons.push(lesson.id);
    localStorage.setItem('pylearn_completed_lessons', JSON.stringify(state.completedLessons));
    newlyCompleted = true;
  }
  // Every lesson has a hands-on challenge. A successful program is enough to
  // complete it, so learners can progress by experimenting with the code.
  if (lesson.challenge && !state.completedChallenges.includes(lesson.id)) {
    state.completedChallenges.push(lesson.id);
    localStorage.setItem('pylearn_completed_challenges', JSON.stringify(state.completedChallenges));
    newlyCompleted = true;
    newlyCompletedChallenge = true;
  }

  if (!newlyCompleted) {
    syncCurrentUserProgress();
    return;
  }

  addXP(lesson.xp || 60);
  updateDailyStreak();
  if (newlyCompletedChallenge) checkBadgeUnlock('first_challenge');
  renderCurriculumTree();
  renderChallengesCatalog();
  renderAchievements();
  elements.lessonCompletedTag.style.display = 'inline';
  checkAllProgress();
  syncCurrentUserProgress();
  showToast(`✓ Lesson completed! +${lesson.xp || 60} XP earned.`, 'success');
}

function setTerminalStatus(type, label) {
  if (!elements.termStatus) return;
  elements.termStatus.className = `term-status-pill ${type}`;
  let labelEl = elements.termStatus.querySelector('.status-label');
  if (!labelEl) {
    elements.termStatus.innerHTML = `<span class="status-dot"></span><span class="status-label">${escapeHTML(label)}</span>`;
  } else {
    labelEl.textContent = label;
  }
}

function setPgTerminalStatus(type, label) {
  if (!elements.pgTermStatus) return;
  elements.pgTermStatus.className = `term-status-pill ${type}`;
  if (elements.pgDurationMeta) elements.pgDurationMeta.textContent = label;
}

async function copyToClipboard(text, btn) {
  if (!text) {
    showToast('Nothing to copy.', 'error');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span>✓ Copied!</span>';
    setTimeout(() => { btn.innerHTML = originalHtml; }, 1600);
    showToast('Copied to clipboard!', 'success');
  } catch (err) {
    showToast('Could not copy to clipboard.', 'error');
  }
}

// Switch Terminal Sub-tab (Learn)
function switchTermTab(tabName) {
  if (elements.termTabs) {
    elements.termTabs.forEach(t => {
      if (t.getAttribute('data-term-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  if (elements.stdoutView) elements.stdoutView.style.display = tabName === 'stdout' ? 'flex' : 'none';
  if (elements.stdinView) elements.stdinView.style.display = tabName === 'stdin' ? 'flex' : 'none';
  if (elements.testsView) elements.testsView.style.display = tabName === 'tests' ? 'block' : 'none';
}

// Switch Terminal Sub-tab (Playground)
function switchPgTab(tabName) {
  if (elements.pgTermTabs) {
    elements.pgTermTabs.forEach(t => {
      if (t.getAttribute('data-pg-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  if (elements.pgStdoutView) elements.pgStdoutView.style.display = tabName === 'stdout' ? 'flex' : 'none';
  if (elements.pgStdinView) elements.pgStdinView.style.display = tabName === 'stdin' ? 'flex' : 'none';
}

// Execution concurrency guards
let isExecutingLearn = false;
let isExecutingPg = false;
let isExecutingTest = false;

async function handleRunCode(customInput = null) {
  if (isExecutingLearn) return;
  isExecutingLearn = true;

  const code = elements.codeEditor.value;
  setTerminalStatus('running', 'Running...');
  elements.runCodeBtn.disabled = true;

  switchTermTab('stdout');

  let stdinInput = '';
  if (customInput !== null && customInput !== undefined) {
    stdinInput = String(customInput);
  } else if (elements.stdinContent && elements.stdinContent.value.trim()) {
    stdinInput = elements.stdinContent.value;
  }

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, input: stdinInput })
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      const responseText = await res.text();
      throw new Error(`Code runner unavailable (${res.status}): ${responseText.replace(/\s+/g, ' ').slice(0, 100)}`);
    }
    const data = await res.json();
    elements.stdoutContent.textContent = data.stdout || (data.exit_code === 0 ? '[Script finished with no output]' : '');
    
    if (data.needs_input) {
      elements.stderrContent.textContent = '';
      elements.stderrContent.style.display = 'none';
      if (elements.inputNeededBanner) elements.inputNeededBanner.style.display = 'flex';
      setTerminalStatus('needs-input', 'Input Needed');
      if (elements.termInteractiveInput) {
        elements.termInteractiveInput.focus();
        elements.termInteractiveInput.placeholder = 'Program waiting for input... Type here and press Enter';
      }
    } else {
      if (elements.inputNeededBanner) elements.inputNeededBanner.style.display = 'none';
      if (data.stderr) {
        elements.stderrContent.textContent = data.stderr;
        elements.stderrContent.style.display = 'block';
      } else {
        elements.stderrContent.textContent = '';
        elements.stderrContent.style.display = 'none';
      }

      if (data.exit_code === 0) {
        setTerminalStatus('ready', `✓ ${data.duration_ms}ms`);
      } else {
        setTerminalStatus('error', `Exit ${data.exit_code}`);
      }
    }

    if (elements.learnTerminalScreen) {
      elements.learnTerminalScreen.scrollTop = elements.learnTerminalScreen.scrollHeight;
    }

    checkBadgeUnlock('first_run');
    if (data.exit_code === 0 && code.trim()) {
      recordCodeCompletion();
    }
  } catch (err) {
    elements.stderrContent.textContent = `Server Connection Error: ${err.message}`;
    elements.stderrContent.style.display = 'block';
    setTerminalStatus('error', 'Failed');
  } finally {
    isExecutingLearn = false;
    elements.runCodeBtn.disabled = false;
  }
}

// Handle Challenge Solution Testing (Check Solution Button)
async function handleTestCode() {
  if (isExecutingTest) return;
  isExecutingTest = true;

  const code = elements.codeEditor.value;
  setTerminalStatus('running', 'Testing Solution...');
  elements.testCodeBtn.disabled = true;

  switchTermTab('tests');

  const stdinInput = elements.stdinContent ? elements.stdinContent.value : '';

  try {
    const res = await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        input: stdinInput,
        lesson_id: state.currentLessonId
      })
    });

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      const responseText = await res.text();
      throw new Error(`Challenge service unavailable (${res.status}): ${responseText.replace(/\s+/g, ' ').slice(0, 100)}`);
    }
    const data = await res.json();
    renderTestResults(data);

    if (data.all_passed) {
      fireConfetti();
      checkBadgeUnlock('first_challenge');
      const alreadyComplete = state.completedChallenges.includes(state.currentLessonId);
      recordCodeCompletion();
      if (alreadyComplete) showToast(`✓ Your program runs successfully!`, 'success');
      setTerminalStatus('ready', 'All Tests Passed');
    } else {
      showToast('Your code needs to run without errors. Check the message below and try again.', 'error');
      setTerminalStatus('error', 'Test Failed');
    }
  } catch (err) {
    elements.testResultsContainer.innerHTML = `<p style="color: var(--accent-red);">Testing Error: ${err.message}</p>`;
    setTerminalStatus('error', 'Test Error');
  } finally {
    isExecutingTest = false;
    elements.testCodeBtn.disabled = false;
  }
}

// Render Challenge Test Results
function renderTestResults(data) {
  const results = data.results || [];
  elements.testResultsContainer.innerHTML = '';
  
  const passedCount = results.filter(r => r.passed).length;
  elements.testSummaryPill.textContent = `${passedCount}/${results.length}`;

  results.forEach((r, idx) => {
    const card = document.createElement('div');
    card.className = `test-result-card ${r.passed ? 'passed' : 'failed'}`;

    card.innerHTML = `
      <div class="test-header ${r.passed ? 'passed' : 'failed'}">
        <span>${r.passed ? '✓' : '✗'} Test Case ${idx + 1}: ${r.name}</span>
        <span>${r.duration_ms || 0}ms</span>
      </div>
      ${!r.passed ? `
        <div class="test-diff">
          <div>
            <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">EXPECTED:</div>
            <pre style="color: var(--accent-green); white-space: pre-wrap;">${r.expected || '[Empty]'}</pre>
          </div>
          <div>
            <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">YOUR OUTPUT:</div>
            <pre style="color: var(--accent-red); white-space: pre-wrap;">${r.actual || r.error || '[No Output]'}</pre>
          </div>
        </div>
      ` : ''}
    `;

    elements.testResultsContainer.appendChild(card);
  });
}

// Reset Editor to Starter Code
function handleResetCode() {
  const lesson = getCurrentLesson();
  if (lesson && confirm('Reset code to the original starter code? Any unsaved edits will be discarded.')) {
    elements.codeEditor.value = lesson.starter_code || '';
    updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
    updateSyntaxLayer(elements.codeEditor, elements.editorSyntaxLayer);
    state.userCodes[state.currentLessonId] = lesson.starter_code || '';
    localStorage.setItem('pylearn_user_codes', JSON.stringify(state.userCodes));
    showToast('Code reset to starter template.', 'success');
  }
}

// Handle Playground Code Execution
async function handlePlaygroundRun(customInput = null) {
  if (isExecutingPg) return;
  isExecutingPg = true;

  const code = elements.pgEditor.value;
  elements.pgRunBtn.disabled = true;
  setPgTerminalStatus('running', 'Running...');

  switchPgTab('stdout');

  let stdinInput = '';
  if (customInput !== null && customInput !== undefined) {
    stdinInput = String(customInput);
  } else if (elements.pgStdinContent && elements.pgStdinContent.value.trim()) {
    stdinInput = elements.pgStdinContent.value;
  }

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, input: stdinInput })
    });

    const data = await res.json();
    elements.pgStdout.textContent = data.stdout || (data.exit_code === 0 ? '[Script finished with no output]' : '');
    
    if (data.needs_input) {
      elements.pgStderr.textContent = '';
      elements.pgStderr.style.display = 'none';
      if (elements.pgInputNeededBanner) elements.pgInputNeededBanner.style.display = 'flex';
      setPgTerminalStatus('needs-input', 'Input Needed');
      if (elements.pgInteractiveInput) {
        elements.pgInteractiveInput.focus();
        elements.pgInteractiveInput.placeholder = 'Sandbox waiting for input... Type here and press Enter';
      }
    } else {
      if (elements.pgInputNeededBanner) elements.pgInputNeededBanner.style.display = 'none';
      if (data.stderr) {
        elements.pgStderr.textContent = data.stderr;
        elements.pgStderr.style.display = 'block';
      } else {
        elements.pgStderr.textContent = '';
        elements.pgStderr.style.display = 'none';
      }

      if (data.exit_code === 0) {
        setPgTerminalStatus('ready', `✓ ${data.duration_ms}ms`);
      } else {
        setPgTerminalStatus('error', `Exit ${data.exit_code}`);
      }
    }

    if (elements.pgTerminalScreen) {
      elements.pgTerminalScreen.scrollTop = elements.pgTerminalScreen.scrollHeight;
    }

    checkBadgeUnlock('first_run');
  } catch (err) {
    elements.pgStderr.textContent = `Execution Error: ${err.message}`;
    elements.pgStderr.style.display = 'block';
    setPgTerminalStatus('error', 'Error');
  } finally {
    isExecutingPg = false;
    elements.pgRunBtn.disabled = false;
  }
}

// Render Challenges Catalog Tab
let activeChallengeFilter = 'all';
let challengeSearchQuery = '';

function renderChallengesCatalog() {
  if (!elements.challengesCatalogGrid) return;
  elements.challengesCatalogGrid.innerHTML = '';

  const allChallenges = [];
  state.modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      if (lesson.challenge) {
        allChallenges.push({ mod, lesson });
      }
    });
  });

  const totalChallenges = allChallenges.length;
  const solvedCount = state.completedChallenges.length;
  const earnedXP = allChallenges
    .filter(({ lesson }) => state.completedChallenges.includes(lesson.id))
    .reduce((sum, { lesson }) => sum + (lesson.xp || 60), 0);
  const progressPct = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

  // Update header stats
  const solvedStatEl = document.getElementById('challenges-solved-stat');
  const totalXpEl = document.getElementById('ch-total-xp');
  const progressPctEl = document.getElementById('ch-progress-pct');

  if (solvedStatEl) solvedStatEl.textContent = `${solvedCount} / ${totalChallenges} Solved`;
  if (totalXpEl) totalXpEl.textContent = `${earnedXP} XP`;
  if (progressPctEl) progressPctEl.textContent = `${progressPct}%`;

  // Wire filter buttons
  const filtersNav = document.getElementById('challenge-filters-nav');
  if (filtersNav && !filtersNav.dataset.wired) {
    filtersNav.dataset.wired = 'true';
    filtersNav.querySelectorAll('.ch-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersNav.querySelectorAll('.ch-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeChallengeFilter = btn.dataset.filter || 'all';
        renderChallengesCatalog();
      });
    });
  }

  // Wire search input
  const searchInput = document.getElementById('challenges-search-input');
  if (searchInput && !searchInput.dataset.wired) {
    searchInput.dataset.wired = 'true';
    searchInput.addEventListener('input', (e) => {
      challengeSearchQuery = e.target.value.trim().toLowerCase();
      renderChallengesCatalog();
    });
  }

  // Filter challenges
  const filtered = allChallenges.filter(({ mod, lesson }) => {
    const isPassed = state.completedChallenges.includes(lesson.id);
    const difficulty = (lesson.difficulty || 'Beginner').toLowerCase();

    // Filter type
    if (activeChallengeFilter === 'pending' && isPassed) return false;
    if (activeChallengeFilter === 'solved' && !isPassed) return false;
    if (['beginner', 'intermediate', 'advanced'].includes(activeChallengeFilter.toLowerCase())) {
      if (difficulty !== activeChallengeFilter.toLowerCase()) return false;
    }

    // Text search
    if (challengeSearchQuery) {
      const match = lesson.title.toLowerCase().includes(challengeSearchQuery) ||
                    (lesson.summary && lesson.summary.toLowerCase().includes(challengeSearchQuery)) ||
                    mod.title.toLowerCase().includes(challengeSearchQuery);
      if (!match) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    elements.challengesCatalogGrid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">No challenges match your filter</p>
        <p style="color: var(--text-secondary); font-size: 0.85rem;">Try selecting "All Challenges" or clearing your search query.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(({ mod, lesson }) => {
    const isPassed = state.completedChallenges.includes(lesson.id);
    const card = document.createElement('div');
    card.className = `challenge-item-card ${isPassed ? 'solved-card' : ''}`;

    card.innerHTML = `
      <div class="challenge-card-top">
        <span class="challenge-module-tag">${escapeHTML(mod.title.split(':')[0])}</span>
        <div class="challenge-card-badges">
          <span class="badge ${lesson.difficulty ? lesson.difficulty.toLowerCase() : 'beginner'}">${escapeHTML(lesson.difficulty || 'Beginner')}</span>
          ${isPassed ? '<span class="badge xp-badge">✓ Solved</span>' : ''}
        </div>
      </div>
      <h3 class="challenge-card-title">${escapeHTML(lesson.title)}</h3>
      <p class="challenge-card-desc">${escapeHTML(lesson.summary || 'Solve practical programming task with automated verification.')}</p>
      <div class="challenge-card-footer">
        <span class="challenge-xp-reward">⚡ +${lesson.xp || 60} XP</span>
        <button type="button" class="btn ${isPassed ? 'btn-secondary' : 'btn-run'} challenge-action-btn">${isPassed ? 'Review Solution' : 'Solve Challenge 🚀'}</button>
      </div>
    `;

    card.querySelector('.challenge-action-btn').addEventListener('click', () => {
      switchView('view-learn');
      selectLesson(lesson.id);
    });

    elements.challengesCatalogGrid.appendChild(card);
  });
}

// Render Cheat Sheet Tab
let activeCheatsheetCategory = 'All';
const CHEATSHEET_USE_CASES = {
  'Variables & Types': 'saving a user name, score, price, or yes/no answer', 'Type Casting': 'turning typed input into a number before doing maths', 'Comments & Docstrings': 'explaining your code to yourself or another developer',
  'Arithmetic': 'calculating totals, marks, prices, and measurements', 'Comparison & Logic': 'checking grades, passwords, permissions, and rules', 'If - Elif - Else': 'making decisions such as pass/fail or discount/no discount', 'Conditional Expression': 'making one small choice in a single line',
  'For Loop & Range': 'repeating work for every item or a fixed number of times', 'While Loop': 'repeating until an answer or condition becomes correct', 'Break, Continue & Pass': 'controlling a loop when you need to stop, skip, or leave space for later',
  'Lists': 'keeping ordered names, tasks, scores, products, or numbers', 'Dictionaries': 'storing labelled details such as a student name and age', 'Sets': 'removing duplicates or finding values shared by two groups', 'List Comprehensions': 'building a short new list from another list', 'Tuples & Unpacking': 'keeping fixed values together, such as coordinates or a min/max result',
  'Function Definition': 'reusing a job such as calculating a total or greeting a user', 'Flexible Args': 'writing functions that can accept different amounts of input', 'Lambda Expressions': 'making a very short one-use calculation', 'Classes & OOP': 'modelling real things like students, products, or game characters',
  'Try - Except - Finally': 'handling incorrect input, missing files, or other errors safely', 'Raising Exceptions': 'stopping invalid data with a clear message', 'Reading Files Safely': 'opening and reading saved text without crashing the program'
};
const CHEATSHEET_LESSON_MATCHES = {
  'Variables & Types': 'Variables & Data Types', 'Type Casting': 'Type Casting & Conversion', 'Arithmetic': 'Arithmetic Operators & Math', 'Comparison & Logic': 'Comparison & Logical Operators',
  'If - Elif - Else': 'If, Elif, and Else', 'Conditional Expression': 'Ternary Operators & Truthiness', 'For Loop & Range': 'For Loops & The range() Function', 'While Loop': 'While Loops & Loop Control',
  'Break, Continue & Pass': 'While Loops & Loop Control', 'Lists': 'Lists & List Operations', 'Dictionaries': 'Dictionaries (Key-Value Pairs)', 'Sets': 'Tuples, Sets, & List Comprehensions',
  'List Comprehensions': 'Tuples, Sets, & List Comprehensions', 'Tuples & Unpacking': 'Tuples, Sets, & List Comprehensions', 'Function Definition': 'Defining Functions & Return Values',
  'Flexible Args': '*args, **kwargs, & Lambdas', 'Lambda Expressions': '*args, **kwargs, & Lambdas', 'Classes & OOP': 'Classes, Objects, and __init__',
  'Try - Except - Finally': 'Try, Except, Else, and Finally', 'Raising Exceptions': 'Try, Except, Else, and Finally', 'Reading Files Safely': 'Try, Except, Else, and Finally'
};
const CHEATSHEET_NEXT_STEPS = {
  'Variables & Types': 'Change the name, number, and True/False value. Print each one and notice that Python remembers them.',
  'Lists': 'Add one new item with `.append()`, then print the list. Try reading a different position such as `[1]`.',
  'Dictionaries': 'Add one more labelled detail such as `"city"`, then print that value using its key.',
  'For Loop & Range': 'Change `range(3)` to `range(5)`. Count how many times the loop runs.',
  'If - Elif - Else': 'Change the score or condition and see which message Python chooses.',
  'Function Definition': 'Call the function with a different name or number and compare the returned result.',
  'Try - Except - Finally': 'Try a valid value first, then an invalid value. Notice that the program keeps running safely.'
};
const CHEATSHEET_EXTRA_EXAMPLES = {
  'Variables & Types': { label: 'Practice: calculate a total', code: 'item_price = 120\nquantity = 3\ntotal = item_price * quantity\nprint("Total:", total)' },
  'Type Casting': { label: 'Practice: turn text input into a number', code: 'age_text = "18"\nage = int(age_text)\nnext_year = age + 1\nprint(next_year)' },
  'Comments & Docstrings': { label: 'Practice: explain a function', code: 'def add_tax(price):\n    """Return a price after adding 5% tax."""\n    return price * 1.05\n\nprint(add_tax(100))' },
  'Arithmetic': { label: 'Practice: split a bill', code: 'bill = 750\npeople = 3\nper_person = bill / people\nprint(per_person)' },
  'Comparison & Logic': { label: 'Practice: check a login rule', code: 'has_password = True\nhas_code = False\ncan_login = has_password and has_code\nprint(can_login)' },
  'If - Elif - Else': { label: 'Practice: choose a delivery fee', code: 'order_total = 650\nif order_total >= 500:\n    print("Free delivery")\nelse:\n    print("Delivery fee applies")' },
  'Conditional Expression': { label: 'Practice: show stock status', code: 'items_left = 2\nstatus = "In stock" if items_left > 0 else "Out of stock"\nprint(status)' },
  'For Loop & Range': { label: 'Practice: add scores one by one', code: 'scores = [65, 72, 90]\nfor score in scores:\n    print("Score:", score)' },
  'While Loop': { label: 'Practice: count down', code: 'count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Go!")' },
  'Break, Continue & Pass': { label: 'Practice: skip a missing score', code: 'scores = [80, None, 92]\nfor score in scores:\n    if score is None:\n        continue\n    print(score)' },
  'Lists': { label: 'Practice: filter and sort numbers', code: 'numbers = [12, -7, 5, -3, 28, 0, -1]\npositive_numbers = [n for n in numbers if n >= 0]\npositive_numbers.sort()\nprint(positive_numbers)' },
  'Dictionaries': { label: 'Practice: update a profile', code: 'profile = {"name": "Asha", "level": 1}\nprofile["level"] = 2\nprofile["city"] = "Hyderabad"\nprint(profile)' },
  'Sets': { label: 'Practice: find missing topics', code: 'all_topics = {"lists", "loops", "functions"}\nfinished = {"lists"}\nremaining = all_topics - finished\nprint(remaining)' },
  'List Comprehensions': { label: 'Practice: make prices with tax', code: 'prices = [100, 200, 300]\nwith_tax = [price * 1.05 for price in prices]\nprint(with_tax)' },
  'Tuples & Unpacking': { label: 'Practice: store a fixed colour', code: 'red, green, blue = (255, 120, 40)\nprint("Red:", red)\nprint("Green:", green)' },
  'Function Definition': { label: 'Practice: reusable discount function', code: 'def final_price(price, discount):\n    return price - discount\n\nprint(final_price(500, 50))' },
  'Flexible Args': { label: 'Practice: add many scores', code: 'def total_score(*scores):\n    return sum(scores)\n\nprint(total_score(10, 20, 30))' },
  'Lambda Expressions': { label: 'Practice: sort names by length', code: 'names = ["Ravi", "An", "Meera"]\nby_length = sorted(names, key=lambda name: len(name))\nprint(by_length)' },
  'Classes & OOP': { label: 'Practice: create a student object', code: 'class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\nstudent = Student("Maya", 92)\nprint(student.name, student.score)' },
  'Try - Except - Finally': { label: 'Practice: divide safely', code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("You cannot divide by zero")\nfinally:\n    print("Finished")' },
  'Raising Exceptions': { label: 'Practice: validate an age', code: 'age = -2\nif age < 0:\n    raise ValueError("Age cannot be negative")' },
  'Reading Files Safely': { label: 'Practice: read a notes file', code: 'try:\n    with open("notes.txt") as file:\n        print(file.read())\nexcept FileNotFoundError:\n    print("Create notes.txt first")' }
};

function getCheatsheetExamples(item) {
  const savedExamples = item.examples || [{ label: 'Example', code: item.code || '' }];
  const extra = CHEATSHEET_EXTRA_EXAMPLES[item.name];
  return extra ? [...savedExamples, extra] : savedExamples;
}

function renderCheatsheet(filter = '') {
  elements.cheatsheetGrid.innerHTML = '';
  const normalizedFilter = filter.trim().toLowerCase();
  const categories = state.cheatsheet || [];

  if (elements.cheatsheetNav) {
    const totalAllCount = categories.reduce((sum, c) => sum + (c.items?.length || 0), 0);
    elements.cheatsheetNav.innerHTML = [
      { category: 'All', icon: '⚡', count: totalAllCount },
      ...categories.map(c => ({ category: c.category, icon: c.icon || '📌', count: c.items?.length || 0 }))
    ].map(cat =>
      `<button class="sheet-nav-btn ${activeCheatsheetCategory === cat.category ? 'active' : ''}" type="button" data-category="${escapeHTML(cat.category)}">
        <span>${cat.icon}</span>
        <span>${escapeHTML(cat.category)}</span>
        <span class="pill-count">${cat.count}</span>
      </button>`
    ).join('');

    elements.cheatsheetNav.querySelectorAll('.sheet-nav-btn').forEach(button => button.addEventListener('click', () => {
      activeCheatsheetCategory = button.dataset.category;
      renderCheatsheet(elements.cheatsheetSearch?.value || '');
    }));
  }

  let visibleItems = 0;
  let visibleExamples = 0;

  categories.forEach(category => {
    if (activeCheatsheetCategory !== 'All' && activeCheatsheetCategory !== category.category) return;
    const matchingItems = (category.items || []).filter(item => {
      if (!normalizedFilter) return true;
      const examples = getCheatsheetExamples(item);
      return (
        item.name.toLowerCase().includes(normalizedFilter) ||
        (item.desc && item.desc.toLowerCase().includes(normalizedFilter)) ||
        (item.use_case && item.use_case.toLowerCase().includes(normalizedFilter)) ||
        examples.some(example => `${example.label || ''} ${example.code || ''}`.toLowerCase().includes(normalizedFilter))
      );
    });

    if (matchingItems.length === 0) return;
    visibleItems += matchingItems.length;
    visibleExamples += matchingItems.reduce((total, item) => total + getCheatsheetExamples(item).length, 0);

    const catSection = document.createElement('div');
    catSection.className = 'sheet-category-section';

    catSection.innerHTML = `
      <div class="sheet-section-header">
        <div class="sheet-section-header-left">
          <span class="sheet-section-icon">${category.icon || '📌'}</span>
          <div>
            <h3 class="sheet-section-title">${escapeHTML(category.category)}</h3>
            <p class="sheet-section-desc">${escapeHTML(category.desc || '')}</p>
          </div>
        </div>
        <span class="sheet-section-badge">${matchingItems.length} topics</span>
      </div>
      <div class="sheet-cards-grid">
        ${matchingItems.map((item, itemIdx) => {
          const examples = getCheatsheetExamples(item);
          const firstEx = examples[0] || { label: 'Example', code: '' };
          const useCase = item.use_case || CHEATSHEET_USE_CASES[item.name];

          return `
            <div class="sheet-topic-card" data-topic="${escapeHTML(item.name)}">
              <div class="sheet-card-top">
                <h4 class="sheet-topic-name">${escapeHTML(item.name)}</h4>
                <div class="sheet-card-actions">
                  <button class="sheet-action-mini try-sheet-code" type="button" data-code="${encodeURIComponent(firstEx.code || '')}" title="Try in Playground">⚡ Try</button>
                  <button class="sheet-action-mini copy-btn" type="button" data-code="${encodeURIComponent(firstEx.code || '')}" title="Copy code">📋 Copy</button>
                </div>
              </div>
              <p class="sheet-topic-desc">${escapeHTML(item.desc || '')}</p>
              ${useCase ? `
                <div class="sheet-usecase-pill">
                  <strong>Use for:</strong> <span>${escapeHTML(useCase)}</span>
                </div>
              ` : ''}

              ${examples.length > 1 ? `
                <div class="sheet-example-tabs">
                  ${examples.map((ex, exIdx) => `
                    <button type="button" class="sheet-tab-btn ${exIdx === 0 ? 'active' : ''}" data-item-idx="${itemIdx}" data-ex-idx="${exIdx}">${escapeHTML(ex.label || `Ex ${exIdx + 1}`)}</button>
                  `).join('')}
                </div>
              ` : ''}

              <div class="sheet-code-display-wrap">
                ${examples.map((ex, exIdx) => `
                  <div class="sheet-code-panel ${exIdx === 0 ? 'active' : ''}" data-panel-idx="${exIdx}">
                    <div class="sheet-item-code">
                      <button class="copy-btn mini" title="Copy snippet" data-code="${encodeURIComponent(ex.code || '')}">Copy</button>
                      <pre style="margin: 0;"><code>${escapeHTML(ex.code || '')}</code></pre>
                    </div>
                    ${buildCheatsheetExampleGuide(ex.code || '')}
                  </div>
                `).join('')}
              </div>

              <div class="sheet-card-footer">
                ${CHEATSHEET_LESSON_MATCHES[item.name] ? `<button class="sheet-action-link learn-sheet-topic" type="button" data-lesson-title="${escapeHTML(CHEATSHEET_LESSON_MATCHES[item.name])}">📘 Learn with task ↗</button>` : '<span></span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Example tab click listeners to switch code panel & update action buttons
    catSection.querySelectorAll('.sheet-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const card = tabBtn.closest('.sheet-topic-card');
        if (!card) return;
        const exIdx = tabBtn.dataset.exIdx;

        card.querySelectorAll('.sheet-tab-btn').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');

        card.querySelectorAll('.sheet-code-panel').forEach(p => {
          if (p.dataset.panelIdx === exIdx) {
            p.classList.add('active');
            const code = p.querySelector('.copy-btn')?.dataset.code || '';
            const tryBtn = card.querySelector('.sheet-card-actions .try-sheet-code');
            const copyBtn = card.querySelector('.sheet-card-actions .copy-btn');
            if (tryBtn) tryBtn.dataset.code = code;
            if (copyBtn) copyBtn.dataset.code = code;
          } else {
            p.classList.remove('active');
          }
        });
      });
    });

    // Copy buttons
    catSection.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const snippet = decodeURIComponent(btn.dataset.code || '');
        try {
          await navigator.clipboard.writeText(snippet);
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = btn.classList.contains('mini') ? 'Copy' : '📋 Copy'; }, 1500);
          showToast('Code copied to clipboard!', 'success');
        } catch (err) {
          showToast('Code copied', 'info');
        }
      });
    });

    // Try in Playground buttons
    catSection.querySelectorAll('.try-sheet-code').forEach(btn => btn.addEventListener('click', () => {
      elements.pgEditor.value = decodeURIComponent(btn.dataset.code || '');
      updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
      updateSyntaxLayer(elements.pgEditor, elements.pgSyntaxLayer);
      switchView('view-playground');
      showToast('Example opened in Playground — click Run Code to execute!', 'success');
    }));

    // Learn with task links
    catSection.querySelectorAll('.learn-sheet-topic').forEach(btn => btn.addEventListener('click', () => {
      let foundLesson;
      state.modules.some(module => {
        foundLesson = module.lessons.find(lesson => lesson.title === btn.dataset.lessonTitle);
        return Boolean(foundLesson);
      });
      if (foundLesson) { switchView('view-learn'); selectLesson(foundLesson.id); }
    }));

    elements.cheatsheetGrid.appendChild(catSection);
  });

  if (elements.cheatsheetCount) {
    elements.cheatsheetCount.textContent = `${visibleItems} Topics · ${visibleExamples} Snippets`;
  }
  if (visibleItems === 0) {
    elements.cheatsheetGrid.innerHTML = `
      <div class="sheet-empty">
        <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">No matching topics found</p>
        <p>Try searching for "variables", "slicing", "loop", "api", "json", "hash", or "regex".</p>
      </div>
    `;
  }
}

function filterCheatsheet(query) {
  renderCheatsheet(query);
}

// Render Achievements Tab & Certificate
function renderAchievements() {
  let totalLessons = 0;
  let totalChallenges = 0;

  state.modules.forEach(m => {
    m.lessons.forEach(l => {
      totalLessons++;
      if (l.challenge) totalChallenges++;
    });
  });

  elements.achXp.textContent = state.xp;
  elements.achLessons.textContent = `${state.completedLessons.length} / ${totalLessons}`;
  elements.achChallenges.textContent = `${state.completedChallenges.length} / ${totalChallenges}`;
  elements.achQuizzes.textContent = `${state.completedQuizzes.length} / ${totalLessons}`;
  updateCertificateStatus(totalLessons, totalChallenges);

  // Badges
  elements.badgesGrid.innerHTML = '';
  BADGES_DEFINITIONS.forEach(b => {
    const isUnlocked = state.unlockedBadges.includes(b.id);
    const card = document.createElement('div');
    card.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-title">${b.title}</div>
      <div class="badge-desc">${b.desc}</div>
      <span style="font-size: 0.72rem; margin-top: 0.4rem; color: ${isUnlocked ? 'var(--apple-green)' : 'var(--text-muted)'}; font-weight: 700;">
        ${isUnlocked ? 'UNLOCKED' : 'LOCKED'}
      </span>
    `;
    elements.badgesGrid.appendChild(card);
  });
}

// Badge Checking Logic
function checkBadgeUnlock(badgeId) {
  if (state.unlockedBadges.includes(badgeId)) return;

  const badge = BADGES_DEFINITIONS.find(b => b.id === badgeId);
  if (!badge) return;

  state.unlockedBadges.push(badgeId);
  localStorage.setItem('pylearn_badges', JSON.stringify(state.unlockedBadges));
  showToast(`🎖️ Achievement Unlocked: ${badge.title}!`, 'badge-unlock');
  renderAchievements();
  syncCurrentUserProgress();
}

function checkAllProgress() {
  if (state.completedChallenges.length > 0) checkBadgeUnlock('first_challenge');
  if (state.xp >= 200) checkBadgeUnlock('century_xp');

  // Check module completions
  state.modules.forEach(mod => {
    const allDone = mod.lessons.every(l => state.completedLessons.includes(l.id));
    if (allDone) {
      checkBadgeUnlock(mod.id);
    }
  });

  // Check grandmaster
  let totalLessons = 0;
  state.modules.forEach(m => totalLessons += m.lessons.length);
  if (state.completedLessons.length >= totalLessons && totalLessons > 0) {
    checkBadgeUnlock('master_developer');
  }

  updateCertificateStatus();
}

function updateCertificateStatus(lessonTotal, challengeTotal) {
  if (!elements.certDate || !elements.certDownloadBtn || !elements.certStatus) return;

  const totals = state.modules.reduce((result, module) => {
    result.lessons += module.lessons.length;
    result.challenges += module.lessons.filter(lesson => lesson.challenge).length;
    return result;
  }, { lessons: 0, challenges: 0 });
  const requiredLessons = lessonTotal ?? totals.lessons;
  const requiredChallenges = challengeTotal ?? totals.challenges;
  const isComplete = (requiredLessons > 0
    && state.completedLessons.length >= requiredLessons
    && state.completedChallenges.length >= requiredChallenges)
    || Boolean(state.certificateUnlocked);

  if (isComplete) {
    let completedOn = state.certificateCompletedOn || localStorage.getItem('pylearn_certificate_completed_on');
    if (!completedOn) {
      completedOn = new Date().toISOString();
      state.certificateCompletedOn = completedOn;
      localStorage.setItem('pylearn_certificate_completed_on', completedOn);
      localStorage.setItem('pylearn_cert_completed_on', completedOn);
    }

    // Determine or generate unique Certificate Serial ID (e.g., PHANIX-PY-A1B2C3D4-2026)
    let serialId = state.certificateId || localStorage.getItem('pylearn_cert_id');
    if (!serialId) {
      const userSeed = currentUser ? currentUser.uid.substring(0, 8).toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase();
      const year = new Date(completedOn).getFullYear() || 2026;
      serialId = `PHANIX-PY-${userSeed}-${year}`;
      state.certificateId = serialId;
      localStorage.setItem('pylearn_cert_id', serialId);
    }

    state.certificateUnlocked = true;
    localStorage.setItem('pylearn_cert_unlocked', 'true');

    elements.certDate.textContent = new Intl.DateTimeFormat(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date(completedOn));

    if (elements.certSerialId) {
      elements.certSerialId.textContent = serialId;
    }
    if (elements.certAccountEmail) {
      elements.certAccountEmail.textContent = currentUser ? currentUser.email : (state.learnerName || 'Personal Local Profile');
    }
    if (elements.certRecognitionBadge) {
      elements.certRecognitionBadge.textContent = currentUser ? 'VERIFIED CLOUD RECORD' : 'LOCAL COMPLETION RECORD';
    }

    elements.certStatus.textContent = 'Unlocked — official recognition from Phanix Cloud permanently linked to your account.';
    elements.certDownloadBtn.disabled = false;
    elements.certDownloadBtn.textContent = '↓ Download certificate';

    if (elements.certShareBtn) {
      elements.certShareBtn.style.display = 'inline-flex';
    }
  } else {
    elements.certDate.textContent = 'Pending completion';
    elements.certStatus.textContent = `Complete all ${requiredLessons} lessons and ${requiredChallenges} hands-on challenges to unlock your certificate.`;
    elements.certDownloadBtn.disabled = true;
    elements.certDownloadBtn.textContent = '🔒 Complete the course to unlock';

    if (elements.certSerialId) {
      elements.certSerialId.textContent = 'PHANIX-PENDING';
    }
    if (elements.certAccountEmail) {
      elements.certAccountEmail.textContent = currentUser ? currentUser.email : 'Local Account';
    }
    if (elements.certShareBtn) {
      elements.certShareBtn.style.display = 'none';
    }
  }
}

// XP Points & Streak Management
function addXP(points) {
  state.xp += points;
  localStorage.setItem('pylearn_xp', state.xp.toString());
  updateHeaderStats();
  syncCurrentUserProgress();
}

function syncCurrentUserProgress() {
  if (!currentUser || !db) return;
  db.collection('users').doc(currentUser.uid).set({
    uid: currentUser.uid,
    email: currentUser.email,
    displayName: currentUser.displayName || state.learnerName,
    xp: state.xp || 0,
    streak: state.streak || 1,
    completedLessons: state.completedLessons || [],
    completedLessonsCount: (state.completedLessons || []).length,
    completedChallenges: state.completedChallenges || [],
    completedChallengesCount: (state.completedChallenges || []).length,
    completedQuizzes: state.completedQuizzes || [],
    completedQuizzesCount: (state.completedQuizzes || []).length,
    unlockedBadges: state.unlockedBadges || [],
    unlockedBadgesCount: (state.unlockedBadges || []).length,
    certificateUnlocked: Boolean(state.certificateUnlocked),
    certificateId: state.certificateId || null,
    certificateCompletedOn: state.certificateCompletedOn || null,
    lastActive: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(err => {
    console.warn('Firestore progress sync warning:', err);
  });
}

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateDailyStreak() {
  const today = getLocalDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  const lastDate = localStorage.getItem('pylearn_last_streak_date');
  let currentStreak = parseInt(localStorage.getItem('pylearn_streak') || '1', 10);

  if (!lastDate) {
    currentStreak = 1;
    localStorage.setItem('pylearn_last_streak_date', today);
    localStorage.setItem('pylearn_streak', '1');
  } else if (lastDate === today) {
    // Already recorded activity for today, keep current streak
  } else if (lastDate === yesterday) {
    // Visited on consecutive day!
    currentStreak += 1;
    localStorage.setItem('pylearn_streak', currentStreak.toString());
    localStorage.setItem('pylearn_last_streak_date', today);
    showToast(`🔥 Streak extended! You are on a ${currentStreak}-day learning streak!`, 'success');
  } else {
    // More than 1 day missed, streak restarts at 1
    currentStreak = 1;
    localStorage.setItem('pylearn_streak', '1');
    localStorage.setItem('pylearn_last_streak_date', today);
  }

  state.streak = currentStreak;
  updateHeaderStats();
  syncCurrentUserProgress();
}

function updateHeaderStats() {
  if (elements.headerXp) {
    elements.headerXp.textContent = `${state.xp} XP`;
  }
  if (elements.headerStreak) {
    elements.headerStreak.textContent = `${state.streak} Day Streak`;
  }
  updateUserDropdownDetails();
}

// Helper: Get Current Lesson Object
function getCurrentLesson() {
  for (const mod of state.modules) {
    for (const l of mod.lessons) {
      if (l.id === state.currentLessonId) return l;
    }
  }
  return null;
}

// Theme Handling
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  elements.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('pylearn_theme', theme);
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'badge-unlock' ? '🎖️' : (type === 'error' ? '⚠️' : '✓')}</span> <span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Particle Confetti Animation
function fireConfetti() {
  const canvas = elements.confettiCanvas;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#0a84ff', '#30d158', '#ff9f0a', '#bf5af2', '#ff453a', '#ffffff'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      life: 1.0
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      if (p.life > 0) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.rotation += p.vRot;
        p.life -= 0.015;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  render();
}

// ===================================================
//  PROFILE / ABOUT MODAL (Strictly Isolated & Bulletproof)
// ===================================================
window.openProfileModal = function() {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;
  overlay.style.setProperty('display', 'flex', 'important');
  // force reflow
  void overlay.offsetWidth;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', _overlayClickClose);
  document.addEventListener('keydown', _escClose);
};

window.closeProfileModal = function() {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    if (!overlay.classList.contains('open')) {
      overlay.style.setProperty('display', 'none', 'important');
    }
  }, 220);
  document.body.style.overflow = '';
  overlay.removeEventListener('click', _overlayClickClose);
  document.removeEventListener('keydown', _escClose);
};

function _overlayClickClose(e) {
  const modal = document.getElementById('profile-modal');
  if (modal && !modal.contains(e.target)) {
    window.closeProfileModal();
  }
}

function _escClose(e) {
  if (e.key === 'Escape') {
    window.closeProfileModal();
  }
}

// Wire close button & triggers once DOM is ready
function initProfileModal() {
  const closeBtn = document.getElementById('profile-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', window.closeProfileModal);

  const aboutNavBtn = document.getElementById('about-nav-btn');
  if (aboutNavBtn) aboutNavBtn.addEventListener('click', window.openProfileModal);

  document.querySelectorAll('.ach-about-trigger').forEach(btn => {
    btn.addEventListener('click', window.openProfileModal);
  });
}

window.resetAllProgress = function(confirmPrompt = true) {
  if (!confirmPrompt || confirm('Are you sure you want to reset all your progress, XP, and badges back to zero? This will start you with a clean slate.')) {
    [
      'pylearn_xp',
      'pylearn_streak',
      'pylearn_last_streak_date',
      'pylearn_completed_lessons',
      'pylearn_completed_quizzes',
      'pylearn_completed_challenges',
      'pylearn_badges',
      'pylearn_user_codes',
      'pylearn_playground_code',
      'pylearn_current_lesson'
    ].forEach(k => localStorage.removeItem(k));
    location.reload();
  }
};

/* ==========================================================================
   FIREBASE AUTHENTICATION & ADMIN CONSOLE LOGIC
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCM3G86IDCfuAv_WNxagsYzhn4D_AiWM8o",
  authDomain: "my-learning-app-541bc.firebaseapp.com",
  projectId: "my-learning-app-541bc",
  storageBucket: "my-learning-app-541bc.firebasestorage.app",
  messagingSenderId: "865822136545",
  appId: "1:865822136545:web:471d3243b3b380930a7fa0"
};

let auth = null;
let db = null;
let currentUser = null;
let currentUserIsAdmin = false;
let authMode = 'login'; // 'login' or 'signup'
let adminLearnersData = [];
let guestModeDismissed = false;
let activeUserUnsubscribe = null;

function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.info('Firebase SDK not loaded, operating in offline/local mode.');
    return;
  }
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();

    // Enforce non-persistent session: auth state is cleared when browser/tab is closed
    if (auth.setPersistence && firebase.auth.Auth && firebase.auth.Auth.Persistence) {
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).catch((err) => {
        console.warn('Firebase setPersistence SESSION error:', err);
      });
    }

    // Listen to Firebase Auth state changes
    auth.onAuthStateChanged(handleAuthStateChanged);
    setupAuthEventListeners();
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

function setupAuthEventListeners() {
  if (elements.authBtnLogin) {
    elements.authBtnLogin.addEventListener('click', () => openAuthModal('login'));
  }
  if (elements.authModalClose) {
    elements.authModalClose.addEventListener('click', closeAuthModal);
  }
  if (elements.authModalOverlay) {
    elements.authModalOverlay.addEventListener('click', (e) => {
      // Only dismiss on backdrop click if already authenticated or browsing as guest
      if (e.target === elements.authModalOverlay && (currentUser || guestModeDismissed)) {
        closeAuthModal();
      }
    });
  }
  if (elements.authGuestBtn) {
    elements.authGuestBtn.addEventListener('click', () => {
      guestModeDismissed = true;
      closeAuthModal();
      showToast('Continuing as guest. Sign in anytime to sync your progress!', 'info');
    });
  }
  if (elements.tabLoginBtn) {
    elements.tabLoginBtn.addEventListener('click', () => setAuthMode('login'));
  }
  if (elements.tabSignupBtn) {
    elements.tabSignupBtn.addEventListener('click', () => setAuthMode('signup'));
  }
  if (elements.authForm) {
    elements.authForm.addEventListener('submit', handleAuthFormSubmit);
  }
  if (elements.googleAuthBtn) {
    elements.googleAuthBtn.addEventListener('click', handleGoogleSignIn);
  }
  if (elements.authForgotLink) {
    elements.authForgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      handlePasswordReset();
    });
  }
  if (elements.userPill) {
    elements.userPill.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleUserDropdown();
    });
  }
  if (elements.userDropdownProfileBtn) {
    elements.userDropdownProfileBtn.addEventListener('click', () => {
      toggleUserDropdown(false);
      switchView('view-achievements');
    });
  }
  if (elements.userDropdownCertBtn) {
    elements.userDropdownCertBtn.addEventListener('click', () => {
      toggleUserDropdown(false);
      switchView('view-achievements');
      setTimeout(() => {
        if (elements.certBox) {
          elements.certBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elements.certBox.classList.add('highlight-pulse');
          setTimeout(() => elements.certBox.classList.remove('highlight-pulse'), 2500);
        }
      }, 120);
    });
  }
  if (elements.certShareBtn) {
    elements.certShareBtn.addEventListener('click', async () => {
      const certId = state.certificateId || (elements.certSerialId ? elements.certSerialId.textContent : 'PHANIX-VERIFIED');
      const shareUrl = `${window.location.origin}${window.location.pathname}#certificate?id=${encodeURIComponent(certId)}&learner=${encodeURIComponent(state.learnerName)}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          showToast('🎓 Verified Certificate link copied! Share to showcase your credentials.', 'success');
        } else {
          prompt('Copy your verified certificate verification link:', shareUrl);
        }
      } catch (err) {
        prompt('Copy your verified certificate verification link:', shareUrl);
      }
    });
  }
  if (elements.userDropdownAdminBtn) {
    elements.userDropdownAdminBtn.addEventListener('click', () => {
      toggleUserDropdown(false);
      switchView('view-admin');
    });
  }
  document.addEventListener('click', (e) => {
    if (elements.userAuthWrapper && !elements.userAuthWrapper.contains(e.target)) {
      toggleUserDropdown(false);
    }
  });
  if (elements.authBtnLogout) {
    elements.authBtnLogout.addEventListener('click', handleSignOut);
  }
  if (elements.adminRefreshBtn) {
    elements.adminRefreshBtn.addEventListener('click', loadAdminDashboard);
  }
  if (elements.adminUserSearch) {
    elements.adminUserSearch.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      if (!adminLearnersData.length) return;
      if (!q) {
        renderAdminLearnersTable(adminLearnersData);
      } else {
        const filtered = adminLearnersData.filter(u => {
          const name = (u.displayName || '').toLowerCase();
          const email = (u.email || '').toLowerCase();
          const uid = (u.uid || u._id || '').toLowerCase();
          return name.includes(q) || email.includes(q) || uid.includes(q);
        });
        renderAdminLearnersTable(filtered);
      }
    });
  }
}

function toggleUserDropdown(open) {
  if (!elements.userDropdownMenu) return;
  const isCurrentlyOpen = elements.userDropdownMenu.style.display === 'flex';
  const shouldOpen = typeof open === 'boolean' ? open : !isCurrentlyOpen;

  elements.userDropdownMenu.style.display = shouldOpen ? 'flex' : 'none';
  if (elements.userPill) {
    elements.userPill.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    if (shouldOpen) {
      elements.userPill.classList.add('active');
      updateUserDropdownDetails();
    } else {
      elements.userPill.classList.remove('active');
    }
  }
}

function updateUserDropdownDetails() {
  if (!currentUser) return;
  const displayName = currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Learner');
  const email = currentUser.email || 'No email associated';
  const initial = (displayName[0] || '👤').toUpperCase();

  if (elements.userDropdownAvatar) elements.userDropdownAvatar.textContent = initial;
  if (elements.userDropdownName) elements.userDropdownName.textContent = displayName;
  if (elements.userDropdownEmail) elements.userDropdownEmail.textContent = email;
  if (elements.userDropdownRoleTag) {
    elements.userDropdownRoleTag.textContent = currentUserIsAdmin ? 'ADMIN' : 'LEARNER';
    elements.userDropdownRoleTag.className = 'user-dropdown-role-tag ' + (currentUserIsAdmin ? 'admin' : 'learner');
  }
  if (elements.userDropdownXp) elements.userDropdownXp.textContent = `${state.xp || 0} XP`;
  if (elements.userDropdownStreak) elements.userDropdownStreak.textContent = `${state.streak || 1} Day`;
  if (elements.userDropdownLessons) {
    elements.userDropdownLessons.textContent = (state.completedLessons ? state.completedLessons.length : 0).toString();
  }
  if (elements.userDropdownAdminBtn) {
    elements.userDropdownAdminBtn.style.display = currentUserIsAdmin ? 'flex' : 'none';
  }
}

async function handleAuthStateChanged(user) {
  currentUser = user;
  if (user) {
    // 1. User authenticated -> mark active session & close auth gate
    guestModeDismissed = false;
    try {
      sessionStorage.setItem('pylearn_session_authenticated', '1');
      document.documentElement.classList.add('pylearn-has-session');
    } catch (e) {}
    closeAuthModal();

    if (elements.authBtnLogin) elements.authBtnLogin.style.display = 'none';
    if (elements.userPill) elements.userPill.style.display = 'inline-flex';

    const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Learner');
    if (elements.userName) elements.userName.textContent = displayName;
    if (elements.userAvatar) elements.userAvatar.textContent = (displayName[0] || '👤').toUpperCase();

    // Auto-update certificate learner name
    state.learnerName = displayName;
    localStorage.setItem('pylearn_name', displayName);
    if (elements.certLearnerName) elements.certLearnerName.value = displayName;

    // 2. Load and unify this specific user's progress from Firestore
    try {
      if (db) {
        const userRef = db.collection('users').doc(user.uid);
        const docSnap = await userRef.get();

        if (docSnap.exists) {
          const docData = docSnap.data() || {};
          // Restore & Unify XP
          const cloudXp = typeof docData.xp === 'number' ? docData.xp : (parseInt(docData.xp, 10) || 0);
          state.xp = Math.max(state.xp || 0, cloudXp);

          // Restore & Unify Streak
          const cloudStreak = typeof docData.streak === 'number' ? docData.streak : (parseInt(docData.streak, 10) || 1);
          state.streak = Math.max(state.streak || 1, cloudStreak);

          // Restore & Unify Completed Lessons
          const cloudLessons = Array.isArray(docData.completedLessons) ? docData.completedLessons : [];
          state.completedLessons = Array.from(new Set([...(state.completedLessons || []), ...cloudLessons]));

          // Restore & Unify Completed Challenges
          const cloudChallenges = Array.isArray(docData.completedChallenges) ? docData.completedChallenges : [];
          state.completedChallenges = Array.from(new Set([...(state.completedChallenges || []), ...cloudChallenges]));

          // Restore & Unify Completed Quizzes
          const cloudQuizzes = Array.isArray(docData.completedQuizzes) ? docData.completedQuizzes : [];
          state.completedQuizzes = Array.from(new Set([...(state.completedQuizzes || []), ...cloudQuizzes]));

          // Restore & Unify Unlocked Badges
          const cloudBadges = Array.isArray(docData.unlockedBadges) ? docData.unlockedBadges : [];
          state.unlockedBadges = Array.from(new Set([...(state.unlockedBadges || []), ...cloudBadges]));

          // Restore & Unify Certificate
          if (docData.certificateUnlocked) {
            state.certificateUnlocked = true;
            if (docData.certificateId) state.certificateId = docData.certificateId;
            if (docData.certificateCompletedOn) state.certificateCompletedOn = docData.certificateCompletedOn;
            localStorage.setItem('pylearn_cert_unlocked', 'true');
            if (state.certificateId) localStorage.setItem('pylearn_cert_id', state.certificateId);
            if (state.certificateCompletedOn) {
              localStorage.setItem('pylearn_cert_completed_on', state.certificateCompletedOn);
              localStorage.setItem('pylearn_certificate_completed_on', state.certificateCompletedOn);
            }
          }
        }

        // Cache active user's stats locally on this device
        localStorage.setItem('pylearn_xp', state.xp.toString());
        localStorage.setItem('pylearn_streak', state.streak.toString());
        localStorage.setItem('pylearn_completed_lessons', JSON.stringify(state.completedLessons));
        localStorage.setItem('pylearn_completed_challenges', JSON.stringify(state.completedChallenges));
        localStorage.setItem('pylearn_completed_quizzes', JSON.stringify(state.completedQuizzes));
        localStorage.setItem('pylearn_badges', JSON.stringify(state.unlockedBadges));

        // Sync back unified cloud record to Firestore
        await userRef.set({
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          xp: state.xp,
          streak: state.streak,
          completedLessons: state.completedLessons,
          completedLessonsCount: state.completedLessons.length,
          completedChallenges: state.completedChallenges,
          completedChallengesCount: state.completedChallenges.length,
          completedQuizzes: state.completedQuizzes,
          completedQuizzesCount: state.completedQuizzes.length,
          unlockedBadges: state.unlockedBadges,
          unlockedBadgesCount: state.unlockedBadges.length,
          certificateUnlocked: Boolean(state.certificateUnlocked),
          certificateId: state.certificateId || null,
          certificateCompletedOn: state.certificateCompletedOn || null,
          lastActive: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Update ALL UI views across the platform on this device
        updateHeaderStats();
        renderCurriculumTree();
        renderChallengesCatalog();
        renderAchievements();
        checkAllProgress();
        updateCertificateStatus();
        updateUserDropdownDetails();

        // Refresh currently viewed lesson completed tag
        if (state.currentLessonId && elements.lessonCompletedTag) {
          elements.lessonCompletedTag.style.display = state.completedLessons.includes(state.currentLessonId) ? 'inline' : 'none';
        }

        // Real-time listener: if user completes progress on another device, update this device instantly!
        if (activeUserUnsubscribe) {
          activeUserUnsubscribe();
          activeUserUnsubscribe = null;
        }
        activeUserUnsubscribe = userRef.onSnapshot((snap) => {
          if (!snap || !snap.exists) return;
          const remote = snap.data() || {};
          let changed = false;

          if (Array.isArray(remote.completedLessons)) {
            const merged = Array.from(new Set([...state.completedLessons, ...remote.completedLessons]));
            if (merged.length !== state.completedLessons.length) {
              state.completedLessons = merged;
              localStorage.setItem('pylearn_completed_lessons', JSON.stringify(state.completedLessons));
              changed = true;
            }
          }
          if (Array.isArray(remote.completedChallenges)) {
            const merged = Array.from(new Set([...state.completedChallenges, ...remote.completedChallenges]));
            if (merged.length !== state.completedChallenges.length) {
              state.completedChallenges = merged;
              localStorage.setItem('pylearn_completed_challenges', JSON.stringify(state.completedChallenges));
              changed = true;
            }
          }
          if (Array.isArray(remote.completedQuizzes)) {
            const merged = Array.from(new Set([...state.completedQuizzes, ...remote.completedQuizzes]));
            if (merged.length !== state.completedQuizzes.length) {
              state.completedQuizzes = merged;
              localStorage.setItem('pylearn_completed_quizzes', JSON.stringify(state.completedQuizzes));
              changed = true;
            }
          }
          if (Array.isArray(remote.unlockedBadges)) {
            const merged = Array.from(new Set([...state.unlockedBadges, ...remote.unlockedBadges]));
            if (merged.length !== state.unlockedBadges.length) {
              state.unlockedBadges = merged;
              localStorage.setItem('pylearn_badges', JSON.stringify(state.unlockedBadges));
              changed = true;
            }
          }
          if (typeof remote.xp === 'number' && remote.xp > state.xp) {
            state.xp = remote.xp;
            localStorage.setItem('pylearn_xp', state.xp.toString());
            changed = true;
          }
          if (typeof remote.streak === 'number' && remote.streak > state.streak) {
            state.streak = remote.streak;
            localStorage.setItem('pylearn_streak', state.streak.toString());
            changed = true;
          }
          if (remote.certificateUnlocked && !state.certificateUnlocked) {
            state.certificateUnlocked = true;
            state.certificateId = remote.certificateId || state.certificateId;
            state.certificateCompletedOn = remote.certificateCompletedOn || state.certificateCompletedOn;
            localStorage.setItem('pylearn_cert_unlocked', 'true');
            if (state.certificateId) localStorage.setItem('pylearn_cert_id', state.certificateId);
            if (state.certificateCompletedOn) {
              localStorage.setItem('pylearn_cert_completed_on', state.certificateCompletedOn);
              localStorage.setItem('pylearn_certificate_completed_on', state.certificateCompletedOn);
            }
            changed = true;
          }

          if (changed) {
            updateHeaderStats();
            renderCurriculumTree();
            renderChallengesCatalog();
            renderAchievements();
            checkAllProgress();
            updateCertificateStatus();
            updateUserDropdownDetails();
            if (state.currentLessonId && elements.lessonCompletedTag) {
              elements.lessonCompletedTag.style.display = state.completedLessons.includes(state.currentLessonId) ? 'inline' : 'none';
            }
          }
        }, err => {
          console.warn('Real-time sync listener notice:', err);
        });
      }
    } catch (err) {
      console.warn('Could not sync user profile with Firestore:', err);
    }

    // 3. Check if current user is admin (/admins/{uid})
    try {
      if (db) {
        const adminDoc = await db.collection('admins').doc(user.uid).get();
        if (adminDoc.exists) {
          currentUserIsAdmin = true;
          if (elements.navItemAdmin) elements.navItemAdmin.style.display = 'inline-block';
          if (elements.adminBadgeTag) elements.adminBadgeTag.style.display = 'inline-block';
          showToast(`🛡️ Welcome Admin, ${displayName}!`, 'success');
        } else {
          currentUserIsAdmin = false;
          if (elements.navItemAdmin) elements.navItemAdmin.style.display = 'none';
          if (elements.adminBadgeTag) elements.adminBadgeTag.style.display = 'none';
          showToast(`Welcome back, ${displayName}!`, 'success');
        }
      }
    } catch (err) {
      currentUserIsAdmin = false;
      if (elements.navItemAdmin) elements.navItemAdmin.style.display = 'none';
      if (elements.adminBadgeTag) elements.adminBadgeTag.style.display = 'none';
    }
  } else {
    // User is NOT logged in -> lock/prompt sign in right on open!
    currentUser = null;
    currentUserIsAdmin = false;
    if (activeUserUnsubscribe) {
      activeUserUnsubscribe();
      activeUserUnsubscribe = null;
    }
    try {
      sessionStorage.removeItem('pylearn_session_authenticated');
      document.documentElement.classList.remove('pylearn-has-session');
    } catch (e) {}
    toggleUserDropdown(false);
    if (elements.authBtnLogin) elements.authBtnLogin.style.display = 'inline-flex';
    if (elements.userPill) elements.userPill.style.display = 'none';
    if (elements.navItemAdmin) elements.navItemAdmin.style.display = 'none';
    if (elements.adminBadgeTag) elements.adminBadgeTag.style.display = 'none';

    // If currently viewing admin console, return to learn view
    const adminPanel = document.getElementById('view-admin');
    if (adminPanel && adminPanel.classList.contains('active')) {
      switchView('view-learn');
    }

    // Prompt sign in on opening the web
    if (!guestModeDismissed) {
      openAuthModal('login');
    }
  }
}

function openAuthModal(mode = 'login') {
  setAuthMode(mode);
  clearAuthAlert();
  try {
    document.documentElement.classList.remove('pylearn-has-session');
  } catch (e) {}
  const screen = elements.authScreen || elements.authModalOverlay;
  if (screen) {
    screen.style.display = 'flex';
    // Force DOM reflow for hardware-accelerated 60fps smooth animation
    void screen.offsetWidth;
    screen.classList.remove('auth-screen-hidden');
  }
  // If user is logged in or already in guest mode, allow closing
  if (elements.authModalClose) {
    elements.authModalClose.style.display = (currentUser || guestModeDismissed) ? 'flex' : 'none';
  }
}

function closeAuthModal() {
  const screen = elements.authScreen || elements.authModalOverlay;
  if (screen) {
    screen.classList.add('auth-screen-hidden');
    setTimeout(() => {
      if (screen && screen.classList.contains('auth-screen-hidden')) {
        screen.style.display = 'none';
        if (currentUser) {
          try {
            document.documentElement.classList.add('pylearn-has-session');
          } catch (e) {}
        }
      }
    }, 380);
  }
  clearAuthAlert();
}

function setAuthMode(mode) {
  authMode = mode;
  if (mode === 'signup') {
    if (elements.tabLoginBtn) elements.tabLoginBtn.classList.remove('active');
    if (elements.tabSignupBtn) elements.tabSignupBtn.classList.add('active');
    if (elements.authModalTitle) elements.authModalTitle.textContent = 'Create your account';
    if (elements.authModalSubtitle) elements.authModalSubtitle.textContent = 'Track your learning, earn certificates, and build projects';
    if (elements.authNameGroup) elements.authNameGroup.style.display = 'flex';
    if (elements.authSubmitText) elements.authSubmitText.textContent = 'Create Account';
    if (elements.authForgotLink) elements.authForgotLink.style.display = 'none';
  } else {
    if (elements.tabLoginBtn) elements.tabLoginBtn.classList.add('active');
    if (elements.tabSignupBtn) elements.tabSignupBtn.classList.remove('active');
    if (elements.authModalTitle) elements.authModalTitle.textContent = 'Sign in to Phanix';
    if (elements.authModalSubtitle) elements.authModalSubtitle.textContent = 'Save your XP, track your streak, and sync progress';
    if (elements.authNameGroup) elements.authNameGroup.style.display = 'none';
    if (elements.authSubmitText) elements.authSubmitText.textContent = 'Sign In';
    if (elements.authForgotLink) elements.authForgotLink.style.display = 'inline';
  }
}

function setAuthAlert(msg, type = 'error') {
  if (!elements.authAlert) return;
  elements.authAlert.className = `auth-alert ${type}`;
  elements.authAlert.textContent = msg;
  elements.authAlert.style.display = 'block';
}

function clearAuthAlert() {
  if (!elements.authAlert) return;
  elements.authAlert.textContent = '';
  elements.authAlert.style.display = 'none';
}

async function handleAuthFormSubmit(e) {
  e.preventDefault();
  if (!auth) {
    setAuthAlert('Firebase Auth is not available. Please check network connection.', 'error');
    return;
  }

  const email = elements.authEmailInput ? elements.authEmailInput.value.trim() : '';
  const password = elements.authPasswordInput ? elements.authPasswordInput.value : '';
  const name = elements.authNameInput ? elements.authNameInput.value.trim() : '';

  if (!email || !password) {
    setAuthAlert('Please enter both email and password.', 'error');
    return;
  }

  if (elements.authSpinner) elements.authSpinner.style.display = 'inline-block';
  if (elements.authSubmitBtn) elements.authSubmitBtn.disabled = true;
  clearAuthAlert();

  try {
    if (authMode === 'signup') {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (name && cred.user) {
        await cred.user.updateProfile({ displayName: name });
      }
      closeAuthModal();
      showToast('Account created successfully! Welcome to Phanix.', 'success');
    } else {
      await auth.signInWithEmailAndPassword(email, password);
      closeAuthModal();
    }
  } catch (err) {
    let message = err.message || 'Authentication failed.';
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      message = 'Incorrect email or password.';
    } else if (err.code === 'auth/email-already-in-use') {
      message = 'An account already exists with this email address.';
    } else if (err.code === 'auth/weak-password') {
      message = 'Password must be at least 6 characters.';
    } else if (err.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    }
    setAuthAlert(message, 'error');
  } finally {
    if (elements.authSpinner) elements.authSpinner.style.display = 'none';
    if (elements.authSubmitBtn) elements.authSubmitBtn.disabled = false;
  }
}

async function handleGoogleSignIn() {
  if (!auth) {
    showToast('Firebase Auth unavailable', 'error');
    return;
  }
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    closeAuthModal();
    showToast('Signed in with Google successfully!', 'success');
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      setAuthAlert(err.message || 'Could not sign in with Google.', 'error');
    }
  }
}

async function handlePasswordReset() {
  const email = elements.authEmailInput ? elements.authEmailInput.value.trim() : '';
  if (!email) {
    setAuthAlert('Please enter your email above to receive password reset link.', 'error');
    return;
  }
  try {
    await auth.sendPasswordResetEmail(email);
    setAuthAlert(`Password reset link sent to ${email}! Check your inbox.`, 'success');
  } catch (err) {
    setAuthAlert(err.message || 'Could not send reset email.', 'error');
  }
}

async function handleSignOut() {
  if (!confirm('Are you sure you want to sign out?')) {
    return;
  }
  if (!auth) return;
  try {
    toggleUserDropdown(false);
    guestModeDismissed = false;
    if (activeUserUnsubscribe) {
      activeUserUnsubscribe();
      activeUserUnsubscribe = null;
    }
    await auth.signOut();
    // Clear local storage and reset state so no XP leaks to another user on this machine
    state.xp = 0;
    state.streak = 1;
    state.completedLessons = [];
    state.completedChallenges = [];
    state.completedQuizzes = [];
    state.unlockedBadges = [];
    state.learnerName = 'Your Name';
    state.certificateUnlocked = false;
    state.certificateId = null;
    state.certificateCompletedOn = null;
    [
      'pylearn_xp',
      'pylearn_streak',
      'pylearn_last_streak_date',
      'pylearn_completed_lessons',
      'pylearn_completed_quizzes',
      'pylearn_completed_challenges',
      'pylearn_badges',
      'pylearn_name',
      'pylearn_cert_unlocked',
      'pylearn_cert_id',
      'pylearn_cert_completed_on',
      'pylearn_certificate_completed_on'
    ].forEach(k => localStorage.removeItem(k));
    try {
      sessionStorage.removeItem('pylearn_session_authenticated');
      document.documentElement.classList.remove('pylearn-has-session');
    } catch (e) {}
    updateHeaderStats();
    renderCurriculumTree();
    renderAchievements();
    updateCertificateStatus();
    showToast('Signed out successfully.', 'info');
  } catch (err) {
    showToast('Sign out error: ' + err.message, 'error');
  }
}

async function loadAdminDashboard() {
  if (!db || !currentUserIsAdmin) return;
  if (elements.adminLearnersTbody) {
    elements.adminLearnersTbody.innerHTML = `<tr><td colspan="8" class="admin-loading-row">Fetching learners from Firestore...</td></tr>`;
  }

  try {
    const snap = await db.collection('users').get();
    adminLearnersData = [];
    let totalXp = 0;
    let totalLessons = 0;
    let maxStreak = 0;

    snap.forEach(doc => {
      const data = doc.data() || {};
      data._id = doc.id;
      adminLearnersData.push(data);
      totalXp += (Number(data.xp) || 0);
      totalLessons += (Number(data.completedLessonsCount) || 0);
      if (Number(data.streak) > maxStreak) maxStreak = Number(data.streak);
    });

    if (elements.adminStatUsers) elements.adminStatUsers.textContent = adminLearnersData.length;
    if (elements.adminStatXp) elements.adminStatXp.textContent = totalXp.toLocaleString();
    if (elements.adminStatLessons) elements.adminStatLessons.textContent = totalLessons.toLocaleString();
    if (elements.adminStatStreak) elements.adminStatStreak.textContent = `${maxStreak} Days`;

    renderAdminLearnersTable(adminLearnersData);
  } catch (err) {
    if (elements.adminLearnersTbody) {
      elements.adminLearnersTbody.innerHTML = `<tr><td colspan="8" class="admin-loading-row" style="color: var(--apple-red);">Could not load learners: ${escapeHTML(err.message)}</td></tr>`;
    }
  }
}

function renderAdminLearnersTable(learners) {
  if (!elements.adminLearnersTbody) return;
  if (!learners.length) {
    elements.adminLearnersTbody.innerHTML = `<tr><td colspan="8" class="admin-loading-row">No learners found in /users collection yet.</td></tr>`;
    if (elements.adminTableCount) elements.adminTableCount.textContent = '0 learners';
    return;
  }

  if (elements.adminTableCount) {
    elements.adminTableCount.textContent = `Showing ${learners.length} learner${learners.length === 1 ? '' : 's'}`;
  }

  elements.adminLearnersTbody.innerHTML = learners.map(u => {
    const name = u.displayName || (u.email ? u.email.split('@')[0] : 'Learner');
    const email = u.email || 'No email';
    const xp = u.xp || 0;
    const streak = u.streak || 1;
    const lessonsCount = u.completedLessonsCount || 0;
    const initial = (name[0] || 'U').toUpperCase();

    let lastActiveStr = 'Recent';
    if (u.lastActive && u.lastActive.toDate) {
      lastActiveStr = u.lastActive.toDate().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return `
      <tr>
        <td>
          <div class="admin-learner-cell">
            <span class="admin-learner-avatar">${escapeHTML(initial)}</span>
            <span>${escapeHTML(name)}</span>
          </div>
        </td>
        <td>${escapeHTML(email)}</td>
        <td><strong style="color: var(--apple-blue);">${xp} XP</strong></td>
        <td>🔥 ${streak}</td>
        <td>📘 ${lessonsCount} lessons</td>
        <td>${u.certificateUnlocked ? '<span class="admin-cert-pill unlocked" title="' + escapeHTML(u.certificateId || 'PHANIX-VERIFIED') + '">🎓 Verified</span>' : '<span class="admin-cert-pill locked">🔒 In Progress</span>'}</td>
        <td style="font-size: 0.78rem;">${escapeHTML(lastActiveStr)}</td>
        <td><span class="admin-uid-code" title="${escapeHTML(u.uid || u._id || '')}">${escapeHTML((u.uid || u._id || '').slice(0, 10))}…</span></td>
      </tr>
    `;
  }).join('');
}

// Kickoff application
window.addEventListener('DOMContentLoaded', () => {
  initApp();
  initProfileModal();
});

