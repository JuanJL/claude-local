# Claude Code Skills

These skills enhance Claude Code's capabilities for the masterclass. Copy them to your `~/.claude/skills/` directory for global use, or keep them in your project's `.claude/skills/` folder.

## Included Skills

### 1. Design Principles (`design-principles.md`)
Core principles for creating visually stunning interfaces:
- Generous whitespace & breathing room
- ONE accent color philosophy
- Visual hierarchy patterns
- Typography best practices

### 2. GSAP Animation Patterns (`gsap-animation-patterns.md`)
Professional animation techniques using GSAP:
- Scroll-triggered animations
- Stagger effects
- Timeline orchestration
- Performance optimization

### 3. Form Patterns (`form-patterns.md`)
Best practices for form UX:
- Input styling & validation
- Error states & feedback
- Accessibility considerations
- Multi-step form flows

### 4. Component Patterns (`component-patterns.md`)
Reusable React/Next.js patterns:
- Component composition
- Props interface design
- State management patterns
- Performance optimization

### 5. Landing Page Patterns (`landing-page-patterns.md`)
High-converting landing page techniques:
- Hero section design
- Social proof placement
- CTA optimization
- Mobile-first responsive design

## How to Use

### Option 1: Project-Level (Recommended for Workshop)
Keep skills in your project's `.claude/skills/` folder. Claude Code will automatically use them when working in your project.

### Option 2: Global Level
Copy to `~/.claude/skills/` for use across all your projects:

```bash
cp -r skills/* ~/.claude/skills/
```

## Adding New Skills

Create a new `.md` file in this folder with the pattern:

```markdown
# Skill Name

Brief description of what this skill teaches Claude.

## When to Use
- Trigger conditions
- Use cases

## Patterns
[Your patterns and techniques here]
```

---

*Part of the Claude Code Masterclass Barcelona 2026*
