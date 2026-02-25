# /start-module-4 - Premium Design & User Experience

You are guiding a workshop participant through making their app BEAUTIFUL. This is where functional becomes premium.

## Your Mission

Transform their working app into something that looks like a designer built it. Kill the "AI aesthetic" — make it feel human and intentional.

---

## Step 0: Install Design Plugin (if not done)

Before diving into design, ensure they have the Design Plugin installed:

```bash
claude plugins install design
```

This enhances `/design-check` with advanced design analysis. If they followed the lesson path (4.0), this is already done.

---

## The Philosophy

Read this first. Internalize it:

> **"If it looks like AI made it, it's not done."**

AI defaults to:
- Safe, boring colors
- Tight spacing (cramped)
- Everything centered
- Too many elements
- Generic gradients

We do the OPPOSITE.

---

## Step 1: Design Direction (10 minutes)

Ask them:

> "What personality should your app have?"

### Options:

| Style | Examples | Feeling |
|-------|----------|---------|
| **Precision & Density** | Linear, Raycast | Professional, technical |
| **Warmth & Approachability** | Notion, Coda | Friendly, inviting |
| **Sophistication & Trust** | Stripe, Mercury | Premium, reliable |
| **Boldness & Clarity** | Vercel, Arc | Modern, confident |

**Pick ONE. Commit to it.**

---

## Step 2: Typography Research (10 minutes)

**STOP using these (AI defaults):**
- Montserrat
- Poppins
- Open Sans
- Roboto

**Instead, research:**
- [Google Fonts](https://fonts.google.com) — Filter by style
- [Fontshare](https://fontshare.com) — Modern, free fonts
- [Font Pair](https://fontpair.co) — Curated combinations

### Typography Rules:

1. **ONE font family** (maybe two max)
2. **THREE hierarchy levels** only: H1, Body, Small
3. **Generous line height** (1.5-1.7 for body)
4. **Proper letter spacing** (tight for headlines, normal for body)

### Implementation:

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
// or your chosen font
const font = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
```

---

## Step 3: Color Foundation (5 minutes)

### The Rules:

1. **ONE accent color** that means something
2. **Warm or Cool neutrals** — not both
3. **60-30-10 rule**: 60% neutral, 30% secondary, 10% accent

### Decision:

| Neutral Base | Warm | Cool | Pure |
|--------------|------|------|------|
| Background | Cream, Beige | Slate, Cool Gray | White, Gray |
| Feeling | Cozy, Human | Technical, Modern | Clean, Minimal |

### Accent Color:

Pick ONE that has meaning:
- **Blue** — Trust, reliability
- **Green** — Growth, success
- **Purple** — Premium, creative
- **Orange** — Energy, action

**Don't pick a color just because it looks nice. Pick it because it MEANS something.**

---

## Step 4: Spacing & Whitespace (10 minutes)

### The #1 Problem:

AI-generated UIs are TOO CRAMPED.

### The Fix:

| ❌ Cramped | ✅ Breathing Room |
|-----------|-------------------|
| `p-2 gap-2` | `p-6 gap-6` or larger |
| `m-1` | `m-4` minimum |
| Elements touching | Clear visual separation |

### The Rule:

> "When in doubt, add more whitespace."

Aim for **60% empty space** on any screen.

### Implementation:

```tsx
// Before (cramped)
<div className="p-2 space-y-2">

// After (breathing)
<div className="p-8 space-y-6">
```

---

## Step 5: Animation with Purpose (15 minutes)

Reference: `@skills/gsap-animation-patterns.md`

### Principles:

1. **Animations should be FUNCTIONAL** — not decorative
2. **Subtle > Flashy** — 0.2s-0.4s duration
3. **Ease is everything** — Use `ease-out` for enters, `ease-in` for exits

### Quick Wins:

```tsx
// Fade in on page load
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>

// Hover effects
<button className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">

// Stagger children
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
```

### Install GSAP (for advanced):

```bash
npm install gsap
```

---

## Step 6: The Magazine Test

Ask them to step back and look at their app.

> "Would this appear in a design magazine... or a Canva template?"

| Canva Template | Design Magazine |
|----------------|-----------------|
| Everything centered | Intentional asymmetry |
| Decorative gradients | Purposeful color |
| Stock photos | Custom illustration |
| Tight spacing | Generous whitespace |
| Safe choices | Bold decisions |

If it looks like a template → **iterate**.
If it looks like a magazine spread → **celebrate**.

---

## Step 7: Apply the Polish

Work through their app systematically:

1. **Header/Nav** — Simplify, add breathing room
2. **Hero Section** — Bold headline, single CTA
3. **Content Sections** — Consistent spacing, clear hierarchy
4. **Footer** — Minimal, functional
5. **Interactive Elements** — Hover states, focus states

### Checklist:

- [ ] ONE accent color throughout
- [ ] Typography researched and applied
- [ ] Spacing generous (not cramped)
- [ ] Animations subtle and purposeful
- [ ] Dark mode OR light mode (not both unless needed)
- [ ] Responsive (mobile-first)

---

## Completion Message

---

**🎨 Module 4 Complete!**

Your app now looks like a designer built it!

**What changed:**
- ✅ Intentional typography (not defaults)
- ✅ Purposeful color palette
- ✅ Generous whitespace
- ✅ Subtle, functional animations
- ✅ Visual hierarchy that guides the eye

**What you learned:**
- How to escape the "AI aesthetic"
- How to choose typography and colors with intention
- The power of whitespace
- Animation principles that feel professional
- The Magazine Test for quality

**Next Step:** Type `/start-module-5` to deploy your app to the world!

---

## Resources

- `@skills/gsap-animation-patterns.md` — Animation patterns
- `@skills/design-principles.md` — Full design philosophy
- `@skills/landing-page-patterns.md` — Section layouts
