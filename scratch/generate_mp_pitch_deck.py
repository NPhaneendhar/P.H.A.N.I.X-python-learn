"""
Generate a high-impact, professional PowerPoint presentation for presenting
the PHANIX Python Learning Platform to a Member of Parliament (MP) / Educational Policymaker.
Focus: Empowering Science & STEM Students, NEP 2020 alignment, and Youth Skill Development.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

OUTPUT_FILE = "Phanix_Python_Science_Education_MP_Pitch.pptx"
LOGO_PATH = "static/img/logo.png"

# Color Palette: Modern Executive Tech
NAVY = RGBColor(7, 21, 43)          # #07152B Primary Dark Canvas
CARD_BG = RGBColor(16, 38, 71)       # #102647 Card Container
BLUE = RGBColor(10, 132, 255)        # #0A84FF Apple / Cyan Blue Accent
CYAN = RGBColor(56, 217, 150)        # #38D996 Green / Mint Accent
GOLD = RGBColor(255, 180, 84)        # #FFB454 Amber / Gold Highlight
WHITE = RGBColor(245, 249, 255)      # Primary Text
MUTED = RGBColor(183, 199, 222)      # Secondary Text
BORDER = RGBColor(30, 60, 100)       # Subtle Border

def set_slide_background(slide):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = NAVY

def add_header(slide, slide_num, title, subtitle):
    # Top Tag
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.4))
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = f"P.H.A.N.I.X PLATFORM · NATIONAL EDUCATION & STEM INITIATIVE · SLIDE {slide_num:02d}"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = BLUE
    p.font.name = "Arial"

    # Main Title
    txBox2 = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.7))
    tf2 = txBox2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = title
    p2.font.size = Pt(22)
    p2.font.bold = True
    p2.font.color.rgb = WHITE
    p2.font.name = "Arial"

    # Subtitle
    if subtitle:
        p3 = tf2.add_paragraph()
        p3.text = subtitle
        p3.font.size = Pt(11)
        p3.font.color.rgb = MUTED
        p3.font.name = "Arial"

def add_card(slide, left, top, width, height, title, body_bullets, accent_color=BLUE, badge=""):
    # Background Box
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = CARD_BG
    shape.line.color.rgb = accent_color
    shape.line.width = Pt(1.2)

    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)
    tf.margin_top = Inches(0.22)
    tf.margin_bottom = Inches(0.2)

    # Optional Badge
    if badge:
        p_badge = tf.paragraphs[0]
        p_badge.text = badge.upper()
        p_badge.font.size = Pt(8.5)
        p_badge.font.bold = True
        p_badge.font.color.rgb = accent_color
        p_badge.font.name = "Arial"
        p_title = tf.add_paragraph()
    else:
        p_title = tf.paragraphs[0]

    p_title.text = title
    p_title.font.size = Pt(14)
    p_title.font.bold = True
    p_title.font.color.rgb = WHITE
    p_title.font.name = "Arial"

    for bullet in body_bullets:
        p_b = tf.add_paragraph()
        p_b.text = f"• {bullet}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = MUTED
        p_b.font.name = "Arial"
        p_b.space_before = Pt(4)

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # =========================================================================
    # SLIDE 1: Title Slide (Grand Vision)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Accent decorative box
    banner = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(11.73), Inches(0.08))
    banner.fill.solid()
    banner.fill.fore_color.rgb = BLUE
    banner.line.fill.background()

    # Title text frame
    t_box = slide1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.73), Inches(3.2))
    tf1 = t_box.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "EMPOWERING SCIENCE STUDENTS WITH COMPUTATIONAL POWER"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN
    p.font.name = "Arial"

    p2 = tf1.add_paragraph()
    p2.text = "PHANIX: Interactive Python Learning Platform"
    p2.font.size = Pt(34)
    p2.font.bold = True
    p2.font.color.rgb = WHITE
    p2.font.name = "Arial"
    p2.space_before = Pt(6)

    p3 = tf1.add_paragraph()
    p3.text = "A 100% Free, Zero-Installation Web Platform Bridging Modern Science, Coding & Digital Forensics"
    p3.font.size = Pt(15)
    p3.font.color.rgb = MUTED
    p3.font.name = "Arial"
    p3.space_before = Pt(8)

    # 3 Metric Highlights at bottom
    add_card(slide1, Inches(0.8), Inches(4.8), Inches(3.7), Inches(2.0),
             "Zero Installation Barrier",
             ["Runs entirely in any browser (Phone, Tablet, Lab PC)",
              "No expensive software or admin access needed",
              "Works even on low-cost rural computer labs"],
             CYAN, "Accessibility")

    add_card(slide1, Inches(4.8), Inches(4.8), Inches(3.7), Inches(2.0),
             "Practical Science Focus",
             ["Calculations for Physics, Chemistry & Biology",
              "Data analysis, statistical charts & algorithms",
              "Pre-loaded templates for real science experiments"],
             BLUE, "Curriculum")

    add_card(slide1, Inches(8.8), Inches(4.8), Inches(3.7), Inches(2.0),
             "Created for Public Impact",
             ["Developed by Phaneendhar Nittala",
              "Integrated with live Cyber Security & Forensic suites",
              "Ready for immediate pilot across schools & colleges"],
             GOLD, "Atmanirbhar Bharat")

    # =========================================================================
    # SLIDE 2: The Core Problem in Science Education Today
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, 2, "The Crisis in Traditional Science Education",
               "Why rote learning and blackboard science are failing our youth in the 21st century.")

    add_card(slide2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "1. Theoretical Theory vs. Real Computation",
             ["Students memorize formulas (E=mc², stoichiometry, genetics) on paper without seeing them dynamically simulated.",
              "Global science is 90% computer-driven today; students without Python coding skills fall behind internationally.",
              "Lack of practical problem-solving creates unemployable graduates."],
             GOLD, "The Problem")

    add_card(slide2, Inches(6.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "2. The Software & Hardware Divide",
             ["Commercial tools (MATLAB, LabVIEW) cost thousands of dollars per license, unaffordable for public institutions.",
              "Installing Python, Anaconda, and compilers requires high-end PCs and technical IT support that rural schools lack.",
              "Students without laptops cannot practice at home."],
             GOLD, "The Barrier")

    add_card(slide2, Inches(0.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "3. How PHANIX Solves It Instantly",
             ["100% Free & Open Web Access: Zero installation, runs on any web browser with instant click-to-run execution.",
              "Safe Sandboxed Environment: Students experiment without fear of breaking computer files or getting viruses.",
              "Instant Visual Feedback: Code outputs, line-by-line explanations, and automated grading in real time."],
             CYAN, "The Solution")

    add_card(slide2, Inches(6.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "4. Direct Alignment with NEP 2020",
             ["Directly implements the National Education Policy mandate for coding and experiential learning from Class 6 onwards.",
              "Equips students in government institutions with high-demand 21st-century technological skills.",
              "Promotes scientific inquiry, computational logic, and research aptitude."],
             BLUE, "Policy Alignment")

    # =========================================================================
    # SLIDE 3: How Science Students Learn from PHANIX (Discipline by Discipline)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, 3, "Applied Science in Action: How Students Learn",
               "Transforming abstract textbook equations into living, interactive digital experiments.")

    add_card(slide3, Inches(0.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "⚛️ Physics",
             ["Simulating projectile trajectories and gravity equations.",
              "Harmonic oscillation & wave frequency modeling.",
              "Calculating orbital velocity and escape speeds.",
              "Automating Ohm's law and circuit resistances.",
              "Direct numerical proof of physical laws."],
             BLUE, "Physical Sciences")

    add_card(slide3, Inches(3.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "🧪 Chemistry",
             ["Calculating molecular weights and stoichiometry ratios.",
              "Radioactive decay & half-life exponential curves.",
              "pH balance and titration curve simulations.",
              "Gas law calculations (PV=nRT) with varying inputs.",
              "Automating lab titration calculations."],
             CYAN, "Chemical Sciences")

    add_card(slide3, Inches(6.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "🧬 Biology & Genetics",
             ["DNA & RNA nucleotide sequence counters (A, T, G, C).",
              "Calculating GC-content ratio for genetic stability.",
              "Simulating Mendelian inheritance & Punnett squares.",
              "Bacterial population growth rate models.",
              "Introduction to modern Bioinformatics!"],
             GOLD, "Life Sciences")

    add_card(slide3, Inches(9.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "🛡️ Forensics & Cyber",
             ["Cryptographic hashing of evidence (SHA-256, MD5).",
              "Tamper verification & file integrity tracking.",
              "Extracting IP addresses & threat indicators from logs.",
              "Real-world connection to Nittala Forensic Suite.",
              "Career pathway into Cyber Defense & Forensics."],
             WHITE, "Forensic Tech")

    # =========================================================================
    # SLIDE 4: Platform Architecture & Interactive Features
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, 4, "Platform Features: Built for Maximum Engagement",
               "A complete ecosystem uniting curriculum, code editor, automated testing, and reference.")

    add_card(slide4, Inches(0.8), Inches(1.8), Inches(3.7), Inches(2.5),
             "Structured 10-Module Curriculum",
             ["21 guided interactive lessons covering Python fundamentals to OOP.",
              "Bite-sized theory with code examples and line explanations.",
              "Immediate interactive quiz at the end of every lesson.",
              "Zero intimidation for first-time learners."],
             BLUE, "Curriculum Engine")

    add_card(slide4, Inches(4.8), Inches(1.8), Inches(3.7), Inches(2.5),
             "In-Browser Code Playground",
             ["Live Python execution with terminal console output.",
              "Safe execution timeout protection against infinite loops.",
              "Support for interactive user input() and data streams.",
              "Pre-loaded algorithm and scientific templates."],
             CYAN, "Live Execution")

    add_card(slide4, Inches(8.8), Inches(1.8), Inches(3.7), Inches(2.5),
             "Automated Code Challenges",
             ["Real-world programming challenges with automated unit tests.",
              "Instant feedback: tests edge cases and algorithm correctness.",
              "Tiered difficulty: Beginner to Advanced.",
              "Builds real engineering problem-solving muscle."],
             GOLD, "Automated Testing")

    add_card(slide4, Inches(0.8), Inches(4.6), Inches(3.7), Inches(2.4),
             "Master 12-Category Cheat Sheet",
             ["Comprehensive reference guide with 60+ categorized topics.",
              "Quick-search bar with instant syntax filtering.",
              "One-click '⚡ Try in Playground' directly from reference.",
              "Covers strings, regex, APIs, files, and cryptography."],
             WHITE, "Instant Reference")

    add_card(slide4, Inches(4.8), Inches(4.6), Inches(3.7), Inches(2.4),
             "Gamification & Motivation",
             ["Experience Points (XP) earned for every completed task.",
              "Daily learning streak tracker to build daily habits.",
              "Unlockable achievement badges celebrating mastery.",
              "Confetti celebrations on solving tough challenges."],
             CYAN, "Student Engagement")

    add_card(slide4, Inches(8.8), Inches(4.6), Inches(3.7), Inches(2.4),
             "Verifiable Certificate of Mastery",
             ["Official certificate generated dynamically upon completion.",
              "Recognizes student effort and practical coding skills.",
              "Shareable on LinkedIn, resumes, and academic portfolios.",
              "Gives tangible career motivation to students."],
             BLUE, "Career Readiness")

    # =========================================================================
    # SLIDE 5: Real-World Industry Transfer & Security Ecosystem
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, 5, "Beyond Basics: Transfer to National Security & Cyber",
               "How students transition from classroom coding to real-world security platforms.")

    add_card(slide5, Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "🛡️ Nittala Forensic Suite",
             ["Live production web platform: nittala-forensic-suite.vercel.app",
              "Built for real-time security log investigation and network audit.",
              "Malicious IP triage, forensic memory analysis, and threat correlation.",
              "Students see how Python powers real cyber defense software.",
              "Demonstrates practical cyber security careers for youth."],
             GOLD, "Flagship Project")

    add_card(slide5, Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "🔍 PHANIX Investigation Expert",
             ["Automated digital evidence extraction & chain of custody framework.",
              "Integrates Open Source Intelligence (OSINT) and threat feeds.",
              "Teaches evidence integrity, hashing, and digital court compliance.",
              "Direct application for police, judicial, and forensic trainees.",
              "Inspires students to build indigenous security tools."],
             BLUE, "Digital Forensics")

    add_card(slide5, Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0),
             "📱 Forensic QR Architect",
             ["Cryptographic QR generator with tamper-verification algorithms.",
              "Reed-Solomon error correction and cryptographic hashes.",
              "Applied data encoding for secure government documents.",
              "Highlights data privacy and tamper-proofing technology.",
              "Proves youth can build enterprise-grade software."],
             CYAN, "Applied Cryptography")

    # =========================================================================
    # SLIDE 6: Societal Impact & Demographic Reach in Constituency
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, 6, "Societal Impact & Democratic Access in Your Constituency",
               "Reaching the most underserved students with zero government expenditure on licenses.")

    add_card(slide6, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "1. Zero License Cost to Public Treasury",
             ["Commercial coding platforms charge ₹3,000–₹10,000 per student annually.",
              "PHANIX is built on open standards with zero external licensing fees.",
              "Can be deployed across 100+ schools and degree colleges at zero incremental software cost.",
              "Saves crores in public education budgets while delivering superior quality."],
             CYAN, "Public Value")

    add_card(slide6, Inches(6.8), Inches(1.8), Inches(5.6), Inches(2.4),
             "2. Bridging the Rural & Urban Divide",
             ["Students in rural and tier-2/3 institutions often lack expensive PCs.",
              "PHANIX runs smoothly on low-bandwidth connections and basic mobile browsers.",
              "A village student with a smartphone has the exact same learning experience as an urban elite school student.",
              "True democratization of technological education."],
             BLUE, "Digital Inclusion")

    add_card(slide6, Inches(0.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "3. Direct Employment & Startup Readiness",
             ["Python is the #1 demanded programming language in India and globally (AI, Data Science, Cyber).",
              "Science graduates with Python earn 2x to 3x higher starting salaries than non-coding peers.",
              "Provides practical skills required for IT, research labs, defence, and tech startups.",
              "Transforms educated youth into skilled, employable contributors."],
             GOLD, "Youth Employment")

    add_card(slide6, Inches(6.8), Inches(4.5), Inches(5.6), Inches(2.4),
             "4. Fostering Indigenous Tech (Atmanirbhar)",
             ["Encourages local students to build homegrown solutions rather than relying on foreign software.",
              "Cultivates talent in strategic sectors: Cyber Security, Forensics, and Scientific Computing.",
              "Positions the constituency as a pioneer in STEM education excellence in the state."],
             WHITE, "National Pride")

    # =========================================================================
    # SLIDE 7: Pilot Action Plan & Proposed Implementation
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide7)
    add_header(slide7, 7, "Action Plan: Pilot Implementation in the Constituency",
               "A clear, 4-phase rollout requiring zero complex IT infrastructure.")

    add_card(slide7, Inches(0.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "Phase 1: Pilot",
             ["Select 5 Government Degree Colleges and Higher Secondary Schools.",
              "100 science students in pilot cohort.",
              "Zero hardware procurement needed; utilize existing computer labs or phones.",
              "Duration: 4 Weeks.",
              "Goal: Validate engagement & feedback."],
             BLUE, "Month 1")

    add_card(slide7, Inches(3.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "Phase 2: Training",
             ["Conduct 1-Day Teacher & Lecturer Enablement Workshop.",
              "Equip science faculty with Python experiment templates.",
              "Establish student PHANIX Coding Ambassadors in each institution.",
              "Provide continuous mentor support.",
              "Goal: Faculty self-reliance."],
             CYAN, "Month 2")

    add_card(slide7, Inches(6.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "Phase 3: Scale",
             ["Expand to all Junior & Degree Colleges across the constituency.",
              "Integrate PHANIX weekly coding hours into science lab schedules.",
              "Host Constituency-Level Science Coding Hackathon.",
              "Award top student projects under MP patronage.",
              "Goal: District-wide youth movement."],
             GOLD, "Month 3-4")

    add_card(slide7, Inches(9.8), Inches(1.8), Inches(2.8), Inches(5.0),
             "Phase 4: Impact",
             ["Measure learning gains: quiz scores, projects built, certificates earned.",
              "Publish Constituency STEM Excellence Report.",
              "Present model to State Education Ministry for statewide adoption.",
              "Showcase the constituency as a national digital model.",
              "Goal: Long-term policy legacy."],
             WHITE, "Month 5+")

    # =========================================================================
    # SLIDE 8: The Ask / Conclusion
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide8)

    # Accent decorative box
    banner = slide8.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(11.73), Inches(0.08))
    banner.fill.solid()
    banner.fill.fore_color.rgb = CYAN
    banner.line.fill.background()

    t_box8 = slide8.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.73), Inches(1.5))
    tf8 = t_box8.text_frame
    tf8.word_wrap = True
    p_8 = tf8.paragraphs[0]
    p_8.text = "THE PROPOSAL: PARTNERING TO EMPOWER OUR YOUTH"
    p_8.font.size = Pt(28)
    p_8.font.bold = True
    p_8.font.color.rgb = WHITE
    p_8.font.name = "Arial"

    p_sub = tf8.add_paragraph()
    p_sub.text = "Together, we can give every science student in this constituency the tools to lead India's technological future."
    p_sub.font.size = Pt(13)
    p_sub.font.color.rgb = MUTED
    p_sub.font.name = "Arial"
    p_sub.space_before = Pt(4)

    add_card(slide8, Inches(0.8), Inches(3.2), Inches(5.6), Inches(3.6),
             "What We Bring (Ready Today)",
             ["Complete, fully functioning interactive web platform (PHANIX).",
              "Comprehensive 10-module curriculum and 12-category scientific cheat sheet.",
              "Zero licensing cost, zero installation, cloud-ready architecture.",
              "End-to-end technical leadership by creator Phaneendhar Nittala.",
              "Proven forensic and security tools built by indigenous talent."],
             CYAN, "Our Commitment")

    add_card(slide8, Inches(6.8), Inches(3.2), Inches(5.6), Inches(3.6),
             "What We Request from Hon'ble MP",
             ["Official patronage and recommendation letter to District Education Officers (DEO) & College Principals.",
              "Inauguration of a 5-college Science & Coding Pilot Initiative.",
              "Support for hosting an annual Constituency Youth STEM & Coding Exhibition.",
              "Joint mission to make this constituency the #1 digitally empowered district in the state."],
             GOLD, "The Partnership")

    prs.save(OUTPUT_FILE)
    print(f"Successfully generated presentation: {OUTPUT_FILE} ({len(prs.slides)} slides)")

if __name__ == "__main__":
    build_presentation()
