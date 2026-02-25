# /start-pro-gsd - GSD: Get Stuff Done Workflow

You are teaching an experienced developer about the **GSD (Get Stuff Done)** workflow — a structured project execution framework for Claude Code that brings engineering discipline to AI-assisted development.

## Context: $ARGUMENTS

---

## What is GSD?

> **GSD turns "vibe coding" into structured engineering.**
>
> Instead of randomly prompting and hoping, GSD enforces: roadmaps → phases → plans → execution → verification.

Think of it as the difference between:

| Without GSD | With GSD |
|-------------|----------|
| "Build me an app" | Roadmap with 8 phases, each planned and verified |
| Random prompting | Structured research → plan → execute → verify cycle |
| Hope it works | Verification gates before moving on |
| One big messy commit | Atomic commits per task |
| "Is this done?" | Goal-backward verification against original intent |

---

## The GSD Cycle

```
┌──────────────────────────────────────────────────┐
│                 THE GSD CYCLE                      │
├──────────────────────────────────────────────────┤
│                                                    │
│  1. NEW PROJECT                                    │
│     /gsd:new-project                               │
│     → Deep context gathering                       │
│     → Research domain ecosystem                    │
│     → Create PROJECT.md                            │
│     → Generate roadmap with phases                 │
│                                                    │
│  2. PLAN A PHASE                                   │
│     /gsd:plan-phase                                │
│     → Research how to implement                    │
│     → Create detailed execution plan               │
│     → Verify plan quality before executing         │
│                                                    │
│  3. EXECUTE                                        │
│     /gsd:execute-phase                             │
│     → Wave-based parallel execution                │
│     → Atomic commits per task                      │
│     → Deviation handling                           │
│                                                    │
│  4. VERIFY                                         │
│     /gsd:verify-work                               │
│     → Conversational UAT                           │
│     → Goal-backward analysis                       │
│     → Does what we built match the phase goal?     │
│                                                    │
│  5. PROGRESS CHECK                                 │
│     /gsd:progress                                  │
│     → See what's done, what's next                 │
│     → Route to next action                         │
│                                                    │
│  Repeat 2-5 for each phase until complete          │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

## All GSD Commands

### Project Setup
| Command | What It Does |
|---------|--------------|
| `/gsd:new-project` | Initialize project with deep context, create roadmap |
| `/gsd:new-milestone` | Start a new milestone cycle |
| `/gsd:map-codebase` | Analyze existing codebase with parallel mapper agents |

### Planning
| Command | What It Does |
|---------|--------------|
| `/gsd:plan-phase` | Research + create detailed execution plan for a phase |
| `/gsd:discuss-phase` | Gather context through adaptive questioning before planning |
| `/gsd:research-phase` | Research how to implement (standalone) |
| `/gsd:list-phase-assumptions` | Surface assumptions about approach before planning |

### Execution
| Command | What It Does |
|---------|--------------|
| `/gsd:execute-phase` | Execute plans with wave-based parallelization |
| `/gsd:quick` | Quick task with GSD guarantees (atomic commits) but skip optional agents |

### Verification & Progress
| Command | What It Does |
|---------|--------------|
| `/gsd:verify-work` | Validate built features through conversational UAT |
| `/gsd:progress` | Check project status, route to next action |
| `/gsd:audit-milestone` | Audit milestone completion against original intent |
| `/gsd:complete-milestone` | Archive completed milestone |

### Project Management
| Command | What It Does |
|---------|--------------|
| `/gsd:add-phase` | Add phase to end of current milestone |
| `/gsd:insert-phase` | Insert urgent work between existing phases |
| `/gsd:remove-phase` | Remove a future phase from roadmap |
| `/gsd:add-todo` | Capture idea/task as todo |
| `/gsd:check-todos` | List pending todos |
| `/gsd:plan-milestone-gaps` | Create phases to close all identified gaps |

### Session Management
| Command | What It Does |
|---------|--------------|
| `/gsd:pause-work` | Create context handoff when pausing mid-phase |
| `/gsd:resume-work` | Resume work with full context restoration |
| `/gsd:debug` | Systematic debugging with persistent state |

### Meta
| Command | What It Does |
|---------|--------------|
| `/gsd:help` | Show all available GSD commands |
| `/gsd:settings` | Configure workflow toggles and model profile |
| `/gsd:set-profile` | Switch model profile (quality/balanced/budget) |
| `/gsd:update` | Update GSD to latest version |

---

## When to Use GSD vs Manual

| Use GSD when... | Use manual when... |
|-----------------|-------------------|
| Multi-phase project (3+ features) | Quick one-off task |
| You want structured execution | You want to explore/experiment |
| Multiple people need to understand progress | Solo quick build |
| You need verification gates | Prototyping and iterating fast |
| The project will span multiple sessions | Single-session work |

---

## Getting Started with GSD

### Installation

GSD is a Claude Code extension. Install it:

```bash
# Check if GSD is available
/gsd:help
```

If not installed, visit: **github.com/glittercowboy/gsd**

### Your First GSD Project

Try it on your masterclass app:

```
/gsd:new-project

# GSD will ask you questions about:
# - What are you building?
# - Who is the target user?
# - What's the MVP scope?
# - What tech stack?
#
# Then it creates:
# - PROJECT.md with full context
# - Roadmap with phases
# - Ready to plan Phase 1
```

### Then Plan Your First Phase

```
/gsd:plan-phase

# GSD will:
# - Research how to implement the phase
# - Create a detailed plan with tasks
# - Verify the plan before execution
# - Ask for your approval
```

### Execute It

```
/gsd:execute-phase

# GSD will:
# - Execute tasks in waves (parallel where safe)
# - Make atomic commits per task
# - Handle deviations gracefully
# - Report what succeeded/failed
```

### Verify the Work

```
/gsd:verify-work

# GSD will:
# - Check if what was built matches the phase goal
# - Run through acceptance criteria
# - Flag any gaps
```

---

## GSD + Agent Teams

GSD works beautifully with the `@team-lead` agent:

```
Phase 1: Data Model (GSD plans, @backend-lead builds)
Phase 2: Core UI (GSD plans, @team-lead coordinates frontend + backend agents)
Phase 3: Polish (GSD plans, @creative-director + @style-fixer build)
Phase 4: Ship (GSD plans, @ship-check verifies, deploy to Vercel)
```

Each phase gets planned, executed, and verified before moving on. No more "I think this is done, maybe?"

---

## Key Insight

> **GSD is not about going slower. It's about going faster with confidence.**
>
> When every phase is planned, executed, and verified — you never waste time building the wrong thing or missing edge cases.

---

## Try It Now

```
/gsd:new-project
```

Or if you already have a project set up:

```
/gsd:progress
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
