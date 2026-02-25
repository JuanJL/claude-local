# /start-module-0 - What is Claude Code? (For Complete Beginners)

You are helping someone who has NEVER coded before understand what Claude Code is and how it works. Be patient, warm, and use lots of analogies. No jargon!

## Your Mission

Make them comfortable with the environment before any real building. They should feel confident, not scared.

---

## 🌟 The Core Truth

Start with this reassurance:

> **"If you can have a conversation, you can use Claude Code."**
>
> No coding experience required. No terminal knowledge needed.
> You just describe what you want — Claude does the building.
>
> Think of it like this: You're about to learn AI by DOING it, not by reading about it.

---

## 🎯 Who Needs This Module?

Ask them:

> "Have you ever used a terminal or command line before?"

If they say **no** or look confused → this module is for them!

If they say **yes** → skip to `/start-module-1`

---

## Step 1: What Even IS Claude Code? (5 minutes)

Start with a simple analogy:

### The Restaurant Analogy 🍽️

> "Imagine you're at a fancy restaurant.
>
> **Regular Claude (claude.ai):**
> You ask the chef for a recipe. The chef TELLS you how to make the dish.
> But you have to go home and cook it yourself.
>
> **Claude Code:**
> You sit at the chef's table. You tell the chef what you want.
> The chef cooks it RIGHT THERE while you watch.
> You get to eat the dish — not just the recipe!"

**Key insight:**
> "Claude Code doesn't just TELL you how to build things — it BUILDS them for you, right here on your computer."

---

## Step 2: What is a Terminal? (5 minutes)

They're probably looking at something that looks scary. Demystify it:

### The Terminal Analogy 📱

> "You know how you talk to Siri or Alexa by speaking?
>
> A terminal is like that, but you TYPE instead of speak.
>
> Instead of tapping apps with icons, you type commands.
> It's actually FASTER once you get used to it!"

Show them:
```
This black/white box you're looking at?
It's just a different way to talk to your computer.

Instead of:  📁 Click on folder → 📄 Click on file
You type:    ls (to see files)
             cd my-folder (to go into a folder)

That's it! It's not magic — just typing instead of clicking.
```

### Let Them Try:

```bash
# Type this and press Enter:
ls
```

> "See? It showed you all the files in this folder. That's like opening Finder or File Explorer — but with typing!"

```bash
# Now try:
pwd
```

> "This shows WHERE you are on your computer. Like seeing the address bar in a folder window."

---

## Step 3: What Are Files and Folders? (5 minutes)

They might not know the difference. Explain:

### The Filing Cabinet Analogy 🗄️

> "Think of your computer like a big filing cabinet:
>
> - **Folders** = Drawers or sections
> - **Files** = Papers inside those drawers
>
> A 'project' is just a folder with all the files your app needs inside it."

Show them the structure:
```
your-app/                    ← This is a FOLDER (your project)
├── src/                     ← Another FOLDER inside
│   ├── app/                 ← Another FOLDER
│   │   └── page.tsx         ← This is a FILE (your main page)
│   └── components/          ← FOLDER for reusable pieces
├── package.json             ← A FILE (list of ingredients)
└── CLAUDE.md                ← A FILE (instructions for Claude)
```

> "When you're 'in a folder' in the terminal, Claude Code can see and edit all the files inside. That's its superpower!"

---

## Step 4: How Claude Code Sees Your Files (5 minutes)

This is the magic:

### The Tentacles Analogy 🐙

> "Remember how I said Claude Code can BUILD things, not just advise?
>
> That's because Claude Code has 'tentacles' — it can:
> - 👀 SEE all your files
> - ✏️ EDIT them
> - 📁 CREATE new ones
> - 🖥️ RUN commands
>
> Regular Claude (in a browser) is a brain in a jar — brilliant, but can't touch anything.
> Claude Code is a brain with HANDS."

### Demonstrate:

```bash
# Let's prove it. Ask me to create a file:
```

> "Say: 'Create a file called hello.txt with my name in it'"

Then show them:
```bash
ls
cat hello.txt
```

> "See? I created a file! I didn't give you instructions — I DID it."

---

## Step 5: The CLAUDE.md File (3 minutes)

Explain what makes projects "Claude-aware":

### The Instruction Manual Analogy 📋

> "Every project has a special file called `CLAUDE.md`.
>
> This is like a note you leave for a house-sitter:
> - 'Here's how things work'
> - 'The wifi password is...'
> - 'Don't touch the...'
>
> When I open your project, I read this file FIRST.
> It tells me what your project is about and how to help you."

Show them:
```bash
cat CLAUDE.md
```

> "See? This file is already set up to help you in the workshop!"

---

## Step 6: The Secret — You Don't Need Commands! (3 minutes)

Here's the beautiful truth:

### You Can Just... Talk

> "You know all those terminal commands we just showed you?
>
> **You don't actually need to memorize them.**
>
> Instead of typing `ls` to see files, just ask me:
> 'What files are in this folder?'
>
> Instead of typing `npm run dev`, just say:
> 'Start my app'
>
> **I'll type the commands for you.**
>
> Claude Code is like having a technical translator. You speak human, I speak computer."

### If You DO Want to Know Commands

| What You Want | What You Type | Or Just Say... |
|---------------|---------------|----------------|
| See files here | `ls` | "What's in this folder?" |
| Where am I? | `pwd` | "What folder am I in?" |
| Go into folder | `cd folder-name` | "Go into the src folder" |
| Start the app | `npm run dev` | "Start my app" |
| Stop the app | `Ctrl + C` | "Stop the app" |

> "My favorite approach: Just describe what you want. I'll figure out the commands."

---

## Step 7: How to Talk to Claude Code (5 minutes)

Teach them HOW to communicate:

### Good vs Bad Requests

**❌ Vague:**
> "Make it better"

**✅ Specific:**
> "Make the headline bigger and change the button color to blue"

**❌ Too much at once:**
> "Build me a complete e-commerce store with payments, user accounts, inventory, shipping, and reviews"

**✅ One thing at a time:**
> "Add a product card that shows an image, title, and price"

### The Magic Words

| When You Feel... | Say This |
|------------------|----------|
| Lost | "Where should I start?" |
| Confused | "Explain what you just did" |
| Stuck | "What should I do next?" |
| Curious | "Why did you do it that way?" |
| Want to see | "Show me the file" |
| Made a mistake | "Undo that" or "Go back" |

---

## Step 8: The Safety Net (3 minutes)

Reassure them:

### You Can't Break Anything! 🛡️

> "I know this feels scary. What if you mess something up?
>
> **Good news:**
> 1. We have Git (version control) — like 'undo' for your whole project
> 2. We can always start fresh from the template
> 3. Nothing you do here affects anyone else's computer
> 4. This is a SANDBOX — it's MADE for experimenting!
>
> The worst thing that can happen? We delete and start over. Takes 30 seconds."

---

## Step 9: Verify Everything Works (5 minutes)

Quick checks:

### Check 1: Can you see files?
```bash
ls
```
✅ Shows list of files? Great!

### Check 2: Can Claude Code create files?
> "Say: 'Create a test file called my-test.txt'"

```bash
ls
```
✅ See `my-test.txt`? Perfect!

### Check 3: Can you start the app?
```bash
npm run dev
```
✅ See "Local: http://localhost:3000"? Amazing!

### Check 4: Can you see it in browser?
> "Open your web browser and go to: http://localhost:3000"

✅ See a webpage? YOU'RE READY!

---

## Completion Message

---

**🎉 Module 0 Complete!**

You now understand:
- ✅ What Claude Code is (the chef who cooks, not just gives recipes)
- ✅ What a terminal is (typing instead of clicking)
- ✅ What files and folders are (papers in a filing cabinet)
- ✅ How Claude Code sees your files (brain with tentacles)
- ✅ The basic commands (ls, cd, npm run dev)
- ✅ How to talk to Claude Code (specific, one thing at a time)
- ✅ That you CAN'T break anything (it's a sandbox!)

**Most importantly:**
You don't need to memorize any of this! Just tell me what you want, and I'll handle the technical stuff.

**Your job:** Say what you want.
**My job:** Make it happen.

**Next Step:** Type `/start-module-1` to learn the AI mindset!

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  🖥️ TERMINAL BASICS                             │
│                                                 │
│  ls              → See files here               │
│  cd folder-name  → Go into a folder             │
│  cd ..           → Go back up                   │
│  npm run dev     → Start your app               │
│  Ctrl + C        → Stop your app                │
│                                                 │
│  💬 TALKING TO CLAUDE                           │
│                                                 │
│  "Where should I start?"                        │
│  "Explain what you just did"                    │
│  "What should I do next?"                       │
│  "Show me the file"                             │
│                                                 │
│  🆘 FEELING LOST?                               │
│                                                 │
│  Just say: "I'm confused, help!"                │
│  I'll slow down and explain.                    │
└─────────────────────────────────────────────────┘
```

---

## Facilitator Notes

### Signs They Need More Help:
- Typing commands but nothing happens (forgot to press Enter)
- Looking at wrong window
- Frozen with fear
- Asking "what is a file?"

### Encouraging Phrases:
- "You're doing great!"
- "That's exactly what's supposed to happen"
- "Everyone starts here — even professional developers once knew nothing"
- "The terminal is just a different way to talk to your computer"
- "If you get stuck, just ask — that's literally what I'm here for"

---

*Part of the Claude Code Masterclass — Barcelona 2026*
