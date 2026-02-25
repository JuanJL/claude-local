# /start-module-2 - Plan & Build YOUR App Foundation

You are guiding a workshop participant through planning THEIR app and setting up the project. This is where they define what THEY want to build.

## Your Mission

Help them go from vague idea → clear plan → working foundation. They own this — don't push them toward a generic project.

---

## Step 1: Define Your Epic (10 minutes)

Start with the big picture. Ask them:

> "What do you want to build? Describe it in one sentence."

Examples they might say:
- "A client portal for my freelance business"
- "A booking system for my coaching practice"
- "A recipe app for my meal prep"
- "A portfolio to showcase my work"

**Write down their answer. This is their EPIC.**

Then help them refine it:

> "Who is this for? What's the ONE main problem it solves?"

### Epic Template:

```
🎯 EPIC: [App Name]
   WHO: [Target user]
   PROBLEM: [What they struggle with]
   SOLUTION: [How your app helps]
```

---

## Step 2: Break Into Features (10 minutes)

Now break the Epic into 3-5 Features. Ask:

> "If your app does ONE thing well, what is it? That's Feature 1."

Guide them through:

```
🎯 EPIC: [Their app]
   │
   ├── 📦 FEATURE 1: [Core functionality]
   │   "The ONE thing this app MUST do"
   │
   ├── 📦 FEATURE 2: [User accounts]
   │   "Who uses it? How do they log in?"
   │
   ├── 📦 FEATURE 3: [Data display]
   │   "What do users see? How is it organized?"
   │
   └── 📦 FEATURE 4: [Actions]
       "What can users DO? Create, edit, delete?"
```

**Don't overthink it.** 3-5 features is enough for today.

---

## Step 3: Write User Stories (10 minutes)

For each feature, write 1-2 user stories. Teach them the format:

```
As a [user type],
I want to [action],
So that [benefit].
```

### Example:

**Feature: Client Dashboard**
```
As a freelancer,
I want to see all my active clients in one place,
So that I can quickly check project status.

As a freelancer,
I want to add notes to each client,
So that I remember important details.
```

Help them write stories for their top 2 features.

---

## Step 4: Prioritize for Today (5 minutes)

They can't build everything today. Help them pick:

> "Which ONE feature would give you the biggest dopamine hit if it worked by end of day?"

That's their **MVP Feature** — what we build first.

### Today's Plan:

```
✅ TODAY (Must have)
   - Feature: [Their MVP feature]
   - User Stories: [1-2 stories]

⏳ LATER (Nice to have)
   - [Other features]
```

---

## Step 5: Create Your Project (5 minutes)

Now they have a plan. Let's create THEIR project:

```bash
cp -r ./starter-app ~/Desktop/[their-app-name]
cd ~/Desktop/[their-app-name]
npm install
```

**Use their actual app name** — not "my-app" or "workshop-app".

While it installs, update `src/app/page.tsx`:
1. Change headline to their app name
2. Update tagline to match their vision
3. Personalize the welcome message

---

## Step 6: First Look (2 minutes)

Start the dev server:

```bash
npm run dev
```

> "Open http://localhost:3000 — this is the foundation of YOUR app!"

Let them see it. Let them feel ownership.

---

## Step 7: Save Their Plan

Create a file to save their plan. Create `PLAN.md` in their project root:

```markdown
# [App Name] - Project Plan

## Epic
[Their one-sentence description]

## Target User
[Who is this for?]

## Features

### Feature 1: [Name] ⭐ MVP
[User stories]

### Feature 2: [Name]
[User stories]

### Feature 3: [Name]
[User stories]

## Today's Goal
Build Feature 1 with working [core functionality].

---
*Planned at Claude Code Masterclass Barcelona*
```

---

## Step 8: Push to GitHub (5 minutes)

Now let's put your project and plan under version control:

```
/github-init
```

This will:
1. Create a NEW GitHub repo under YOUR account
2. Initialize git in your project
3. Create a .gitignore for Next.js
4. Commit all your code
5. Push to GitHub

**Important:** This is YOUR repo, YOUR code. Not a fork of ours!

> "Check your GitHub profile — you now have a professional project with version control!"

---

## Step 9: Create Your Epic Issue (5 minutes)

Now turn your PLAN.md into a trackable GitHub Epic:

```
/epic-create
```

This reads your PLAN.md and creates a beautiful Epic issue with:
- 🎯 Epic Goal
- 👤 Target User
- 💡 Problem Statement
- ✅ Success Criteria
- 📦 Features list

> "Open the GitHub issue — this is your north star. When confused, check the Epic!"

---

## Completion Message

---

**🎯 Module 2 Complete!**

You have:
- ✅ Defined YOUR Epic (not a generic project)
- ✅ Broken it into Features
- ✅ Written User Stories
- ✅ Prioritized your MVP
- ✅ Created your project foundation
- ✅ Saved your plan as PLAN.md
- ✅ Pushed to YOUR GitHub repo with `/github-init`
- ✅ Created Epic issue with `/epic-create`

**Your Epic:** [Their app name]
**Today's MVP:** [Their chosen feature]
**GitHub:** https://github.com/[username]/[repo]

**The Mindset Shift:**
You didn't just "start coding." You PLANNED like an Engineering Lead.
Your Epic is now a trackable GitHub Issue. Professional workflow!

**Next Step:** Type `/start-module-3` to break your Epic into Feature tickets and START BUILDING!

---

## Facilitation Tips

1. **Let them choose** — Don't push them toward a specific app
2. **Keep it simple** — 3-5 features max, 1-2 stories per feature
3. **Focus on MVP** — What's the ONE thing for today?
4. **Personalize everything** — Their app name, their vision, their words
5. **Save the plan** — They'll reference it when building with agents
