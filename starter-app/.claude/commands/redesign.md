# /redesign - Make It Beautiful

You are helping a workshop participant transform their generic-looking UI into something award-worthy. **No more "AI default" aesthetic!**

## What They Want to Redesign: $ARGUMENTS

---

## Your Mission

Take their existing component/page and elevate it to Awwwards quality. Never settle for "good enough."

---

## Step 1: Understand the Context

First, ask:

> "Before we redesign, let me understand:
>
> 1. **What is it?** (landing page, dashboard, form, card, etc.)
> 2. **Who is it for?** (developers, designers, general consumers, enterprise)
> 3. **What vibe do you want?** (playful, premium, minimal, bold, technical)
> 4. **Any sites you love?** (share links or just names)"

---

## Step 2: Find Inspiration

Based on their answer, point them to the BEST references:

### For Landing Pages
- **[Vercel](https://vercel.com)** — Bold, confident, developer-focused
- **[Linear](https://linear.app)** — Clean, purposeful, product-focused
- **[Stripe](https://stripe.com)** — Premium, trustworthy, detailed
- **[Raycast](https://raycast.com)** — Dense, powerful, technical

### For Dashboards
- **[Linear App](https://linear.app)** — The gold standard
- **[Notion](https://notion.so)** — Clean, flexible
- **[Vercel Dashboard](https://vercel.com/dashboard)** — Technical, information-dense

### For SaaS Products
- **[Clerk](https://clerk.com)** — Friendly, approachable
- **[Resend](https://resend.com)** — Modern, developer-first
- **[Supabase](https://supabase.com)** — Technical but welcoming

### For Creative/Portfolio
- **[Awwwards](https://awwwards.com)** — Daily inspiration
- **[Godly](https://godly.website)** — Curated excellence
- **[Codrops](https://tympanus.net/codrops)** — Creative experiments

> "Let me show you 2-3 specific examples that match your vibe..."

---

## Step 3: Diagnose Current Problems

Look at their current design and identify issues:

### Common "AI Default" Problems

| Problem | What It Looks Like | Fix |
|---------|-------------------|-----|
| **Generic colors** | Blue buttons, gray backgrounds | Pick a unique accent color |
| **No breathing room** | Everything cramped together | 2-3x more whitespace |
| **Too many fonts** | 3+ different typefaces | Max 2 fonts, one for headings |
| **Stock shadows** | `shadow-md` everywhere | Custom, subtle shadows or none |
| **Boring borders** | Gray borders around everything | Remove most borders, use spacing |
| **Generic icons** | Default Lucide/Heroicons style | Consistent icon set, custom if possible |
| **No hierarchy** | Everything same visual weight | Clear primary/secondary/tertiary |
| **Safe colors** | Gray, blue, white only | One bold accent, use it sparingly |

---

## Step 4: Apply Design Principles

### The 60-30-10 Rule
```
60% — Primary (background, large areas)
30% — Secondary (cards, sections)
10% — Accent (buttons, links, highlights)
```

### Typography Hierarchy
```
Heading 1:  48-72px  Bold
Heading 2:  32-40px  Semibold
Body:       16-18px  Regular
Caption:    12-14px  Regular, muted
```

### Spacing Scale (8-point grid)
```
xs:   8px
sm:   16px
md:   24px
lg:   32px
xl:   48px
2xl:  64px
```

### Color Confidence
```
DO:   One bold accent used consistently
DON'T: Multiple accent colors competing
```

---

## Step 5: Premium Touches

These small details separate amateur from professional:

### Micro-Interactions
```typescript
// Hover states that feel premium
className="transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"

// Button press feedback
className="active:scale-[0.98]"

// Smooth focus states
className="focus:ring-2 focus:ring-offset-2 focus:ring-accent"
```

### Typography Refinements
```css
/* Better letter spacing for headings */
letter-spacing: -0.02em;

/* Comfortable line height for body */
line-height: 1.6;

/* Readable paragraph widths */
max-width: 65ch;
```

### Subtle Depth
```typescript
// Instead of harsh shadows
className="shadow-sm border border-gray-100"

// Glass effect (if fits the vibe)
className="bg-white/80 backdrop-blur-sm"

// Gradient text (sparingly!)
className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
```

### Animation Polish
```typescript
// Stagger children for elegance
import { stagger, animate } from "framer-motion"

// Smooth page transitions
className="animate-in fade-in duration-500"

// Satisfying button feedback
whileTap={{ scale: 0.98 }}
```

---

## Step 6: Before/After Checklist

Before shipping, verify:

### ❌ Red Flags (Go Back)
- [ ] Looks like it could be any app
- [ ] Could mistake it for a template
- [ ] No clear visual personality
- [ ] Default everything (shadows, colors, spacing)
- [ ] Cluttered, cramped layout
- [ ] No hover/focus states

### ✅ Green Flags (Ship It!)
- [x] Someone would screenshot this
- [x] Clear brand personality
- [x] Intentional whitespace
- [x] Consistent accent color usage
- [x] Delightful micro-interactions
- [x] Typography has character
- [x] Could win an Awwward (aim high!)

---

## Step 7: Implementation

Now let's actually apply the changes. I'll:

1. **Audit** your current component
2. **Propose** 2-3 design directions
3. **Show** before/after comparisons
4. **Implement** the chosen direction

> "Let me see your current code and I'll show you exactly what to change..."

---

## Quick Wins (Apply These Now)

### Instant Improvements

```typescript
// Before: Generic card
<div className="bg-white border rounded-lg p-4 shadow">

// After: Premium card
<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6
               border border-gray-100 shadow-sm
               hover:shadow-md transition-all duration-200">
```

```typescript
// Before: Basic button
<button className="bg-blue-500 text-white px-4 py-2 rounded">

// After: Premium button
<button className="bg-gradient-to-b from-accent to-accent-dark
                   text-white px-6 py-3 rounded-xl font-medium
                   shadow-lg shadow-accent/20
                   hover:shadow-xl hover:scale-[1.02]
                   active:scale-[0.98]
                   transition-all duration-200">
```

```typescript
// Before: Cramped layout
<div className="space-y-4">

// After: Breathing room
<div className="space-y-8 md:space-y-12">
```

---

## Success Message

```
✨ Redesign Complete!

Changes made:
→ [List specific changes]
→ [What was improved]
→ [New design system elements]

Your app now:
- Has a clear visual identity
- Uses consistent spacing/colors
- Includes delightful micro-interactions
- Would make people ask "who designed this?"

📸 Screenshot it! Share it! Be proud of it!

What else should we make beautiful?
```

---

## Design Resources

### Color Palette Generators
- **[Realtime Colors](https://realtimecolors.com)** — See colors in context
- **[Coolors](https://coolors.co)** — Generate palettes
- **[Happy Hues](https://happyhues.co)** — Curated palettes with examples

### Typography
- **[Fontshare](https://fontshare.com)** — Free quality fonts
- **[Google Fonts](https://fonts.google.com)** — The classic
- **[Type Scale](https://typescale.com)** — Calculate font sizes

### Icons
- **[Lucide](https://lucide.dev)** — Clean, consistent (default)
- **[Phosphor](https://phosphoricons.com)** — Flexible, beautiful
- **[Heroicons](https://heroicons.com)** — By Tailwind team

### Inspiration
- **[Awwwards](https://awwwards.com)** — Award-winning sites
- **[Godly](https://godly.website)** — Curated excellence
- **[Dribbble](https://dribbble.com)** — UI shots

---

*Part of the Claude Code Masterclass — Barcelona 2026*
