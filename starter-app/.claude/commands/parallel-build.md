# /parallel-build - Build Multiple Features Simultaneously

You are helping an **experienced developer** (🌳) set up parallel building with Git worktrees. This is ADVANCED — make sure they understand the risks.

## Features to Build: $ARGUMENTS

---

## ⚠️ Important Warning First!

> "Before we set this up — are you comfortable with Git merge conflicts?
>
> **Parallel building is powerful but risky:**
> - Multiple agents editing the same files = CONFLICT
> - Requires discipline about which files each feature touches
> - Best for features that don't overlap
>
> **Recommendation:** Do your first 2-3 features sequentially with `/work-on`.
> Once you're comfortable, THEN try parallel."

If they confirm they want to proceed:

---

## What Are Git Worktrees?

Instead of one folder switching between branches:

```
NORMAL:
~/my-app/          ← Switch branches constantly
  ↓ git checkout feature/auth
  ↓ git checkout feature/dashboard
  ↓ git checkout feature/settings

WORKTREES:
~/my-app/              ← Main branch (stable)
~/my-app-auth/         ← Terminal 1 (feature/auth)
~/my-app-dashboard/    ← Terminal 2 (feature/dashboard)
~/my-app-settings/     ← Terminal 3 (feature/settings)
```

**Each folder is already on its own branch!** No switching needed.

---

## Step 1: Identify Parallel-Safe Features

Look at their features and identify which can run in parallel:

### ✅ SAFE to Parallel (Different Files)

| Feature A | Feature B | Why Safe |
|-----------|-----------|----------|
| Auth (`/auth/*`) | Dashboard (`/dashboard/*`) | Different folders |
| Settings page | Analytics | Different concerns |
| User profile | Admin panel | Different user flows |

### ❌ NOT SAFE to Parallel (Same Files)

| Feature A | Feature B | Why Risky |
|-----------|-----------|-----------|
| Both need navbar changes | | `layout.tsx` conflict |
| Both add new database tables | | Schema conflicts |
| Both modify the same component | | Code conflicts |

> "Let me look at your features and tell you which can safely run in parallel..."

---

## Step 2: Set Up Worktrees

From the main project folder:

```bash
# Make sure main is up to date
git checkout main
git pull

# Create worktrees for each feature
git worktree add ../[project-name]-auth feature/auth
git worktree add ../[project-name]-dashboard feature/dashboard
git worktree add ../[project-name]-settings feature/settings
```

This creates:
```
~/Projects/
├── my-app/                    ← Main (stay here for merging)
├── my-app-auth/               ← Worktree 1
├── my-app-dashboard/          ← Worktree 2
└── my-app-settings/           ← Worktree 3
```

---

## Step 3: Open Multiple Terminals

Each terminal needs:

1. **Navigate to the worktree:**
   ```bash
   cd ~/Projects/my-app-auth
   ```

2. **Install dependencies (shared node_modules won't work):**
   ```bash
   npm install
   ```

3. **Start dev server on different ports:**
   ```bash
   npm run dev -- --port 3001   # Terminal 1
   npm run dev -- --port 3002   # Terminal 2
   npm run dev -- --port 3003   # Terminal 3
   ```

4. **Open Claude Code in each:**
   ```bash
   claude
   ```

---

## Step 4: Build in Parallel

In each terminal, tell Claude what to build:

**Terminal 1 (Auth):**
```
"Build the authentication feature. Focus ONLY on files in /auth/ and auth-related components."
```

**Terminal 2 (Dashboard):**
```
"Build the dashboard feature. Focus ONLY on files in /dashboard/."
```

**Terminal 3 (Settings):**
```
"Build the settings page. Focus ONLY on files in /settings/."
```

> "Each agent works independently. They don't know about each other. That's the power AND the risk."

---

## Step 5: Merge Back to Main

When a feature is complete:

```bash
# Go to main project
cd ~/Projects/my-app

# Merge the feature
git merge feature/auth

# If conflicts appear:
git status  # See conflicted files

# Resolve manually, then:
git add .
git commit -m "resolve: merge auth feature"
```

---

## Conflict Resolution Guide

When you see:

```
<<<<<<< HEAD
// Main branch version
const layout = "main";
=======
// Feature branch version
const layout = "feature";
>>>>>>> feature/auth
```

**You decide:**
1. Keep main version (delete feature code)
2. Keep feature version (delete main code)
3. Combine both (manual merge)

Then:
```bash
git add [conflicted-file]
git commit -m "resolve: merge conflict in [file]"
```

---

## Best Practices for Parallel Building

### DO ✅

- Build features that touch **different files**
- Merge frequently (don't let branches diverge too long)
- Communicate between terminals if overlap is needed
- Keep one terminal on `main` for merging
- Use feature flags to hide incomplete work

### DON'T ❌

- Build features that modify the same components
- Let branches go days without merging
- Ignore merge conflicts (fix them immediately)
- Work on core files (`layout.tsx`, `globals.css`) in parallel

---

## Cleanup: Remove Worktrees

When done with parallel building:

```bash
# List worktrees
git worktree list

# Remove a worktree
git worktree remove ../my-app-auth

# Or force remove if dirty
git worktree remove --force ../my-app-auth
```

---

## Success Message

```
🔀 Parallel Build Setup Complete!

You now have:
├── ~/Projects/my-app/              ← Main (for merging)
├── ~/Projects/my-app-[feature1]/   ← Terminal 1
├── ~/Projects/my-app-[feature2]/   ← Terminal 2
└── ~/Projects/my-app-[feature3]/   ← Terminal 3

Each terminal:
✅ Has its own Claude Code session
✅ Has its own dev server (ports 3001, 3002, 3003)
✅ Works on its own feature independently

⚠️ Remember:
- Merge frequently to main
- Watch for conflicts in shared files
- If stuck, just do features sequentially

Go build! 🚀
```

---

## Troubleshooting

### "Branch already exists"
The feature branch exists. Either:
```bash
git worktree add ../my-app-auth -b feature/auth  # Create new
# OR
git worktree add ../my-app-auth feature/auth     # Use existing
```

### "Worktree already checked out"
That branch is already in a worktree:
```bash
git worktree list  # Find where
```

### "Merge conflict I can't resolve"
Abort and do features sequentially:
```bash
git merge --abort
```

### "Everything is broken"
Nuclear option — delete worktrees, start fresh:
```bash
git worktree remove --force ../my-app-auth
git worktree remove --force ../my-app-dashboard
# etc.
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
