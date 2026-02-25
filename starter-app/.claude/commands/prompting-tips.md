# /prompting-tips - How to Talk to Claude Code Like a Pro

You are teaching the user how to prompt effectively. Be encouraging and give practical examples they can use immediately.

## Context: $ARGUMENTS

---

## 🎯 The Golden Rules

Before diving into specifics, here are the fundamentals:

### Rule 1: Be Specific, Not Vague
```
❌ "Make it look better"
✅ "Add more whitespace, larger fonts, lime green accent"
```

### Rule 2: State Intent, Not Implementation
```
❌ "Add a useState hook"
✅ "Users should be able to toggle dark mode"
```

### Rule 3: One Thing at a Time
```
❌ "Build the whole dashboard with charts, settings, and admin"
✅ "Let's start with the dashboard layout. Just sidebar and main area."
```

### Rule 4: Give Context
```
"We're building a B2B SaaS with minimal design.
 Using Next.js, Tailwind, Supabase.
 Build a task card showing title, assignee, due date."
```

---

## 🛠️ Which Tool Should I Use?

Not sure which command or approach fits your situation? Use this decision tree:

```
┌─────────────────────────────────────────────────────────────┐
│  🤔 WHAT DO YOU WANT TO DO?                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 PLANNING & RESEARCH                                     │
│  ─────────────────────────                                  │
│  "I have an idea but need to research it"                   │
│       → /product-discovery                                  │
│                                                             │
│  "I know what to build, need a structured plan"             │
│       → /epic-create                                        │
│                                                             │
│  "I have an Epic, need to break it into features"           │
│       → /plan-features                                      │
│                                                             │
│  "I have features, need detailed specs"                     │
│       → /enrich-features                                    │
│                                                             │
│  🏗️ BUILDING                                                │
│  ────────────                                               │
│  "I want to build a specific GitHub issue"                  │
│       → /work-on #3                                         │
│                                                             │
│  "I need a form with validation"                            │
│       → /form-builder                                       │
│                                                             │
│  "I need auth, payments, or database"                       │
│       → /product-builder                                    │
│                                                             │
│  "I want to build multiple features at once"                │
│       → /parallel-build (experienced only)                  │
│                                                             │
│  🎨 DESIGN & QUALITY                                        │
│  ─────────────────────                                      │
│  "My UI looks generic/AI-generated"                         │
│       → /redesign                                           │
│                                                             │
│  "I want to check code quality"                             │
│       → /code-review                                        │
│                                                             │
│  🚀 SHIPPING                                                │
│  ──────────                                                 │
│  "I'm ready to deploy"                                      │
│       → /ship                                               │
│                                                             │
│  🆘 HELP                                                    │
│  ──────                                                     │
│  "Something is broken"                                      │
│       → /fix-errors                                         │
│                                                             │
│  "I don't know what to do next"                             │
│       → "What should I do next?"                            │
│                                                             │
│  "I want to learn how to prompt better"                     │
│       → /prompting-tips (you're here!)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 Agent Activation Cheatsheet

You don't need to name agents explicitly. Just describe what you want, and the right specialist activates automatically:

```
┌─────────────────────────────────────────────────────────────┐
│ WHAT YOU WANT              │ SAY THIS                       │
├─────────────────────────────────────────────────────────────┤
│ Plan features              │ "Help me plan..."              │
│ Write user stories         │ "Break this into features..."  │
│ Build UI components        │ "Build a [component] that..."  │
│ Make it look premium       │ "This looks AI-generated..."   │
│ Add animations             │ "Add a subtle hover effect..." │
│ Set up database            │ "Set up Supabase for..."       │
│ API endpoints              │ "Create an endpoint for..."    │
│ Code quality check         │ "Review this for issues"       │
│ Security audit             │ "Check for vulnerabilities"    │
└─────────────────────────────────────────────────────────────┘
```

**The key insight:** You don't need to name the agent. Just describe what you want, and the right specialist activates automatically.

---

## ⚡ Parallel Building Guide

Want maximum speed? Build multiple features simultaneously. But be careful — this is an advanced technique!

### When to Go Parallel

```
✅ SAFE (different files):
   - Auth (/auth/*) + Dashboard (/dashboard/*)
   - Settings page + Analytics page
   - Header component + Footer component

❌ RISKY (same files):
   - Two features modifying navbar
   - Both need layout.tsx changes
   - Both touch the same database table
```

### How to Set Up Parallel Building

**Step 1: Identify independent features**
```
You: "Which of my features can be built in parallel without conflicts?"
```

Claude will analyze and tell you which features touch different files.

**Step 2: Set up git worktrees**
```
You: "Set up git worktrees for: auth, dashboard, settings"
```

This creates separate folders, each on its own branch.

**Step 3: Open multiple terminals**
```
Terminal 1: cd my-app-auth
Terminal 2: cd my-app-dashboard
Terminal 3: cd my-app-settings
```

**Step 4: Give each agent clear boundaries**
```
Terminal 1: "Build auth. Focus ONLY on /auth/* and /components/auth/*"
Terminal 2: "Build dashboard. Focus ONLY on /dashboard/* and /components/dashboard/*"
Terminal 3: "Build settings. Focus ONLY on /settings/* and /components/settings/*"
```

**Step 5: Merge back when done**
```
You: "Merge auth branch back to main"
You: "Merge dashboard branch back to main"
```

### Critical Rules for Parallel Building

| Rule | Why |
|------|-----|
| **Different files** | Auth touches `/auth/*`, Dashboard touches `/dashboard/*` |
| **Tell agents their boundaries** | "Focus ONLY on files in [folder]" |
| **Merge frequently** | Don't let branches diverge too long |
| **Communicate conflicts** | If two features need the same file, do them sequentially |
| **Main first** | Always merge to main before starting dependent features |

### Parallel Prompting Examples

**Setting up:**
```
"I want to build these 3 features in parallel: auth, dashboard, and settings.
Analyze them and tell me if there are any file conflicts."
```

**Starting parallel work:**
```
"Set up git worktrees for these features. I'll open 3 terminals."
```

**Constraining each agent:**
```
"Build the auth feature.
IMPORTANT: Only touch files in src/app/auth/* and src/components/auth/*
Do NOT modify layout.tsx, globals.css, or any shared files."
```

**When conflicts happen:**
```
"I have a merge conflict in layout.tsx. Show me both versions and help me resolve it."
```

---

## 🌿 For Vibe Coders: The Control Prompts

Coming from Lovable/Bolt? These prompts give you the control you've been missing:

### See Everything Before It Happens
```
"Show me what you're going to do before you do it."
"What files will this change?"
"Explain your approach first."
```

### Understand Errors
```
"What's the error?"
"Explain that error to me like I'm not a developer."
"Why did that break?"
```

### Navigate and Undo
```
"Show me the project structure."
"Where is the [component/function]?"
"Undo the last change."
"Go back to before [X]."
```

### Learn As You Go
```
"Explain what you just did."
"Why is this better than [alternative]?"
"What would happen if we did [X] instead?"
```

---

## 📋 Planning Prompts

### Creating an Epic:
```
"Create an epic for [feature].
Goal: [what success looks like]
Users: [who benefits]
Must have: [key features]
Out of scope: [what we're NOT building]"
```

### Breaking into Features:
```
"Break this epic into features.
Each should be completable in 1-2 hours.
Start with the smallest valuable piece."
```

### Building a Feature:
```
"Build feature #3: [name].
Before coding, show me:
1. Which files you'll create/modify
2. Component structure
3. Dependencies needed"
```

---

## 🔍 Quality Prompts

### Code Review:
```
"Review this component for issues"
"Is this the best way to handle [pattern]?"
"Check for security vulnerabilities"
"Make this accessible (a11y)"
"Why is this re-rendering so much?"
```

### The Iteration Loop:
```
1. Build → "Build [feature]"
2. Understand → "Show me what you did"
3. Refine → "Change [specific thing]"
4. Quality → "Review for issues"
5. Save → "Commit: [type]: [message]"
```

---

## 🎨 Design Prompts

### Making It Premium:
```
"This looks AI-generated. Make it look like a real product."
"Add more whitespace and visual hierarchy."
"Use a consistent accent color throughout."
"Add subtle hover animations."
```

### Specific Design Requests:
```
"Make this card feel more premium — shadows, rounded corners, better spacing."
"Add a subtle entrance animation when this component mounts."
"This button needs a loading state."
```

---

## 🗄️ Database & Backend Prompts

### Setting Up Data:
```
"I need to store [data type]. What's the best approach?"
"Set up Supabase for user profiles with auth."
"Create a schema for [feature]."
```

### Querying Data:
```
"Fetch all [items] for the current user."
"Filter [items] by [condition]."
"Sort by [field] in descending order."
```

---

## 🚀 Deployment Prompts

### Pre-deployment:
```
"Is my app ready to deploy? Check for common issues."
"What environment variables do I need?"
"Does the build pass?"
```

### Deploying:
```
/ship
```

---

## 🆘 Debugging Prompts

### When Something Breaks:

**The easiest way: Just paste the error!**

```
You: Here's the error I'm getting:

TypeError: Cannot read properties of undefined (reading 'map')
    at ProductList (src/components/ProductList.tsx:15:23)
    at renderWithHooks (node_modules/react-dom/...)
```

Claude will:
1. Explain what the error means in plain English
2. Identify the exact file and line number
3. Show you how to fix it
4. Explain how to prevent it next time

### How to Copy Errors:

| Where You See It | How to Copy |
|------------------|-------------|
| **Terminal** | Select text → Cmd+C (Mac) or Ctrl+C (Win) |
| **Browser Console** | Right-click error → "Copy" or "Copy Error" |
| **VS Code/Editor** | Click error → Cmd+C (Mac) or Ctrl+C (Win) |
| **Vercel Deploy** | Copy from build logs |

### Example Error Prompts:

**Just paste it:**
```
"I'm getting this error:
[paste error here]"
```

**With context:**
```
"When I click the submit button, I get this error:
[paste error here]

The form was working before I added validation."
```

**Ask for explanation:**
```
"Explain this error to me like I'm not a developer:
[paste error here]"
```

**Ask for prevention:**
```
"I fixed this error, but why did it happen? How do I avoid it?
[paste error here]"
```

### Common Error Patterns and What To Say:

| Error Type | Example | What To Say |
|------------|---------|-------------|
| **TypeScript** | "Property 'x' does not exist" | "TypeScript says [property] doesn't exist on [type]. Why?" |
| **Import** | "Cannot find module '@/...'" | "I can't import [module]. Does the file exist?" |
| **Runtime** | "Cannot read properties of undefined" | "Something is undefined. Help me find where." |
| **Build** | "Failed to compile" | "The build is failing. Here's the error: [paste]" |
| **Network** | "Failed to fetch" | "API call is failing. Here's what I see: [paste]" |

### Quick Debug Commands:

```
"What's wrong?"                           → Claude checks terminal/console
"Run the build and show me any errors"    → Claude runs npm run build
"Check if there are TypeScript errors"    → Claude runs tsc --noEmit
"Why isn't the page loading?"             → Claude investigates
```

### The Debug Flow:

```
1. See error → Copy it
2. Paste to Claude → "I'm getting this error: [paste]"
3. Claude explains → Understand what went wrong
4. Claude fixes → Watch the solution
5. Learn → "Why did this happen?"
```

---

## 🌳 Expert-Level Prompting

For experienced developers who want maximum productivity:

### Speed Patterns

```
// Batch operations — no confirmations
"Build issues #3, #4, #5 sequentially. After each: run tests, commit, continue."

// Parallel sprint setup
"Set up git worktrees for features: auth, dashboard, settings.
I'll run 3 Claude sessions in parallel."

// Fast iteration mode
"Build it fast first. Skip: tests, error handling, edge cases.
Include: core functionality, basic styling. I'll say when to polish."
```

### Expert Commands

```
/expert-mode                    → Full expert toolkit overview
/parallel-build auth,dash,api   → Set up worktrees for parallel building
/clone-hero https://linear.app  → Reverse-engineer and rebuild hero 1:1
/code-review security           → Deep security audit
/code-review performance        → Bundle analysis + render optimization
```

### Using Skills for Maximum Power

```
"Using the visual-dna-extraction skill, analyze stripe.com's design system."

"Using the agency-design-system skill, review my hero for premium quality."

"Using the gsap-animation-patterns skill, add scroll-triggered reveals."

"Using the scrape-technique skill, extract competitor's Visual DNA."
```

### Expert Research Workflow

```
1. "Scrape these 3 competitors: [urls]. Extract visual DNA from each."

2. "Create a comparison matrix: colors, typography, spacing, animations."

3. "Clone the best hero section. Rebuild 1:1 in my codebase."

4. "Now make it 20% better with our brand colors and unique animations."
```

### Expert Quality Gates

```
// Before deployment
"Run full audit: security, performance, accessibility. Be harsh."

// Specific checks
"Check for: OWASP top 10, bundle size bloat, unnecessary re-renders."

// Performance targets
"Lighthouse must be >90. What's blocking us?"
```

### Expert Prompting Principles

| Principle | Example |
|-----------|---------|
| **Constrain scope** | "Only modify files in /auth/*" |
| **Request alternatives** | "Show 3 approaches before implementing" |
| **Chain operations** | "Build → test → commit — no pauses" |
| **Validate proactively** | "Before merge, check security issues" |
| **Learn continuously** | "Why did you choose this pattern?" |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 PROMPTING QUICK REFERENCE                               │
│                                                             │
│  PLANNING                                                   │
│  "Help me plan my app..."                                   │
│  "Break this into features..."                              │
│  "What's the smallest MVP?"                                 │
│                                                             │
│  BUILDING                                                   │
│  "Build a [component] that [behavior]"                      │
│  "Show me what you'll do first"                             │
│  "Focus ONLY on files in [folder]"                          │
│                                                             │
│  QUALITY                                                    │
│  "Review this for issues"                                   │
│  "Make this look more premium"                              │
│  "Check for security issues"                                │
│                                                             │
│  PARALLEL (Advanced)                                        │
│  "Which features can be built in parallel?"                 │
│  "Set up worktrees for [features]"                          │
│  "Build [X] — focus ONLY on [folder]"                       │
│  "Merge [branch] back to main"                              │
│                                                             │
│  CONTROL (Vibe Coders)                                      │
│  "Show me your plan first"                                  │
│  "What's the error?"                                        │
│  "Explain what you just did"                                │
│  "Undo that"                                                │
│                                                             │
│  EXPERT (Experienced Developers)                            │
│  /expert-mode — Full expert toolkit                         │
│  /clone-hero [url] — Rebuild competitor sections            │
│  /parallel-build — Multiple features at once                │
│  "Using [skill], do [task]" — Leverage skills               │
│                                                             │
│  💡 Remember: Intent > Implementation                       │
│     Say WHAT you want, not HOW to do it!                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Offer Next Steps

Based on their level, suggest:

**For beginners:**
> "Try this: Tell me what you want to build next, and I'll show you the ideal prompt for it."

**For vibe coders:**
> "Try this: Ask me to 'show you my plan first' before building anything. You'll love the control!"

**For experienced:**
> "Ready for parallel work? Tell me your 2-3 next features and I'll help you set up worktrees safely."

---

*Part of the Claude Code Masterclass — Barcelona 2026*
