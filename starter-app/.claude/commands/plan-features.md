# /plan-features - Break Your Epic Into Feature Issues

Uses the Product Owner mindset to break your Epic into trackable Feature issues on GitHub.

## User Request: $ARGUMENTS

---

## What This Does

1. Reads your PLAN.md and Epic issue
2. Breaks the Epic into 3-5 Feature issues
3. Creates GitHub Issues for each Feature
4. Links them all back to the Epic
5. Sets you up for parallel building with agents

---

## Prerequisites

- ✅ GitHub repo exists (`/github-init`)
- ✅ Epic issue created (`/epic-create`)
- ✅ PLAN.md with features defined

---

## Interactive Flow

### Step 1: Find the Epic

```bash
gh issue list --label "epic" --limit 1
```

If no Epic found:
> "No Epic found. Run /epic-create first to create your main goal."

---

### Step 2: Read PLAN.md Features

```bash
cat PLAN.md
```

Extract the features section and confirm:

```
📦 Features from your plan:

1. [Feature 1 name]
2. [Feature 2 name]
3. [Feature 3 name]
4. [Feature 4 name]

Create GitHub Issues for each? (Y/n)
```

---

### Step 3: Create Feature Issues

For each feature, create an issue:

```bash
gh issue create \
  --title "📦 FEATURE: [Feature Name]" \
  --body "$(cat <<'EOF'
## 📦 Feature: [Feature Name]

**Part of Epic:** #1

---

## 📝 User Stories

As a [user type],
I want to [action],
So that [benefit].

---

## ✅ Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## 🔧 Technical Notes

- Components needed: [list]
- Database changes: [if any]
- API endpoints: [if any]

---

## 📊 Status

- **Epic:** #1
- **Size:** [S/M/L]
- **Priority:** [Must/Should/Nice]

---

*Created with `/plan-features` — tracking as GitHub Issue*
EOF
)" \
  --label "feature"
```

---

### Step 4: Create Labels (if missing)

```bash
gh label create "feature" --description "Feature implementation" --color "0366d6" 2>/dev/null || true
gh label create "must-have" --description "Required for MVP" --color "b60205" 2>/dev/null || true
gh label create "should-have" --description "Important but not critical" --color "fbca04" 2>/dev/null || true
gh label create "nice-to-have" --description "If time permits" --color "c5def5" 2>/dev/null || true
```

---

### Step 5: Update Epic with Links

After creating all features, update the Epic to link to them:

```bash
gh issue comment 1 --body "## 📦 Feature Breakdown

The following features have been created for this Epic:

$(gh issue list --label feature --json number,title --jq '.[] | "- #\(.number): \(.title)"')

Use \`/work-on #[number]\` to start building each feature!"
```

---

### Step 6: Show Summary

```bash
gh issue list --label "feature"
```

---

## Output Format

```
📦 Features Created!

Epic #1 now has these features:

#2: 📦 FEATURE: User Authentication
    Priority: must-have

#3: 📦 FEATURE: Dashboard Layout
    Priority: must-have

#4: 📦 FEATURE: Data Management
    Priority: should-have

#5: 📦 FEATURE: Settings Page
    Priority: nice-to-have

📋 Your Project Board:
   Epic: #1 (in progress)
   Features: 4 created, 0 completed

🚀 Start Building:
   Type: /work-on #2
   To begin with the first feature!

View all issues: https://github.com/[user]/[repo]/issues
```

---

## Feature Issue Template

Each feature follows this structure:

```markdown
## 📦 Feature: [Name]
Part of Epic: #1

## 📝 User Stories
As a [user], I want to [action], so that [benefit].

## ✅ Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## 🔧 Technical Notes
- Components: [list]
- Database: [changes]
- API: [endpoints]

## 📊 Status
- Size: [S/M/L]
- Priority: [Must/Should/Nice]
```

---

## The Product Owner Mindset

> **"A well-defined feature is 80% of the work done."**

When creating features, ask:
1. **WHO** benefits from this?
2. **WHAT** does it do?
3. **WHEN** is it done? (acceptance criteria)
4. **WHY** does it matter?

---

## Parallel Work Opportunity

Once features are created, you can:

```
Terminal 1: /work-on #2 (Authentication)
Terminal 2: /work-on #3 (Dashboard)
Terminal 3: /work-on #4 (Data Management)

All three build simultaneously! 🚀
```

---

## 🎓 COURSE CONTINUATION

**You've completed the planning phase!**

Before jumping into building, learn HOW to build efficiently with AI agents.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 NEXT STEP: Learn the Agent Advantage

Type: /start-3-1

This lesson teaches you how to use AI agents as
your development team — saving hours of work!

Or type /next to auto-continue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Alternative paths:**
- `/work-on #2` — Skip lessons and start building immediately
- `/progress` — See your full course progress

---

*Part of the Claude Code Masterclass — Barcelona 2026*
