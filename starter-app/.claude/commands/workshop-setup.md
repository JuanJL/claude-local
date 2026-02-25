# /workshop-setup - Install Workshop Skills & Agents Globally

You are setting up the Claude Code Masterclass environment for a workshop participant. This installs skills, agents, and configuration globally so they work across all their projects.

## Your Mission

Install the workshop skills AND agents to the user's global Claude Code configuration so they have enhanced capabilities throughout the workshop.

---

## Step 1: Detect Operating System

First, determine if the user is on macOS or Windows:

**macOS/Linux:**
```bash
echo $HOME
```

**Windows (PowerShell):**
```powershell
echo $env:USERPROFILE
```

---

## Step 2: Create Global Directories

**macOS/Linux:**
```bash
mkdir -p ~/.claude/skills
mkdir -p ~/.claude/commands
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\commands"
```

---

## Step 3: Copy Workshop Skills

Copy all skills from the course materials to the global location:

**macOS/Linux:**
```bash
cp -r skills/* ~/.claude/skills/
```

**Windows (PowerShell):**
```powershell
Copy-Item -Path "skills\*" -Destination "$env:USERPROFILE\.claude\skills\" -Recurse -Force
```

---

## Step 4: Copy Workshop Agents (Commands)

Copy all agents from the course materials to global commands:

**macOS/Linux:**
```bash
cp agents/*.md ~/.claude/commands/
```

**Windows (PowerShell):**
```powershell
Copy-Item -Path "agents\*.md" -Destination "$env:USERPROFILE\.claude\commands\" -Recurse -Force
```

---

## Step 5: Copy Alias Commands

Copy the alias commands so shortcuts work:

**macOS/Linux:**
```bash
cp .claude/commands/review.md ~/.claude/commands/
cp .claude/commands/design-check.md ~/.claude/commands/
cp .claude/commands/debug.md ~/.claude/commands/
cp .claude/commands/build.md ~/.claude/commands/
```

**Windows (PowerShell):**
```powershell
Copy-Item -Path ".claude\commands\review.md" -Destination "$env:USERPROFILE\.claude\commands\"
Copy-Item -Path ".claude\commands\design-check.md" -Destination "$env:USERPROFILE\.claude\commands\"
Copy-Item -Path ".claude\commands\debug.md" -Destination "$env:USERPROFILE\.claude\commands\"
Copy-Item -Path ".claude\commands\build.md" -Destination "$env:USERPROFILE\.claude\commands\"
```

---

## Step 6: Verify Installation

List the installed files:

**macOS/Linux:**
```bash
echo "=== Skills ===" && ls ~/.claude/skills/
echo "=== Agents/Commands ===" && ls ~/.claude/commands/
```

**Windows (PowerShell):**
```powershell
Write-Host "=== Skills ===" && Get-ChildItem "$env:USERPROFILE\.claude\skills"
Write-Host "=== Commands ===" && Get-ChildItem "$env:USERPROFILE\.claude\commands"
```

---

## Step 7: Confirm to User

Once complete, tell them:

---

**Workshop Setup Complete!**

Your Claude Code is now enhanced with:

**Skills (enhance Claude's knowledge):**
- `design-principles.md` - Visual design best practices
- `gsap-animation-patterns.md` - Professional animation techniques
- `form-patterns.md` - Form UX patterns
- `component-patterns.md` - React component patterns

**Agents (slash commands):**
- `/product-owner` - Break down projects into epics and stories
- `/frontend-lead` - Build UI with design thinking
- `/backend-lead` - Make smart database choices
- `/review` - Code review like a senior engineer
- `/design-check` - Ensure UI looks professional
- `/debug` - Methodically diagnose errors
- `/build` - Build complete features

**These are now available globally** - use them in any project!

**Next Step:** Type `/start-module-1` to begin the workshop!

---

## Troubleshooting

### Permission Denied (macOS/Linux)
```bash
chmod 755 ~/.claude
chmod 755 ~/.claude/skills
```

### Directory Not Found (Windows)
Make sure you're running PowerShell as Administrator if needed.

### Skills Not Working
Restart Claude Code after installation:
1. Close the terminal
2. Reopen and navigate to your project
3. Skills should now be active

---

## What These Skills Do

| Skill | What It Teaches Claude |
|-------|----------------------|
| Design Principles | Generous whitespace, ONE accent color, visual hierarchy |
| GSAP Animations | Scroll triggers, staggers, timelines |
| Form Patterns | Input styling, validation, accessibility |
| Component Patterns | Composition, props, performance |
| Landing Page | Hero design, CTAs, social proof |

---

*Skills will enhance Claude Code's output throughout the workshop!*
