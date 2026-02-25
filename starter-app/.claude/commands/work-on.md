# /work-on - Build a Feature from GitHub Issue

Picks up a GitHub Issue and builds it, then commits and closes when done.

## User Request: $ARGUMENTS

---

## Usage

```
/work-on #3
/work-on #3 "Add login form with email validation"
/work-on authentication
```

---

## What This Does

1. Reads the GitHub Issue details
2. Creates a feature branch
3. Builds the feature based on requirements
4. Commits changes with proper message
5. Closes the issue automatically

---

## Interactive Flow

### Step 1: Parse the Issue

If given issue number:
```bash
gh issue view [number]
```

If given keyword, search:
```bash
gh issue list --search "[keyword]" --limit 5
```

Extract:
- Issue title
- Acceptance criteria
- Technical notes
- Parent Epic reference

---

### Step 2: Show Issue Summary

```
📋 Working on Issue #[number]

Title: [Feature name]
Epic: #1
Priority: [must-have/should-have]

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

Ready to start building? (Y/n)
```

---

### Step 3: Create Feature Branch

```bash
# Get current branch
git branch --show-current

# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/issue-[number]-[short-name]
```

Example: `feature/issue-3-login-form`

---

### Step 4: Build the Feature

Now implement the feature based on:
- Acceptance criteria from the issue
- Technical notes
- User stories

**Keep communicating progress:**
```
🔧 Building: Login form component
📄 Creating: src/components/auth/LoginForm.tsx
✅ Done: Form structure with email/password fields

🔧 Building: Form validation
📄 Updating: src/components/auth/LoginForm.tsx
✅ Done: Email format + password requirements

🔧 Building: API integration
📄 Creating: src/app/api/auth/login/route.ts
✅ Done: Login endpoint connected
```

---

### Step 5: Test Locally

```bash
npm run dev
```

> "Feature is running at localhost:3000. Does it work as expected? (Y/n)"

If issues, fix them before proceeding.

---

### Step 6: Commit Changes

Stage all changes:
```bash
git add .
git status
```

Create commit with issue reference:
```bash
git commit -m "feat(auth): add login form with validation

- Add LoginForm component with email/password fields
- Add client-side validation
- Connect to authentication API
- Add error handling and loading states

Closes #[issue-number]

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Important:** The `Closes #[number]` automatically closes the issue when merged!

---

### Step 7: Push to GitHub

```bash
git push -u origin feature/issue-[number]-[short-name]
```

---

### Step 8: Create Pull Request (Optional)

Ask:
> "Create a Pull Request for review? (Y/n)"

If yes:
```bash
gh pr create \
  --title "feat: [Feature Name]" \
  --body "## Summary
Implements #[issue-number]: [Feature description]

## Changes
- [Change 1]
- [Change 2]

## Testing
- [ ] Tested locally
- [ ] Works as expected

Closes #[issue-number]

---
🤖 Built with Claude Code at the Masterclass" \
  --base main
```

---

### Step 9: Merge and Celebrate

If working alone (no PR review needed):
```bash
git checkout main
git merge feature/issue-[number]-[short-name]
git push origin main
```

The issue closes automatically! 🎉

---

## Output Format

```
✅ Feature Complete!

Issue #[number]: [Feature Name]
Status: CLOSED ✓
Branch: feature/issue-[number]-[name]
Commits: 3
Files changed: 5

📊 Project Progress:
   Epic #1: 2/5 features complete

   ✅ #2: Authentication (DONE)
   ✅ #3: Login Form (DONE) ← You just finished this!
   🔄 #4: Dashboard (in progress)
   ⬜ #5: Settings (todo)

🚀 Next:
   Type /work-on #4 to continue building!

View closed issue: https://github.com/[user]/[repo]/issues/[number]
```

---

## The Magic of "Closes #X"

When your commit message includes `Closes #3`, GitHub automatically:
1. ✅ Closes issue #3
2. 📎 Links the commit to the issue
3. 📊 Updates your project board
4. 🎉 Shows progress!

Other keywords that work:
- `Closes #3`
- `Fixes #3`
- `Resolves #3`

---

## Parallel Work Pattern

For maximum speed, open multiple terminals:

```
Terminal 1                    Terminal 2
─────────────────────────     ─────────────────────────
/work-on #3                   /work-on #4
Building login form...        Building dashboard...
✅ Closes #3                  ✅ Closes #4

Both features built simultaneously!
```

---

## When You Get Stuck

If something doesn't work:

1. **Check the issue** — Re-read acceptance criteria
2. **Check the error** — Read the full error message
3. **Ask for help** — `/debug-fix [error]`
4. **Take a break** — Fresh eyes help!

---

*Part of the Claude Code Masterclass — Barcelona 2026*
