# /github-status - Verify Your GitHub Setup

Quick check to make sure GitHub is ready for the workshop.

## What This Does

Verifies that:
1. Git is installed
2. GitHub CLI (`gh`) is installed
3. You're logged in to GitHub
4. You can create repositories

---

## Run These Checks

### Check 1: Git Installed
```bash
git --version
```
**Expected:** `git version 2.x.x`
**If missing:** "Install Git from https://git-scm.com"

### Check 2: GitHub CLI Installed
```bash
gh --version
```
**Expected:** `gh version 2.x.x`
**If missing:** "Install GitHub CLI: https://cli.github.com"

### Check 3: Logged In
```bash
gh auth status
```
**Expected:** Shows "Logged in to github.com as [username]"
**If not logged in:** Run `gh auth login` and follow prompts

### Check 4: Can Create Repos
```bash
gh api user --jq '.login'
```
**Expected:** Shows your GitHub username

---

## Output Format

If everything works:
```
✅ GitHub Status Check Complete!

Git: ✅ Installed (v2.x.x)
GitHub CLI: ✅ Installed (v2.x.x)
Logged in as: @yourname
Ready to: Create repos, push code, manage issues

🎉 You're ready for the workshop!
```

If something is missing:
```
⚠️ GitHub Setup Incomplete

Git: ✅ OK
GitHub CLI: ❌ Not installed
   → Install from: https://cli.github.com

Fix this before continuing!
```

---

## Quick Fix Commands

**Not logged in?**
```bash
gh auth login
# Choose: GitHub.com
# Choose: HTTPS
# Choose: Login with browser
```

**Need to install gh?**
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
