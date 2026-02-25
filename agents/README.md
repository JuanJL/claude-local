# Claude Code Agents

These agents are AI personas that specialize in different aspects of development. Copy them to your `.claude/commands/` folder to use as slash commands.

## Installation

```bash
# Copy all agents to your project
cp agents/*.md .claude/commands/

# Or copy to global (all projects)
cp agents/*.md ~/.claude/commands/
```

## Available Agents

### Core Team (Use These Daily)

| Agent | File | Use For |
|-------|------|---------|
| **Product Owner** | `product-owner.md` | Breaking down features into epics, stories, acceptance criteria |
| **Frontend Lead** | `frontend-lead.md` | UI/UX decisions, component design, avoiding AI-style |
| **Backend Lead** | `backend-lead.md` | Database choices (Supabase vs Convex), state management |

### Specialists (Use As Needed)

| Agent | File | Use For |
|-------|------|---------|
| **Feature Builder** | `feature-builder.md` | Building new features step-by-step |
| **Code Review** | `code-review.md` | Security audits, performance checks, pre-deploy reviews |
| **Debug & Fix** | `debug-fix.md` | Understanding errors, finding root causes |
| **Design Analyst** | `design-analyst.md` | Extracting style from reference images |
| **Design Taste Guardian** | `design-taste-guardian.md` | Eliminating AI-generated aesthetic |

## Usage Examples

```bash
# Break down a feature into tickets
/product-owner Plan the user authentication feature

# Build a component with proper UX
/frontend-lead Build a pricing page - propose concepts first

# Choose the right database
/backend-lead Should I use Supabase or Convex for my chat app?

# Review before deploying
/code-review Run the pre-deploy checklist

# Fix a bug
/debug-fix I'm getting "hydration mismatch" errors

# Make it look professional
/design-taste-guardian This looks AI-generated, fix it
```

## Agent Workflow

```
YOU (Engineering Lead)
        ↓
┌───────────────────────────────────────┐
│           Your AI Team                │
├───────────────────────────────────────┤
│  👔 Product Owner  │  Plans & Stories │
│  🎨 Frontend Lead  │  UI & UX         │
│  ⚙️ Backend Lead   │  Data & APIs     │
│  🔨 Feature Builder│  Implementation  │
│  🔍 Code Review    │  Quality Check   │
│  🐛 Debug & Fix    │  Troubleshooting │
└───────────────────────────────────────┘
```

## The Philosophy

> **You don't write code. You LEAD a team that writes it.**

Each agent has:
- **Specialized knowledge** — Best practices for their domain
- **A workflow** — Steps they follow before acting
- **Clarifying questions** — They ask before assuming

---

*Part of the Claude Code Masterclass — Barcelona 2026*
