# /progress - See Your Course Progress

Shows where you are in the Claude Code Masterclass and what to do next.

## User Request: $ARGUMENTS

---

## What This Does

1. Detects what the user has completed based on project state
2. Shows a visual progress map
3. Recommends the next step
4. Offers quick actions

---

## Detection Logic

Check these indicators to determine progress:

```bash
# Check for project existence
ls package.json 2>/dev/null && echo "HAS_PROJECT"

# Check for git
ls .git 2>/dev/null && echo "HAS_GIT"

# Check for GitHub remote
git remote -v 2>/dev/null | grep -q "github.com" && echo "HAS_GITHUB"

# Check for Epic issue
gh issue list --label "epic" --limit 1 2>/dev/null | grep -q "EPIC" && echo "HAS_EPIC"

# Check for Feature issues
gh issue list --label "feature" --limit 1 2>/dev/null | grep -q "FEATURE" && echo "HAS_FEATURES"

# Check for auth setup (Clerk)
grep -r "ClerkProvider\|@clerk" src/ 2>/dev/null && echo "HAS_AUTH"

# Check for database setup (Supabase/Convex)
grep -r "supabase\|convex" src/ 2>/dev/null && echo "HAS_DATABASE"

# Check for Vercel deployment
ls .vercel 2>/dev/null && echo "HAS_DEPLOYMENT"
```

---

## Progress Map Display

Based on detection, show this visual:

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR COURSE PROGRESS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MODULE 0: Prerequisites                                        │
│  [✅] 0.1 What is Claude Code?                                  │
│  [✅] 0.2 Terminal Basics                                       │
│  [✅] 0.3 Installation Setup                                    │
│                                                                 │
│  MODULE 1: AI Fundamentals                                      │
│  [✅] 1.1 AI Fundamentals                                       │
│  [✅] 1.2 Claude Ecosystem                                      │
│  [✅] 1.3 Tentacles Superpower                                  │
│  [✅] 1.4 Agents, Skills & Hooks                                │
│  [✅] 1.5 Engineering Lead Mindset                              │
│  [✅] 1.6 Epic → Feature → Ticket                               │
│  [✅] 1.7 CLAUDE.md & Project Memory                            │
│                                                                 │
│  MODULE 2: Build Foundation                                     │
│  [✅] Project Created (/workshop-start)                         │
│  [✅] GitHub Setup (/github-init)                               │
│  [✅] Epic Created (/epic-create)                               │
│  [✅] Features Planned (/plan-features)                         │
│                                                                 │
│  MODULE 3: Build Features                    ← YOU ARE HERE     │
│  [⬜] 3.1 The Agent Advantage                                   │
│  [⬜] 3.2 Adding Authentication                                 │
│  [⬜] 3.3 Building Data Layer                                   │
│  [⬜] 3.4 Building the UI                                       │
│  [⬜] 3.5 Connecting Everything                                 │
│  [⬜] 3.6 Git Workflow & Review                                 │
│                                                                 │
│  MODULE 4: Premium Design                                       │
│  [⬜] 4.1 Design Philosophy                                     │
│  [⬜] 4.2 Typography & Color                                    │
│  [⬜] 4.3 Spacing & Whitespace                                  │
│  [⬜] 4.4 Animations & Polish                                   │
│                                                                 │
│  MODULE 5: Deploy & Launch                                      │
│  [⬜] 5.1 Pre-Deploy Checklist                                  │
│  [⬜] 5.2 Deploy to Vercel                                      │
│  [⬜] 5.3 Launch Celebration                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

📍 CURRENT: Module 3 — Building Features
🎯 NEXT: Type /start-3-1 to learn the Agent Advantage

Quick Actions:
• /next — Auto-continue to next lesson
• /work-on #2 — Start building Feature #2
• /start-3-1 — Begin Module 3 lessons
```

---

## State-Based Recommendations

| State | Recommendation |
|-------|----------------|
| No project | "Run `/workshop-start` to create your app!" |
| Project but no git | "Run `/github-init` to enable your safety net!" |
| Git but no Epic | "Run `/epic-create` to define your goal!" |
| Epic but no Features | "Run `/plan-features` to break down your work!" |
| Features exist | "Run `/start-3-1` to learn agent-based building!" |
| Auth set up | "Run `/start-3-3` to set up your database!" |
| Database set up | "Run `/start-3-4` to build your UI!" |
| UI complete | "Run `/start-4-1` to make it beautiful!" |
| Design complete | "Run `/start-5-1` to prepare for launch!" |
| Deployed | "🎉 You've completed the course! Run `/start-5-3` to celebrate!" |

---

## Adaptive Display

### For Beginners

Show the full visual with encouragement:

```
🌱 You're making great progress!

You've completed: 8 of 25 lessons (32%)
Current focus: Building your app foundation

Don't worry about the advanced stuff yet —
just type /next and I'll guide you!
```

### For Experienced Developers

Show compact view with options:

```
📊 Progress: Module 2 complete, starting Module 3

Quick paths:
• /start-3-1 — Follow lessons sequentially
• /work-on #2 — Jump straight to building
• /parallel-build — Build multiple features at once (advanced)
```

---

## Output Format

Always end with clear action:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 YOUR NEXT STEP:

Type: /start-3-1

This will teach you the Agent Advantage — how to build
features using specialized AI agents instead of doing
everything yourself.

Or type /next to auto-continue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Important Notes for Claude

- **Be encouraging** — Progress visualization motivates people
- **Don't overwhelm** — Show relevant section, not everything
- **Clear next action** — Always end with ONE clear command to type
- **Detect their style** — Beginners need hand-holding, experts need options

---

*Part of the Claude Code Masterclass — Barcelona 2026*
