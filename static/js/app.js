/**
 * Phanix - Interactive Python Learning Platform
 * Client Application Logic
 */

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
  learnerName: localStorage.getItem('pylearn_name') || 'Phaneendhar Nittala'
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

// DOM Elements
const elements = {
  headerXp: document.getElementById('header-xp'),
  headerStreak: document.getElementById('header-streak'),
  aboutNavBtn: document.getElementById('about-nav-btn'),
  themeToggle: document.getElementById('theme-toggle'),
  brandLink: document.getElementById('brand-link'),
  navButtons: document.querySelectorAll('.nav-btn'),
  viewPanels: document.querySelectorAll('.view-panel'),
  
  // Learn View
  moduleListContainer: document.getElementById('module-list-container'),
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
  codeEditor: document.getElementById('code-editor'),
  editorLineNumbers: document.getElementById('editor-line-numbers'),
  
  // Terminal
  termTabs: document.querySelectorAll('.term-tab'),
  stdoutView: document.getElementById('stdout-view'),
  testsView: document.getElementById('tests-view'),
  stdoutContent: document.getElementById('stdout-content'),
  stderrContent: document.getElementById('stderr-content'),
  testResultsContainer: document.getElementById('test-results-container'),
  testSummaryPill: document.getElementById('test-summary-pill'),
  termStatus: document.getElementById('term-status'),
  clearConsoleBtn: document.getElementById('clear-console-btn'),

  // Playground
  pgTemplateSelect: document.getElementById('pg-template-select'),
  pgClearBtn: document.getElementById('pg-clear-btn'),
  pgRunBtn: document.getElementById('pg-run-btn'),
  pgEditor: document.getElementById('pg-editor'),
  pgLineNumbers: document.getElementById('pg-line-numbers'),
  pgStdout: document.getElementById('pg-stdout'),
  pgStderr: document.getElementById('pg-stderr'),
  pgDurationMeta: document.getElementById('pg-duration-meta'),

  // Challenges Catalog
  challengesCatalogGrid: document.getElementById('challenges-catalog-grid'),

  // Cheat Sheet
  cheatsheetSearch: document.getElementById('cheatsheet-search'),
  cheatsheetGrid: document.getElementById('cheatsheet-grid'),

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
  certLearnerName: document.getElementById('cert-learner-name'),
  certDate: document.getElementById('cert-date'),

  // Toast & Confetti
  toastContainer: document.getElementById('toast-container'),
  confettiCanvas: document.getElementById('confetti-canvas')
};

// Initialize Application
async function initApp() {
  applyTheme(state.theme);
  updateHeaderStats();
  setupEventListeners();
  setupEditorHelpers(elements.codeEditor, elements.editorLineNumbers);
  setupEditorHelpers(elements.pgEditor, elements.pgLineNumbers);

  // Load playground initial forensic template
  elements.pgEditor.value = PLAYGROUND_TEMPLATES.forensic_hasher;
  updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);

  // Initialize certificate name
  if (elements.certLearnerName) {
    elements.certLearnerName.textContent = state.learnerName;
  }
  if (elements.certDate) {
    elements.certDate.textContent = `Awarded with distinction: ${new Date().toLocaleDateString()}`;
  }

  try {
    await Promise.all([loadCurriculum(), loadCheatsheet()]);
    renderCurriculumTree();
    renderChallengesCatalog();
    renderCheatsheet();
    renderAchievements();

    // Select initial lesson
    const savedLesson = localStorage.getItem('pylearn_current_lesson');
    const firstLesson = state.modules[0]?.lessons[0]?.id;
    selectLesson(savedLesson || firstLesson || 'lesson-1-1');
  } catch (err) {
    console.error('Initialization error:', err);
    showToast('Failed to load curriculum data. Please refresh.', 'error');
  }
}

// Fetch Curriculum from Server API
async function loadCurriculum() {
  const res = await fetch('/data/curriculum.json');
  if (!res.ok) throw new Error('Could not fetch curriculum');
  state.modules = await res.json();
}

// Fetch Cheat Sheet from Server API
async function loadCheatsheet() {
  const res = await fetch('/data/cheatsheet.json');
  if (!res.ok) throw new Error('Could not fetch cheatsheet');
  state.cheatsheet = await res.json();
}

// Setup Event Listeners
function setupEventListeners() {
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

  // Learn View Editor Buttons
  elements.runCodeBtn.addEventListener('click', handleRunCode);
  elements.testCodeBtn.addEventListener('click', handleTestCode);
  elements.resetCodeBtn.addEventListener('click', handleResetCode);
  
  // Hint Button Toggle
  elements.hintBtn.addEventListener('click', () => {
    elements.hintBox.classList.toggle('show');
  });

  // Terminal Tabs
  elements.termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elements.termTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const termType = tab.getAttribute('data-term-tab');
      if (termType === 'stdout') {
        elements.stdoutView.style.display = 'block';
        elements.testsView.style.display = 'none';
      } else {
        elements.stdoutView.style.display = 'none';
        elements.testsView.style.display = 'block';
      }
    });
  });

  elements.clearConsoleBtn.addEventListener('click', () => {
    elements.stdoutContent.textContent = 'Console cleared.';
    elements.stderrContent.textContent = '';
    elements.stderrContent.style.display = 'none';
    elements.termStatus.textContent = 'Ready';
  });

  // Playground Listeners
  elements.pgTemplateSelect.addEventListener('change', (e) => {
    const template = PLAYGROUND_TEMPLATES[e.target.value] || '';
    elements.pgEditor.value = template;
    updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
  });

  elements.pgClearBtn.addEventListener('click', () => {
    elements.pgEditor.value = '';
    elements.pgStdout.textContent = '';
    elements.pgStderr.textContent = '';
    elements.pgStderr.style.display = 'none';
    updateLineNumbers(elements.pgEditor, elements.pgLineNumbers);
  });

  elements.pgRunBtn.addEventListener('click', handlePlaygroundRun);

  // Cheat Sheet Search
  elements.cheatsheetSearch.addEventListener('input', (e) => {
    filterCheatsheet(e.target.value.trim().toLowerCase());
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
      window.location.href = `mailto:nittalaphaneendhar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Learner Name update on edit
  if (elements.certLearnerName) {
    elements.certLearnerName.addEventListener('blur', () => {
      const name = elements.certLearnerName.textContent.trim() || 'Phaneendhar Nittala';
      state.learnerName = name;
      localStorage.setItem('pylearn_name', name);
    });
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

  if (targetId === 'view-learn') {
    updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);
  } else if (targetId === 'view-achievements') {
    renderAchievements();
  } else if (targetId === 'view-challenges') {
    renderChallengesCatalog();
  }
}
window.switchView = switchView; // expose to inline onclick attributes

// Code Editor Helpers
function setupEditorHelpers(textarea, lineNumbersEl) {
  const syncLines = () => updateLineNumbers(textarea, lineNumbersEl);

  textarea.addEventListener('input', () => {
    syncLines();
    if (textarea === elements.codeEditor && state.currentLessonId) {
      state.userCodes[state.currentLessonId] = textarea.value;
      localStorage.setItem('pylearn_user_codes', JSON.stringify(state.userCodes));
    }
  });

  textarea.addEventListener('scroll', () => {
    lineNumbersEl.scrollTop = textarea.scrollTop;
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

    // Tab indentation (4 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      syncLines();
      return;
    }

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      const pos = textarea.selectionStart;
      const lineStart = textarea.value.lastIndexOf('\n', pos - 1) + 1;
      const currentLine = textarea.value.substring(lineStart, pos);
      const match = currentLine.match(/^(\s+)/);
      let indent = match ? match[1] : '';

      // If line ends with ':', add 4 spaces
      if (currentLine.trim().endsWith(':')) {
        indent += '    ';
      }

      if (indent.length > 0) {
        e.preventDefault();
        const insertText = '\n' + indent;
        textarea.value = textarea.value.substring(0, pos) + insertText + textarea.value.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = pos + insertText.length;
        syncLines();
      }
    }
  });

  syncLines();
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
  const takeawayHtml = `
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
  elements.lessonBody.innerHTML = parseMarkdownToHtml(targetLesson.content) + takeawayHtml;

  // Populate Quiz
  renderQuiz(targetLesson.quiz);

  // Populate Challenge Banner
  if (targetLesson.challenge) {
    elements.challengeInstructionsText.textContent = targetLesson.challenge.instructions;
    elements.hintText.innerHTML = targetLesson.challenge.hints?.join('<br><br>') || 'No hints available.';
    elements.hintBox.classList.remove('show');
  }

  // Populate Editor with saved user code or starter code
  const codeToLoad = state.userCodes[lessonId] !== undefined ? state.userCodes[lessonId] : (targetLesson.starter_code || '');
  elements.codeEditor.value = codeToLoad;
  updateLineNumbers(elements.codeEditor, elements.editorLineNumbers);

  // Reset console
  elements.stdoutContent.textContent = "Press 'Run' or hit Ctrl+Enter to execute your Python code...";
  elements.stderrContent.textContent = '';
  elements.stderrContent.style.display = 'none';
  elements.testResultsContainer.innerHTML = '<p style="color: var(--text-muted);">Click "Check Solution" to run automated tests against your code.</p>';
  elements.testSummaryPill.textContent = '0/0';
  elements.termStatus.textContent = 'Ready';

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
  showToast('🚀 Example loaded into editor! Hit "Run" (Ctrl+Enter) to test.', 'success');
  elements.termStatus.textContent = 'Example Loaded';
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
        <pre><code class="python-code">${cleanCode}</code></pre>
      </div>`;
    })
    .replace(/```([\s\S]*?)```/g, (match, code) => {
      const cleanCode = code.trim();
      return `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-lang-label">Code</span>
          <button class="try-code-btn" onclick="insertCodeIntoEditor(this)">▶ Try in Editor</button>
        </div>
        <pre><code>${cleanCode}</code></pre>
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
async function handleRunCode() {
  const code = elements.codeEditor.value;
  elements.termStatus.textContent = 'Running...';
  elements.runCodeBtn.disabled = true;

  switchTermTab('stdout');

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    elements.stdoutContent.textContent = data.stdout || (data.exit_code === 0 ? '[Script finished with no output]' : '');
    
    if (data.stderr) {
      elements.stderrContent.textContent = data.stderr;
      elements.stderrContent.style.display = 'block';
    } else {
      elements.stderrContent.textContent = '';
      elements.stderrContent.style.display = 'none';
    }

    elements.termStatus.textContent = `Finished in ${data.duration_ms}ms (Exit: ${data.exit_code})`;
    checkBadgeUnlock('first_run');
  } catch (err) {
    elements.stderrContent.textContent = `Server Connection Error: ${err.message}`;
    elements.stderrContent.style.display = 'block';
    elements.termStatus.textContent = 'Execution Failed';
  } finally {
    elements.runCodeBtn.disabled = false;
  }
}

// Handle Challenge Solution Testing (Check Solution Button)
async function handleTestCode() {
  const code = elements.codeEditor.value;
  elements.termStatus.textContent = 'Testing Solution...';
  elements.testCodeBtn.disabled = true;

  switchTermTab('tests');

  try {
    const res = await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        lesson_id: state.currentLessonId
      })
    });

    const data = await res.json();
    renderTestResults(data);

    if (data.all_passed) {
      fireConfetti();
      checkBadgeUnlock('first_challenge');

      const isFirstPass = !state.completedChallenges.includes(state.currentLessonId);
      if (isFirstPass) {
        state.completedChallenges.push(state.currentLessonId);
        localStorage.setItem('pylearn_completed_challenges', JSON.stringify(state.completedChallenges));

        if (!state.completedLessons.includes(state.currentLessonId)) {
          state.completedLessons.push(state.currentLessonId);
          localStorage.setItem('pylearn_completed_lessons', JSON.stringify(state.completedLessons));
        }

        const currentLesson = getCurrentLesson();
        const earnedXp = currentLesson?.xp || 60;
        addXP(earnedXp);
        showToast(`🎉 Challenge Passed! +${earnedXp} XP earned!`, 'success');

        renderCurriculumTree();
        elements.lessonCompletedTag.style.display = 'inline';
        checkAllProgress();
      } else {
        showToast(`✓ All tests passed again! Great job!`, 'success');
      }
    } else {
      showToast('Some tests failed. Review the diffs below!', 'error');
    }
  } catch (err) {
    elements.testResultsContainer.innerHTML = `<p style="color: var(--accent-red);">Testing Error: ${err.message}</p>`;
  } finally {
    elements.testCodeBtn.disabled = false;
    elements.termStatus.textContent = 'Ready';
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
    state.userCodes[state.currentLessonId] = lesson.starter_code || '';
    localStorage.setItem('pylearn_user_codes', JSON.stringify(state.userCodes));
    showToast('Code reset to starter template.', 'success');
  }
}

// Switch Terminal Sub-tab
function switchTermTab(tabName) {
  elements.termTabs.forEach(t => {
    if (t.getAttribute('data-term-tab') === tabName) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  if (tabName === 'stdout') {
    elements.stdoutView.style.display = 'block';
    elements.testsView.style.display = 'none';
  } else {
    elements.stdoutView.style.display = 'none';
    elements.testsView.style.display = 'block';
  }
}

// Handle Playground Code Execution
async function handlePlaygroundRun() {
  const code = elements.pgEditor.value;
  elements.pgRunBtn.disabled = true;
  elements.pgDurationMeta.textContent = 'Running...';

  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    elements.pgStdout.textContent = data.stdout || (data.exit_code === 0 ? '[Script finished with no output]' : '');
    
    if (data.stderr) {
      elements.pgStderr.textContent = data.stderr;
      elements.pgStderr.style.display = 'block';
    } else {
      elements.pgStderr.textContent = '';
      elements.pgStderr.style.display = 'none';
    }

    elements.pgDurationMeta.textContent = `Completed in ${data.duration_ms}ms (Exit: ${data.exit_code})`;
    checkBadgeUnlock('first_run');
  } catch (err) {
    elements.pgStderr.textContent = `Execution Error: ${err.message}`;
    elements.pgStderr.style.display = 'block';
    elements.pgDurationMeta.textContent = 'Error';
  } finally {
    elements.pgRunBtn.disabled = false;
  }
}

// Render Challenges Catalog Tab
function renderChallengesCatalog() {
  elements.challengesCatalogGrid.innerHTML = '';

  state.modules.forEach(mod => {
    mod.lessons.forEach(lesson => {
      if (!lesson.challenge) return;

      const isPassed = state.completedChallenges.includes(lesson.id);
      const card = document.createElement('div');
      card.className = 'sheet-cat-card';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.75rem; color: var(--apple-blue); font-weight: 700; text-transform: uppercase;">${mod.title.split(':')[0]}</span>
            <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0.2rem 0; color: var(--text-primary);">${lesson.title}</h4>
          </div>
          <span class="badge ${isPassed ? 'xp-badge' : 'difficulty'}">${isPassed ? '✓ Solved' : (lesson.difficulty || 'Easy')}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${lesson.summary || 'Coding challenge with automated test cases.'}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.5rem;">
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--apple-orange);">⚡ +${lesson.xp || 60} XP</span>
          <button class="btn btn-test" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">${isPassed ? 'Review Code' : 'Solve Challenge'}</button>
        </div>
      `;

      card.querySelector('.btn-test').addEventListener('click', () => {
        switchView('view-learn');
        selectLesson(lesson.id);
      });

      elements.challengesCatalogGrid.appendChild(card);
    });
  });
}

// Render Cheat Sheet Tab
function renderCheatsheet(filter = '') {
  elements.cheatsheetGrid.innerHTML = '';
  const normalizedFilter = filter.trim().toLowerCase();

  state.cheatsheet.forEach(category => {
    const matchingItems = category.items.filter(item => {
      if (!normalizedFilter) return true;
      const examples = item.examples || [{ code: item.code || '', label: 'Example' }];
      return (
        item.name.toLowerCase().includes(normalizedFilter) ||
        examples.some(example => `${example.label || ''} ${example.code || ''}`.toLowerCase().includes(normalizedFilter)) ||
        item.desc.toLowerCase().includes(normalizedFilter)
      );
    });

    if (matchingItems.length === 0) return;

    const catCard = document.createElement('div');
    catCard.className = 'sheet-cat-card';

    catCard.innerHTML = `
      <div class="cat-title">${category.category}</div>
      ${matchingItems.map(item => `
        <div class="sheet-item">
          <div class="sheet-item-name">${item.name}</div>
          ${(item.examples || [{ label: 'Example', code: item.code || '' }]).map((example, exampleIndex) => `
            <div class="sheet-example">
              <div class="sheet-example-label"><span>${exampleIndex + 1}</span>${example.label || 'Example'}</div>
              <div class="sheet-item-code">
                <button class="copy-btn" title="Copy ${example.label || 'example'}" data-code="${encodeURIComponent(example.code || '')}">Copy</button>
                <pre style="margin: 0;">${example.code || ''}</pre>
              </div>
            </div>
          `).join('')}
          <div class="sheet-item-desc">${item.desc}</div>
        </div>
      `).join('')}
    `;

    // Attach copy listeners
    catCard.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const snippet = decodeURIComponent(btn.dataset.code || '');
        navigator.clipboard.writeText(snippet);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      });
    });

    elements.cheatsheetGrid.appendChild(catCard);
  });
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
}

function checkAllProgress() {
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
}

// XP Points & Streak Management
function addXP(points) {
  state.xp += points;
  localStorage.setItem('pylearn_xp', state.xp.toString());
  updateHeaderStats();
}

function updateHeaderStats() {
  elements.headerXp.textContent = `${state.xp} XP`;
  elements.headerStreak.textContent = `${state.streak} Day Streak`;
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
  if (e.key === 'Escape') window.closeProfileModal();
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

// Kickoff application
window.addEventListener('DOMContentLoaded', () => {
  initApp();
  initProfileModal();
});
