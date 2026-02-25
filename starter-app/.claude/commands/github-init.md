# /github-init - Create Your GitHub Repository

Creates YOUR OWN GitHub repository and pushes your project code.

## User Request: $ARGUMENTS

---

## What This Does

1. Creates a new GitHub repository under YOUR account
2. Initializes git in your project (if needed)
3. Creates first commit with all your code
4. Pushes everything to GitHub
5. Opens your new repo in the browser

---

## Interactive Flow

### Step 1: Confirm Project Location

First, check we're in the right folder:

```bash
pwd
ls -la
```

Ask:
> "I see you're in `[folder name]`. Is this the project you want to push to GitHub? (Y/n)"

If not, help them navigate to the correct folder.

---

### Step 2: Get Repository Details

Ask these questions:

> **1. What's your repository name?**
> (Use lowercase, hyphens instead of spaces)
> Examples: `fittrack-app`, `client-portal`, `recipe-manager`

> **2. Public or private repository?**
> - **Public:** Anyone can see it (great for portfolio!)
> - **Private:** Only you can see it

> **3. One-line description:**
> Example: "15-minute workout app for busy professionals"

---

### Step 3: Initialize Git (if needed)

Check if git is already initialized:

```bash
git status 2>/dev/null || echo "NOT_INITIALIZED"
```

If NOT initialized:
```bash
git init
```

---

### Step 4: Create .gitignore (if missing)

Check for .gitignore:
```bash
cat .gitignore 2>/dev/null || echo "MISSING"
```

If missing, create one for Next.js:
```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
.next/
out/
build/
dist/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel
EOF
```

---

### Step 5: Stage All Files

```bash
git add .
```

Show what will be committed:
```bash
git status
```

---

### Step 6: Create First Commit

```bash
git commit -m "🎉 Initial commit - [App Name] starter

Built at Claude Code Masterclass Barcelona 2026

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Step 7: Create GitHub Repository

```bash
gh repo create [repo-name] --[public/private] --description "[description]" --source=. --remote=origin --push
```

---

### Step 8: Verify & Celebrate

```bash
gh repo view --web
```

---

## Output Format

```
🎉 GitHub Repository Created!

Repository: github.com/[username]/[repo-name]
Visibility: Public
First commit: ✅ Pushed

Your code is now on GitHub!

📋 Next Steps:
1. Type /epic-create to create your first Epic issue
2. Type /plan-features to break your Epic into tickets
3. Start building with /work-on #[issue-number]

🔗 Open your repo: https://github.com/[username]/[repo-name]
```

---

## Error Handling

**"Repository already exists":**
> "A repo with this name already exists. Choose a different name or delete the existing one."

**"Not logged in":**
> "Run /github-status first to log in to GitHub."

**"Permission denied":**
> "Check that you have permission to create repos. Run `gh auth status`."

---

## Why This Matters

You now have:
- ✅ Your code backed up in the cloud
- ✅ Version control (can undo mistakes!)
- ✅ A place to track issues and progress
- ✅ A portfolio piece to show others
- ✅ Professional developer workflow

---

## 🎓 COURSE CONTINUATION

**Your safety net is ready!**

Now let's define your goal with an Epic.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 NEXT STEP: Create Your Epic

Type: /epic-create

An Epic is your "north star" — the main goal
your app is trying to achieve.

Or type /next to auto-continue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Alternative paths:**
- `/progress` — See your full course progress
- `/start-2-1` — Learn about Epic planning first

---

*Part of the Claude Code Masterclass — Barcelona 2026*
