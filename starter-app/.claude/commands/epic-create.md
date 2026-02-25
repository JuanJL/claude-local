# /epic-create - Create Your First Epic Issue

Creates a GitHub Issue for your MVP Epic, marking the start of your project journey.

## User Request: $ARGUMENTS

---

## What This Does

1. Reads your PLAN.md (created in Module 2)
2. Creates a beautifully formatted Epic issue on GitHub
3. Adds proper labels
4. Sets the foundation for all your feature tickets

---

## Prerequisites

Before running this:
- ✅ You've run `/github-init` (repo exists)
- ✅ You have a `PLAN.md` file (from Module 2)

If no PLAN.md exists, ask:
> "What's your Epic? Describe your app in one sentence."

---

## Interactive Flow

### Step 1: Check for PLAN.md

```bash
cat PLAN.md 2>/dev/null || echo "NO_PLAN"
```

If PLAN.md exists, extract:
- Epic name
- Target user
- Problem being solved
- Features list

If no PLAN.md, ask for details manually.

---

### Step 2: Confirm Epic Details

Show the participant what will be created:

```
📋 Epic Summary:

🎯 Name: [App Name] MVP
👤 Target User: [Who]
💡 Problem: [What problem]
📦 Features:
   - [Feature 1]
   - [Feature 2]
   - [Feature 3]

Create this Epic issue? (Y/n)
```

---

### Step 3: Create the Issue

```bash
gh issue create \
  --title "🎯 EPIC: [App Name] MVP" \
  --body "$(cat <<'EOF'
## 🎯 Epic Goal

**Build a working MVP of [App Name] that [solves problem] for [target user].**

---

## 👤 Target User

[Description of who this is for]

---

## 💡 Problem Statement

[What problem does this solve?]

---

## ✅ Success Criteria

- [ ] User can sign up and log in
- [ ] User can [core action 1]
- [ ] User can [core action 2]
- [ ] App is deployed and accessible

---

## 📦 Features in this Epic

- [ ] Feature 1: [Name]
- [ ] Feature 2: [Name]
- [ ] Feature 3: [Name]
- [ ] Feature 4: [Name]

*Each feature will become a separate GitHub Issue linked to this Epic.*

---

## 📅 Timeline

**Created:** [Today's Date]
**Workshop:** Claude Code Masterclass Barcelona 2026

---

*This Epic was created using `/epic-create` — tracking progress as GitHub Issues.*
EOF
)" \
  --label "epic"
```

---

### Step 4: Create Epic Label (if missing)

```bash
gh label create "epic" --description "Major project milestone" --color "6f42c1" 2>/dev/null || true
gh label create "feature" --description "Feature ticket" --color "0366d6" 2>/dev/null || true
gh label create "ticket" --description "Implementation task" --color "28a745" 2>/dev/null || true
```

---

### Step 5: Show Result

```bash
gh issue view 1 --web
```

---

## Output Format

```
🎯 Epic Created!

Issue #1: EPIC: [App Name] MVP
URL: https://github.com/[user]/[repo]/issues/1

Labels: epic

📋 Next Steps:
1. Type /plan-features to break this Epic into Feature tickets
2. Each feature becomes an issue linked to this Epic
3. Use /work-on #[number] to start building!

View your Epic: [URL]
```

---

## Epic Issue Template

The created issue follows this structure:

```markdown
## 🎯 Epic Goal
[One sentence summary]

## 👤 Target User
[Who is this for]

## 💡 Problem Statement
[What problem does this solve]

## ✅ Success Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## 📦 Features in this Epic
- [ ] Feature 1
- [ ] Feature 2

## 📅 Timeline
Created: [Date]
```

---

## Why Epics Matter

> **"Without a goal, you're just coding. With an Epic, you're building something that matters."**

The Epic is your north star:
- When confused, check the Epic
- When prioritizing, ask "Does this serve the Epic?"
- When done, close the Epic with pride!

---

## 🎓 COURSE CONTINUATION

**Your Epic is created!**

Now break it down into trackable Features.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 NEXT STEP: Plan Your Features

Type: /plan-features

This creates GitHub Issues for each feature,
so you can track progress and build systematically.

Or type /next to auto-continue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Alternative paths:**
- `/progress` — See your full course progress
- `/start-2-2` — Learn about the Feature breakdown process first

---

*Part of the Claude Code Masterclass — Barcelona 2026*
