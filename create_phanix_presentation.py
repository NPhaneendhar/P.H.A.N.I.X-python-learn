"""Build an editable PowerPoint overview for the Phanix Python platform."""
import os
import time
import uno
from com.sun.star.beans import PropertyValue
from com.sun.star.awt import Point, Size


OUT = os.path.abspath("Phanix_Python_Learning_Platform.pptx")
LOGO = os.path.abspath("static/img/logo.png")

# LibreOffice uses 1/100 mm. 16:9 canvas.
W, H = 33867, 19050
NAVY = 0x07152B
CARD = 0x102647
BLUE = 0x178BFF
CYAN = 0x37D5FF
WHITE = 0xF5F9FF
MUTED = 0xB7C7DE
GREEN = 0x38D996
PURPLE = 0x9A7BFF
ORANGE = 0xFFB454


def prop(name, value):
    p = PropertyValue(); p.Name = name; p.Value = value
    return p


def rect(doc, page, x, y, w, h, color, radius=False):
    s = doc.createInstance("com.sun.star.drawing.RectangleShape")
    s.Position = Point(x, y); s.Size = Size(w, h)
    s.FillColor = color; s.LineStyle = 0
    if radius:
        s.CornerRadius = 450
    page.add(s)
    return s


def text(doc, page, content, x, y, w, h, size=24, color=WHITE, bold=False, align=0):
    s = doc.createInstance("com.sun.star.drawing.TextShape")
    s.Position = Point(x, y); s.Size = Size(w, h)
    s.String = content
    s.TextAutoGrowHeight = True
    s.TextWordWrap = True
    s.CharFontName = "Liberation Sans"
    s.CharHeight = size; s.CharColor = color; s.CharWeight = 150 if bold else 100
    s.ParaAdjust = align
    page.add(s)
    return s


def line(doc, page, x1, y1, x2, y2, color=BLUE, width=90):
    s = doc.createInstance("com.sun.star.drawing.LineShape")
    s.Position = Point(x1, y1); s.Size = Size(x2-x1, y2-y1)
    s.LineColor = color; s.LineWidth = width
    page.add(s)


def slide_base(doc, page, number, title, subtitle=""):
    rect(doc, page, 0, 0, W, H, NAVY)
    rect(doc, page, 0, 0, W, 210, BLUE)
    text(doc, page, "PHANIX  /  PYTHON LEARNING PLATFORM", 1450, 650, 15000, 650, 14, CYAN, True)
    text(doc, page, f"{number:02d}", 30100, 650, 1600, 600, 16, MUTED, True, 2)
    text(doc, page, title, 1450, 1750, 29000, 1250, 30, WHITE, True)
    if subtitle:
        text(doc, page, subtitle, 1450, 3080, 29200, 700, 16, MUTED)
    rect(doc, page, 1450, 17900, 30967, 45, 0x244263)


def card(doc, page, x, y, w, h, heading, body, accent=BLUE):
    rect(doc, page, x, y, w, h, CARD, True)
    rect(doc, page, x, y, 110, h, accent, True)
    text(doc, page, heading, x+550, y+420, w-900, 580, 18, WHITE, True)
    text(doc, page, body, x+550, y+1200, w-900, h-1400, 14.5, MUTED)


def add_logo(doc, page, x, y, w, h):
    if not os.path.exists(LOGO): return
    shape = doc.createInstance("com.sun.star.drawing.GraphicObjectShape")
    shape.Position = Point(x, y); shape.Size = Size(w, h)
    shape.GraphicURL = uno.systemPathToFileUrl(LOGO)
    page.add(shape)


def create():
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext("com.sun.star.bridge.UnoUrlResolver", local)
    ctx = resolver.resolve("uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext")
    desktop = ctx.ServiceManager.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    doc = desktop.loadComponentFromURL("private:factory/simpress", "_blank", 0, ())
    pages = doc.getDrawPages()

    # 1 — title
    p = pages.getByIndex(0); rect(doc,p,0,0,W,H,NAVY)
    rect(doc,p,0,0,1150,H,BLUE); rect(doc,p,1150,0,160,H,CYAN)
    add_logo(doc,p,2250,2650,3300,3300)
    text(doc,p,"PHANIX",6400,2950,18000,1100,20,CYAN,True)
    text(doc,p,"Learn Python by\ndoing, testing,\nand building.",6400,3950,22000,3400,40,WHITE,True)
    text(doc,p,"An interactive web platform for moving beginners from first syntax to practical projects.",6450,7800,19500,1150,18,MUTED)
    rect(doc,p,6450,10050,6500,950,CARD,True); text(doc,p,"WEB PLATFORM OVERVIEW",6900,10330,5600,300,14,CYAN,True,1)
    text(doc,p,"How it works  •  Key aspects  •  Learning advantages",6450,11900,19000,650,17,WHITE)
    text(doc,p,"Presentation",6450,16500,6000,450,14,MUTED)

    # helper for later pages
    def new(n,title,sub=""):
        p=pages.insertNewByIndex(pages.getCount()); slide_base(doc,p,n,title,sub); return p

    # 2
    p=new(2,"What is Phanix?","A beginner-friendly Python learning environment that combines explanation, practice, feedback, and progress tracking.")
    card(doc,p,1450,4600,9400,3900,"Structured learning","10 modules and 21 lessons guide learners from Python basics through OOP and mini-projects.",CYAN)
    card(doc,p,12200,4600,9400,3900,"Practice in context","Each lesson places a code editor and console next to the explanation, quiz, and challenge.",GREEN)
    card(doc,p,22950,4600,9400,3900,"Independent exploration","A playground, ready-made templates, cheat sheet, badges, and completion certificate support self-paced learning.",PURPLE)
    text(doc,p,"Core promise: learn a concept, try it immediately, see the result, then apply it.",1450,14300,30000,700,21,WHITE,True,1)

    # 3 workflow
    p=new(3,"How the learning flow works","The platform turns one lesson into a tight, repeatable learning cycle.")
    steps=[("1","Choose","Select a module and lesson from the curriculum."), ("2","Understand","Read a plain-language explanation and worked examples."), ("3","Check","Answer a quick quiz and receive immediate feedback."), ("4","Code","Edit and run Python directly in the browser workspace."), ("5","Prove","Run the challenge check, earn XP, and unlock progress.")]
    x=1450
    for i,(num,head,body) in enumerate(steps):
        rect(doc,p,x,5700,5300,3800,CARD,True)
        rect(doc,p,x+450,6150,850,850,BLUE if i<3 else GREEN,True)
        text(doc,p,num,x+450,6320,850,260,16,WHITE,True,1)
        text(doc,p,head,x+450,7400,4000,500,19,WHITE,True)
        text(doc,p,body,x+450,8150,4100,700,14,MUTED)
        if i<4: line(doc,p,x+5400,7600,x+5900,7600,CYAN,110)
        x+=6400
    text(doc,p,"Learn → retrieve → practice → receive feedback → progress",2500,13500,29000,700,22,CYAN,True,1)

    # 4 architecture
    p=new(4,"How the web application works","A simple client–server design keeps the interface responsive while Python code runs safely on the server.")
    card(doc,p,1800,5000,7600,4800,"1. Browser interface","Vanilla JavaScript renders the curriculum, editor, quiz, progress dashboard, and local saved state.",CYAN)
    card(doc,p,13100,5000,7600,4800,"2. Learning APIs","The server supplies curriculum and cheat-sheet data, and accepts requests to run or check code.",BLUE)
    card(doc,p,24400,5000,7600,4800,"3. Python execution","The backend writes code to a temporary file, runs it in a subprocess, captures output/errors, and applies a 3.5-second timeout.",GREEN)
    line(doc,p,9400,7400,13000,7400,CYAN,160); line(doc,p,20700,7400,24300,7400,CYAN,160)
    text(doc,p,"Frontend: HTML + CSS + JavaScript     |     Backend: Python standard library     |     Persistence: browser localStorage",1600,13750,30700,650,16,WHITE,True,1)

    # 5 aspects
    p=new(5,"Key aspects of the platform","The product is designed around a complete learning loop, not just a catalogue of tutorials.")
    cards=[("Curriculum","Basics → operators → control flow → data structures → functions → strings → errors → OOP → projects.",CYAN), ("Active coding","Editor supports run, reset, line numbers, indentation, console output, errors, and runtime feedback.",GREEN), ("Assessment","Every lesson includes a quick concept quiz; coding attempts can be checked for successful execution.",ORANGE), ("Reference & discovery","Searchable cheat sheet plus copyable snippets and line-by-line explanations reduce learner friction.",PURPLE), ("Motivation","XP, streaks, achievement badges, celebration effects, and a certificate make effort visible.",BLUE), ("Accessibility of use","No package installation is needed for the app itself; dark/light themes and responsive layouts support flexible use.",CYAN)]
    for i,(h,b,c) in enumerate(cards): card(doc,p,1450+(i%3)*10750,4450+(i//3)*4400,9700,3500,h,b,c)

    # 6 playground
    p=new(6,"Practice beyond the lesson","The Playground converts passive learning into experimentation.")
    card(doc,p,1600,4900,9800,6500,"Freeform sandbox","Learners can write any Python program, run it, and inspect stdout, stderr, and execution timing without affecting a lesson.",GREEN)
    card(doc,p,12600,4900,9800,6500,"Starter templates","Built-in examples include Fibonacci, QuickSort, palindrome checks, word-frequency analysis, and a text-adventure engine.",CYAN)
    card(doc,p,23600,4900,8200,6500,"Applied security examples","Forensic file hashing and log/IP threat extraction show Python in cybersecurity-flavoured contexts.",ORANGE)
    text(doc,p,"Why this matters: experimentation builds confidence—and confidence encourages more practice.",2600,14500,28600,650,20,WHITE,True,1)

    # 7 advantages
    p=new(7,"Advantages for learners","Phanix lowers the gap between “I understand it” and “I can write it.”")
    advantages=[("Immediate feedback","Run code and view output or errors while the idea is still fresh."),("Small, manageable steps","Short lessons, quizzes, and challenges prevent the curriculum from feeling overwhelming."),("Learning by doing","Coding tasks turn abstract syntax into an active skill."),("Safe failure","The timeout limits accidental infinite loops; learners can experiment without fear."),("Visible momentum","Progress, XP, badges, and streaks make regular effort tangible."),("Useful transfer","Templates and mini-projects connect Python concepts to realistic problems.")]
    for i,(h,b) in enumerate(advantages):
        x=1450+(i%2)*15750; y=4400+(i//2)*3500
        rect(doc,p,x,y,14300,2700,CARD,True); rect(doc,p,x+450,y+520,620,620,GREEN if i%2 else CYAN,True)
        text(doc,p,str(i+1),x+450,y+690,620,220,13,NAVY,True,1)
        text(doc,p,h,x+1450,y+500,11800,440,18,WHITE,True); text(doc,p,b,x+1450,y+1170,11500,800,14.5,MUTED)

    # 8 learner outcomes
    p=new(8,"What a learner can gain","The journey progresses from syntax confidence to problem-solving habits and portfolio-ready practice.")
    outcomes=[("Foundation","Variables, types, operators, conditionals, and loops."),("Fluency","Lists, dictionaries, functions, strings, and exception handling."),("Design thinking","Classes, objects, inheritance, debugging, and reusable code."),("Application","Password analysis, text statistics, inventory-style tasks, and custom playground experiments.")]
    for i,(h,b) in enumerate(outcomes):
        x=1700+i*7900
        rect(doc,p,x,6000,6700,4100,CARD,True); text(doc,p,f"STAGE {i+1}",x+500,6650,5600,350,13,CYAN,True); text(doc,p,h,x+500,7350,5600,500,20,WHITE,True); text(doc,p,b,x+500,8300,5600,900,14.5,MUTED)
        if i<3: line(doc,p,x+6700,8050,x+7750,8050,BLUE,130)
    text(doc,p,"Outcome: learners do not only recognize Python code—they practice planning, writing, testing, and improving it.",1700,14200,30500,800,19,WHITE,True,1)

    # 9 closing
    p=new(9,"Why Phanix is valuable","A focused platform for building practical Python confidence through repeated action and feedback.")
    rect(doc,p,2500,5000,28800,6800,CARD,True)
    text(doc,p,"EXPLAIN",4000,6200,5000,400,17,CYAN,True,1); text(doc,p,"TRY",10800,6200,5000,400,17,GREEN,True,1); text(doc,p,"CHECK",17600,6200,5000,400,17,ORANGE,True,1); text(doc,p,"GROW",24400,6200,5000,400,17,PURPLE,True,1)
    text(doc,p,"Simple lessons",4000,7100,5000,500,19,WHITE,True,1); text(doc,p,"Live code",10800,7100,5000,500,19,WHITE,True,1); text(doc,p,"Instant feedback",17600,7100,5000,500,19,WHITE,True,1); text(doc,p,"Visible progress",24400,7100,5000,500,19,WHITE,True,1)
    text(doc,p,"Phanix makes the learning process continuous: every explanation leads to an action, and every action creates feedback.",4200,9800,25500,900,20,MUTED,False,1)
    text(doc,p,"Thank you",13000,14800,8000,750,26,WHITE,True,1)

    url = uno.systemPathToFileUrl(OUT)
    doc.storeAsURL(url, (prop("FilterName", "Impress MS PowerPoint 2007 XML"),))
    doc.close(True)


if __name__ == "__main__":
    create()
