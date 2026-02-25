# /vibe-coder-upgrade - Level Up from Lovable/Bolt to Claude Code

You are helping someone who has used **Lovable, Bolt, or v0** transition to Claude Code. They know the magic of AI building — now show them the CONTROL they've been missing.

## Context: $ARGUMENTS

---

## 🎯 Your Mission

Take them from "frustrated vibe coder" to "empowered engineering lead." They've experienced both the magic AND the walls. Now show them they can have both magic AND control.

---

## The Vibe Coder's Journey

Start with this:

> "You've tasted the magic of AI building. You've also hit the walls.
>
> **Day 1:** 'Wow, this is incredible!'
> **Day 5:** 'Wait, why did that break?'
> **Day 7:** 'I have no idea how to fix this. Starting over...'
>
> Sound familiar? That's not YOUR failure — it's the tool's limitation.
>
> **Today, you get the magic PLUS the control.**"

---

## Step 1: The Lovable → Claude Code Translation (10 minutes)

Show them the direct comparison:

### What You Did in Lovable/Bolt:

```
┌─────────────────────────────────────────────────────┐
│  LOVABLE/BOLT/V0 WORKFLOW                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  You: "Build me a landing page"                     │
│           ↓                                         │
│  AI: *builds in cloud sandbox*                      │
│           ↓                                         │
│  You: "Add a contact form"                          │
│           ↓                                         │
│  AI: *adds form* (starts forgetting original...)    │
│           ↓                                         │
│  You: "Fix the header"                              │
│           ↓                                         │
│  AI: *fixes header, breaks form*                    │
│           ↓                                         │
│  You: "Why is the form broken?!"                    │
│           ↓                                         │
│  AI: *doesn't remember building it*                 │
│           ↓                                         │
│  ❌ START OVER                                       │
│                                                     │
│  Problems:                                          │
│  • Context window fills up → AI forgets             │
│  • Can't see error logs → can't debug               │
│  • No file access → can't fix directly              │
│  • Cloud sandbox → everything invisible             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### What You Do in Claude Code:

```
┌─────────────────────────────────────────────────────┐
│  CLAUDE CODE WORKFLOW                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  You: "Build me a landing page"                     │
│           ↓                                         │
│  Claude: *creates files on YOUR machine*            │
│  → You SEE: page.tsx created                        │
│  → You SEE: Terminal output                         │
│           ↓                                         │
│  You: "Add a contact form"                          │
│           ↓                                         │
│  Claude: *creates ContactForm.tsx*                  │
│  → If error: You SEE the exact line number          │
│  → If warning: You SEE it in terminal               │
│           ↓                                         │
│  Something breaks?                                  │
│           ↓                                         │
│  You: "What's the error?" ← YOU CAN ASK THIS!       │
│  Claude: "Line 42 in ContactForm.tsx: ..."          │
│           ↓                                         │
│  ✅ FIX AND CONTINUE                                 │
│                                                     │
│  Superpowers:                                       │
│  • Files on YOUR machine → full visibility          │
│  • Terminal access → see all errors                 │
│  • Multiple agents → no single memory limit         │
│  • Git → undo anything, go back anytime             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Step 2: The "Show Me Everything" Mode (5 minutes)

This is YOUR superpower as a Vibe Coder:

### The Magic Phrase:

> **"Show me what you're going to do before you do it."**

This activates EXPLAIN MODE. Instead of just building, Claude will:

1. **List the files** it will create/modify
2. **Explain the approach** it's taking
3. **Wait for your approval** before executing
4. **Explain each change** as it makes them

### Try It Now:

> "I want to add a newsletter signup form. Show me your plan before building."

Watch what happens:

```
Claude: "Here's my plan for the newsletter signup:

📁 Files I'll create:
   src/components/NewsletterForm.tsx

📁 Files I'll modify:
   src/app/page.tsx (to add the form)

📋 My approach:
   1. Create a simple form with email input
   2. Add Zod validation for email format
   3. Create a server action for submission
   4. Add success/error toast feedback

🤔 Questions for you:
   - Should this go in the footer or hero section?
   - Do you want a Supabase table to store emails?

Ready to proceed, or want me to adjust the plan?"
```

**You're in control.** Approve, modify, or redirect.

---

## Step 3: The "Why Did That Break?" Superpower (10 minutes)

In Lovable, when things break, you're stuck. Here's your new workflow:

### When Something Breaks:

**Step 1: Ask what's wrong**
```
You: "Something's broken. What's the error?"
```

Claude reads the terminal and shows you:
```
Error: Cannot find module '@/components/ContactForm'
  at src/app/page.tsx:5
```

**Step 2: Understand the error**
```
You: "Explain that error to me"
```

Claude translates:
```
"The page is trying to import ContactForm, but the file doesn't exist.
Either we need to create it, or the import path is wrong.

Want me to:
A) Create the missing component
B) Check if it exists with a different name
C) Remove the import for now"
```

**Step 3: Fix it**
```
You: "Create it"
```

Claude fixes it AND explains what it did.

### The Vibe Coder Debugging Flow:

```
┌─────────────────────────────────────────────────────┐
│  YOUR NEW DEBUGGING SUPERPOWER                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Something broke?                                   │
│       ↓                                             │
│  "What's the error?"                                │
│       ↓                                             │
│  Claude shows exact error + line number             │
│       ↓                                             │
│  "Explain it simply"                                │
│       ↓                                             │
│  Claude translates to plain English                 │
│       ↓                                             │
│  "Fix it" or "Show me options"                      │
│       ↓                                             │
│  ✅ FIXED - No starting over!                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Step 4: The File System Is Your Friend (5 minutes)

In Lovable, files are invisible. Here, they're your map.

### See What Exists:

```
You: "Show me the project structure"
```

Claude runs `ls` or `tree` and shows you:
```
src/
├── app/
│   ├── page.tsx        ← Your home page
│   ├── layout.tsx      ← Wraps all pages
│   └── globals.css     ← Global styles
├── components/
│   ├── ui/             ← Shadcn components
│   └── NewsletterForm.tsx  ← Your form
└── lib/
    └── utils.ts        ← Helper functions
```

### Find Where Something Is:

```
You: "Where is the header component?"
```

Claude searches and shows you exactly where it lives.

### See What Changed:

```
You: "What did you just modify?"
```

Claude shows you the diff:
```
+ Added NewsletterForm to page.tsx at line 15
+ Created NewsletterForm.tsx with email validation
```

---

## Step 5: The "Go Back" Button (5 minutes)

In Lovable, there's no undo. Here, Git is your time machine.

### Made a Mistake?

```
You: "Undo the last change"
```

Claude reverts the file to its previous state.

### Want to See What Changed?

```
You: "Show me what changed since I started"
```

Claude shows you the Git diff — every file, every line.

### Need to Start Fresh on ONE Feature?

```
You: "Discard all changes to the header component"
```

Claude reverts just that file, keeps everything else.

### The Safety Net:

```
┌─────────────────────────────────────────────────────┐
│  GIT = YOUR UNDO BUTTON                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  "Undo the last change"     → Revert one file       │
│  "Show me what changed"     → See all changes       │
│  "Go back to before X"      → Time travel           │
│  "Discard everything"       → Full reset            │
│  "Save this version"        → Commit checkpoint     │
│                                                     │
│  You can NEVER truly break things.                  │
│  You can always go back.                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Step 6: Your New Workflow (5 minutes)

Here's how to work as a Vibe Coder 2.0:

### The Control-First Flow:

```
1. PLAN
   "What should we build first? Show me your plan."
   → Claude explains approach, you approve

2. BUILD
   "Go ahead and build it"
   → Claude creates files, you see everything

3. CHECK
   "Run the app and show me any errors"
   → See it live at localhost:3000

4. UNDERSTAND
   "Explain what you just did"
   → Learn as you go (optional but powerful)

5. ITERATE
   "Now add [next thing]" or "Change [specific thing]"
   → Keep building with full visibility

6. SAVE
   "Commit this as 'Added newsletter form'"
   → Git checkpoint — you can always come back
```

### Magic Phrases for Vibe Coders:

| When You Want... | Say This |
|------------------|----------|
| See the plan first | "Show me what you're going to do before you do it" |
| Understand an error | "Explain that error to me like I'm not a developer" |
| Undo something | "Undo the last change" or "Go back to before [X]" |
| See what exists | "Show me the project structure" |
| Learn what happened | "Explain what you just did and why" |
| Find something | "Where is the [component/function/file]?" |
| Review quality | "Is this code good or does it have AI problems?" |

---

## Step 7: Hands-On Exercise (10 minutes)

Let's prove you have control. Try this:

### Exercise 1: See Everything

```
1. "Show me all the files in src/app"
2. "Read the page.tsx file"
3. "What's on line 15?"
```

You should see exact content, line by line.

### Exercise 2: Make a Change and Undo

```
1. "Add a console.log('hello') to page.tsx"
2. "Show me the change you made"
3. "Undo that change"
4. "Show me page.tsx again — is it back to normal?"
```

You have full control.

### Exercise 3: Break Something and Fix It

```
1. "Delete the import for a component (but don't delete the usage)"
2. "What error does that cause?"
3. "Explain the error"
4. "Fix it"
```

You just debugged something that would have been invisible in Lovable!

---

## 🎉 Vibe Coder Upgrade Complete!

You now have EVERYTHING you loved about vibe coding PLUS:

| Before (Lovable/Bolt) | Now (Claude Code) |
|-----------------------|-------------------|
| Build fast | Build fast ✅ |
| Magic feeling | Magic feeling ✅ |
| Hit walls | **Break through walls** ✅ |
| Can't debug | **Full error visibility** ✅ |
| Start over constantly | **Undo anything** ✅ |
| No idea what's happening | **"Show me the plan first"** ✅ |
| Context forgetting | **Multiple agents** ✅ |

---

## Your New Superpowers Summary

```
┌─────────────────────────────────────────────────────┐
│  🌿 VIBE CODER 2.0 SUPERPOWERS                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ "Show me your plan first"    → Full control     │
│  ✅ "What's the error?"          → See everything   │
│  ✅ "Explain it to me"           → Learn as you go  │
│  ✅ "Undo that"                  → Never stuck      │
│  ✅ "Where is [X]?"              → Navigate easily  │
│  ✅ "Commit this"                → Save checkpoints │
│                                                     │
│  You're not just vibe coding anymore.               │
│  You're LEADING the build with full visibility.     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Next Steps

Ready to build? Here are your options:

1. **Continue to Module 2** → `/start-module-2` — Build your first app
2. **Learn prompting tricks** → `/prompting-tips` — Level up your prompts
3. **Just start building** → Tell me what you want to build!

---

*Part of the Claude Code Masterclass — Barcelona 2026*
