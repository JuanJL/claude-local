# /clone-hero - Clone Competitor Hero Sections 1:1

You are helping an **expert developer** (🌳) reverse-engineer and rebuild a competitor's hero section. This is a professional-level workflow combining scraping, visual analysis, and precise implementation.

## Target URL: $ARGUMENTS

---

## ⚠️ Expert Technique Warning

> "This is an **advanced workflow** for experienced developers. We'll:
> - Scrape the competitor's hero section
> - Analyze every visual detail
> - Extract the exact colors, spacing, and animations
> - Rebuild it 1:1 in your codebase
>
> **You'll learn:** How world-class sites structure their heroes."

---

## Phase 1: Visual Reconnaissance

### Step 1.1: Screenshot & Structure Analysis

Use BrowserMCP to capture the hero:

```
ACTIONS:
1. Navigate to the target URL
2. Take a full-page screenshot
3. Take a viewport screenshot (above-the-fold)
4. Identify the hero section boundaries
```

**Capture details:**
- Full hero section (desktop viewport: 1440px)
- Mobile hero (375px viewport)
- Any scroll-triggered animations

### Step 1.2: Element Inventory

Create a detailed inventory:

```markdown
## Hero Element Inventory

### Layout Structure
- [ ] Container: [full-width/constrained]
- [ ] Grid: [columns, gap]
- [ ] Max-width: [px]
- [ ] Padding: [top/bottom/left/right]

### Typography
- [ ] H1: [font-family, size, weight, line-height, letter-spacing]
- [ ] Subtitle: [font-family, size, weight, line-height]
- [ ] Body: [font-family, size]

### Colors
- [ ] Background: [#hex or gradient]
- [ ] Text primary: [#hex]
- [ ] Text secondary: [#hex]
- [ ] Accent: [#hex]

### Visual Elements
- [ ] Hero image: [position, size, treatment]
- [ ] Background: [solid/gradient/image/video]
- [ ] Decorative elements: [blobs, shapes, patterns]

### Interactive Elements
- [ ] Primary CTA: [text, style, hover state]
- [ ] Secondary CTA: [text, style, hover state]
- [ ] Any additional links/actions

### Animations
- [ ] Entrance animations: [fade, slide, scale]
- [ ] Scroll-triggered: [parallax, reveal]
- [ ] Micro-interactions: [button hover, cursor effects]
```

---

## Phase 2: Deep Visual DNA Extraction

### Step 2.1: Color Analysis

Extract the EXACT color palette:

```typescript
// Color extraction structure
const heroColors = {
  background: {
    type: 'solid' | 'gradient' | 'image',
    value: '#XXXXXX' | 'linear-gradient(...)',
    overlay: 'rgba(0,0,0,0.X)' // if applicable
  },
  text: {
    primary: '#XXXXXX',
    secondary: '#XXXXXX',
    muted: '#XXXXXX'
  },
  accent: {
    primary: '#XXXXXX',
    hover: '#XXXXXX'
  },
  borders: '#XXXXXX',
  shadows: 'rgba(0,0,0,0.X)'
}
```

### Step 2.2: Typography DNA

Extract typography with precision:

```typescript
const heroTypography = {
  h1: {
    fontFamily: "'Font Name', fallback",
    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textTransform: 'none' | 'uppercase'
  },
  subtitle: {
    fontFamily: "'Font Name', fallback",
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 'normal',
    color: 'text.secondary'
  }
}
```

### Step 2.3: Spacing System

Identify the spacing rhythm:

```typescript
const heroSpacing = {
  container: {
    maxWidth: '1280px',
    paddingX: 'clamp(1rem, 5vw, 4rem)',
    paddingY: 'clamp(4rem, 10vh, 8rem)'
  },
  elements: {
    headlineToSubtitle: '1.5rem',
    subtitleToCta: '2rem',
    ctaGap: '1rem'
  }
}
```

---

## Phase 3: Animation Forensics

### Step 3.1: Detect Animation Library

Check for these patterns:

```javascript
// Check page for animation libraries
const detectedLibraries = {
  gsap: window.gsap !== undefined,
  framerMotion: document.querySelector('[data-framer-appear-id]'),
  lenis: window.lenis !== undefined,
  scrollTrigger: window.ScrollTrigger !== undefined,
  anime: window.anime !== undefined
}
```

### Step 3.2: Document Animation Sequence

Create a timeline:

```markdown
## Animation Timeline

### On Page Load (0ms - 1000ms)
1. **0ms**: Background fades in (opacity 0 → 1, 500ms)
2. **200ms**: H1 slides up (y: 30px → 0, 600ms, ease: power3.out)
3. **400ms**: Subtitle fades in (opacity 0 → 1, 400ms)
4. **600ms**: CTA buttons stagger in (x: -20px → 0, 300ms each)

### On Scroll
- **Parallax**: Hero image moves at 0.5x scroll speed
- **Fade out**: Hero fades at scroll > 50vh
```

### Step 3.3: Extract Animation Code

If possible, grab the actual animation code:

```javascript
// Typical GSAP hero animation pattern
gsap.timeline()
  .from('.hero-h1', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-cta', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4
  }, '-=0.3')
```

---

## Phase 4: Rebuild Implementation

### Step 4.1: Create Hero Component

```typescript
// src/components/hero/ClonedHero.tsx
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface HeroProps {
  headline: string
  subtitle: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export function ClonedHero({
  headline,
  subtitle,
  primaryCta,
  secondaryCta
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation implementation here
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="hero"
      style={{
        // Exact extracted styles
      }}
    >
      {/* Implementation */}
    </section>
  )
}
```

### Step 4.2: Implement Styles

Convert extracted values to Tailwind or CSS:

```tsx
// Option 1: Tailwind (if values map to scale)
<section className="
  min-h-screen
  flex items-center justify-center
  px-4 md:px-8 lg:px-16
  py-24 md:py-32
  bg-gradient-to-b from-slate-900 to-slate-950
">

// Option 2: Custom CSS (for exact values)
<section
  className="hero"
  style={{
    minHeight: '100vh',
    padding: 'clamp(4rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)',
    background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)'
  }}
>
```

### Step 4.3: Add Animations

Implement the exact animation sequence:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-headline', {
      y: 50,
      opacity: 0,
      duration: 0.8
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-cta', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4
    }, '-=0.3')
  }, heroRef)

  return () => ctx.revert()
}, [])
```

---

## Phase 5: Quality Check

### Side-by-Side Comparison

```markdown
## Clone Quality Checklist

### Visual Fidelity
- [ ] Colors match exactly (use color picker)
- [ ] Typography is identical (font, size, weight)
- [ ] Spacing feels the same
- [ ] Layout matches on desktop, tablet, mobile

### Animation Match
- [ ] Entrance animations replicate the timing
- [ ] Easing curves feel the same
- [ ] Scroll behaviors match
- [ ] Micro-interactions work

### Responsive Behavior
- [ ] Desktop (1440px): ✅
- [ ] Tablet (768px): ✅
- [ ] Mobile (375px): ✅

### Performance
- [ ] No layout shift (CLS)
- [ ] Animations are 60fps
- [ ] Images are optimized
```

---

## Output: Clone Report

After completing, generate:

```markdown
# Hero Clone Report: [Source URL]

## Visual DNA Extracted
- Color Palette: [hex codes]
- Typography: [fonts, sizes]
- Spacing: [values]
- Animations: [library, timings]

## Implementation
- Component: `src/components/hero/ClonedHero.tsx`
- Styles: [Tailwind classes or custom CSS]
- Animations: [GSAP/Framer Motion code]

## Deviations
- [Any intentional changes from original]

## Lessons Learned
- [What makes this hero effective]
- [Techniques to remember]
```

---

## Pro Tips for Experts

### 1. Use DevTools Performance Tab
Record the page load to see exact animation timings.

### 2. Extract Computed Styles
```javascript
getComputedStyle(document.querySelector('.hero h1'))
```

### 3. Check for Variable Fonts
Many premium sites use variable fonts with custom weights.

### 4. Watch for Intersection Observer
Modern heroes often trigger animations on scroll using IO.

### 5. Don't Just Copy — Understand
The goal isn't plagiarism; it's learning WHY their hero works.

---

*Part of the Claude Code Masterclass — Barcelona 2026*
