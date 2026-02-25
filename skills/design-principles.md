---
name: design-principles
description: A creative philosophy for building award-worthy interfaces. This skill teaches discovery over defaults — research fonts, study references, create editorial layouts. The goal is distinctive design that passes the Magazine Test, not safe templates that scream "AI-generated."
---

# Design Principles

**This is a philosophy, not a checklist.**

The difference between AI-generated design and Awwwards-worthy design is the creative process. AI defaults to safe patterns. Designers discover what fits each specific project through research and intentional choices.

This skill teaches you to think like a design director: research typography for each project, create editorial layouts with visual hierarchy, and question every default. The goal is distinctive work that couldn't have been made by anyone else for any other project.

## Design Direction (REQUIRED)

**Before writing any code, commit to a design direction.** Don't default. Think about what this specific product needs to feel like.

### Think About Context

- **What does this product do?** A finance tool needs different energy than a creative tool.
- **Who uses it?** Power users want density. Occasional users want guidance.
- **What's the emotional job?** Trust? Efficiency? Delight? Focus?
- **What would make this memorable?** Every product has a chance to feel distinctive.

### Choose a Personality

Enterprise/SaaS UI has more range than you think. Consider these directions:

**Precision & Density** — Tight spacing, monochrome, information-forward. For power users who live in the tool. Think Linear, Raycast, terminal aesthetics.

**Warmth & Approachability** — Generous spacing, soft shadows, friendly colors. For products that want to feel human. Think Notion, Coda, collaborative tools.

**Sophistication & Trust** — Cool tones, layered depth, financial gravitas. For products handling money or sensitive data. Think Stripe, Mercury, enterprise B2B.

**Boldness & Clarity** — High contrast, dramatic negative space, confident typography. For products that want to feel modern and decisive. Think Vercel, minimal dashboards.

**Utility & Function** — Muted palette, functional density, clear hierarchy. For products where the work matters more than the chrome. Think GitHub, developer tools.

**Data & Analysis** — Chart-optimized, technical but accessible, numbers as first-class citizens. For analytics, metrics, business intelligence.

Pick one. Or blend two. But commit to a direction that fits the product.

### Choose a Color Foundation

**Don't default to warm neutrals.** Consider the product:

- **Warm foundations** (creams, warm grays) — approachable, comfortable, human
- **Cool foundations** (slate, blue-gray) — professional, trustworthy, serious
- **Pure neutrals** (true grays, black/white) — minimal, bold, technical
- **Tinted foundations** (slight color cast) — distinctive, memorable, branded

**Light or dark?** Dark modes aren't just light modes inverted. Dark feels technical, focused, premium. Light feels open, approachable, clean. Choose based on context.

**Accent color** — Pick ONE that means something. Blue for trust. Green for growth. Orange for energy. Violet for creativity. Don't just reach for the same accent every time.

### Choose a Layout Approach

The content should drive the layout:

- **Dense grids** for information-heavy interfaces where users scan and compare
- **Generous spacing** for focused tasks where users need to concentrate
- **Sidebar navigation** for multi-section apps with many destinations
- **Top navigation** for simpler tools with fewer sections
- **Split panels** for list-detail patterns where context matters

### Choose Typography (RESEARCH REQUIRED)

Typography is the soul of design. **Never default to safe choices.**

**Before selecting a font, research:**
1. Browse [fonts.google.com](https://fonts.google.com), [fontshare.com](https://fontshare.com), [atipofoundry.com](https://atipofoundry.com)
2. Look at Awwwards sites in the same category — what fonts create the vibe you need?
3. Consider: Does this font have personality? Would a design director choose this, or an AI?
4. Test it: Does the font make the design feel distinctive or generic?

**Typography philosophy by mood:**
- **Technical precision** — Look for geometric sans with tight metrics, monospace influence
- **Human warmth** — Explore humanist sans with open counters, friendly terminals
- **Editorial gravitas** — Research modern serifs, transitional typefaces
- **Brand distinction** — Find fonts with unique character that competitors don't use

**The discovery process matters.** Spending 15 minutes browsing font foundries yields better results than picking from a memorized list. Each project deserves its own typography research.

---

## Core Craft Principles

These apply regardless of design direction. This is the quality floor.

### CRITICAL RULES (Read First)

**These are HARD rules. Not suggestions. Violating them = AI-generated template look.**

#### 1. ONE Accent Color Only
```
WRONG: Pink icon, purple icon, orange icon, teal icon (rainbow = AI template)
RIGHT: All icons use the same amber-500 accent color
```
Pick ONE accent color for the entire interface. Every icon, button, highlight uses that ONE color. Multiple accent colors = Canva template vibes.

#### 2. No Decorative Gradients
```
WRONG: bg-gradient-to-r from-amber-500 to-orange-500
RIGHT: bg-amber-500
```
Solid colors only. Gradients allowed ONLY for functional overlays (fade to transparent).

#### 3. Color for Meaning, Gray for Structure
```
WRONG: Each card has a different colored tint/background
RIGHT: All cards are neutral (slate-800/900), accent color only on interactive elements
```
Gray builds structure. Color ONLY for: buttons, links, status indicators. NOT for decoration.

#### 4. Neutral Card Backgrounds
```
WRONG: Card with pink tint, card with purple tint, card with orange tint
RIGHT: All cards same neutral background (bg-slate-800 or bg-white)
```
Cards should be consistent. Hierarchy comes from spacing and typography, not background colors.

#### 5. NO Symmetric Grid Layouts
```
WRONG: 2x2 grid of identical cards, all same size, same structure
WRONG: 4 testimonials in equal boxes, each with circle avatar + quote + name
RIGHT: One large featured item (60%), smaller varied supporting items (40%)
RIGHT: Asymmetric editorial layout with visual hierarchy
```
Symmetric grids are the #1 AI template tell. Real designers create **visual hierarchy** through size variation and asymmetry.

**The Editorial Test:** Would this look at home in a magazine? If not, it's probably a template.

#### 6. Typography Requires Research, Not Defaults
```
WRONG: Picking Montserrat/Poppins/Roboto because they're "safe"
WRONG: Using the same font you used last project
RIGHT: Research fonts specifically for THIS project's personality
RIGHT: Browse foundries, study Awwwards sites, discover something fitting
```
**The AI tell is defaulting.** Every AI picks the same "safe" fonts because it doesn't research. Real designers spend time discovering typography that fits the specific project. If you can't explain WHY this font fits this project's personality, you haven't done the work.

#### 7. RESTRAINT Over Features (CRITICAL)
```
WRONG: Video background + grain texture + decorative numbers + material strips + pull quotes + animations
RIGHT: ONE hero image. Clean typography. Whitespace. Done.
```
**The #1 AI mistake is ADDING instead of REMOVING.** When something feels "not quite right," AI adds more decorations. Award-winning designers REMOVE elements until only the essential remains.

**The Count Test:** If a section has more than 3-4 distinct visual elements, you've lost restraint. Strip it back.

**What award-winning sites actually have:**
- Obliq hero: Name + subtitle + ONE image
- Lusano hero: Name + tagline + image
- Not: Name + subtitle + pull quote + decorative lines + material swatches + video + grain + oversized numbers + scroll indicator + animations

**The question isn't "what can I add?" — it's "what can I remove?"**

---

## The Creative Philosophy (Why AI Fails)

**AI defaults. Designers discover.**

The fundamental difference between AI-generated design and award-winning design is the creative process:

| AI Approach | Designer Approach |
|-------------|-------------------|
| Pick from memorized list of "good" fonts | Research fonts for THIS specific project |
| Use symmetric grids (safe, predictable) | Create hierarchy through editorial thinking |
| Apply the same patterns every time | Study references, discover what fits |
| Default to what worked before | Question every choice for this context |
| Fill space evenly | Use whitespace as a design element |
| Make everything look "polished" | Make it feel distinctive and intentional |

### The Discovery Mandate

Before building ANY creative project:

1. **Research phase is required** — Browse Awwwards, Dribbble, Behance for projects in the same category
2. **Typography discovery** — Spend time on font foundries finding what fits THIS project
3. **Layout inspiration** — Study how editorial designers create hierarchy, not templates
4. **Question defaults** — If you're using something because it's "safe," stop and reconsider

### The Magazine Test

Before finalizing any layout, ask: **"Would this appear in a design magazine or an AI template gallery?"**

Real editorial design has:
- **One hero element** that dominates
- **Visual rhythm** through varied sizes
- **Intentional asymmetry** that guides the eye
- **Typography doing heavy lifting** (not just decoration)
- **Whitespace as a design element**

### Signs You're Defaulting (Stop and Research)

- You picked a font without browsing foundries first
- Your layout is symmetric without a reason
- You're using the same patterns as your last project
- You can't articulate WHY this design fits this specific brand
- Everything feels "safe" and "polished" but not distinctive

---

```css
/* WRONG - decorative gradient */
background: linear-gradient(to-r, #f59e0b, #ea580c);
bg-gradient-to-r from-amber-500 to-orange-500

/* RIGHT - solid color */
background: #f59e0b;
bg-amber-500
```

**Allowed gradient uses (functional only):**
- Fade-to-transparent overlays on images/video
- ONE signature text gradient if it's THE brand moment
- Fade masks for scroll carousels

**Why?** Gradients feel dated, cheap, and distract from content. Linear, Stripe, and Vercel use solid colors. So should you.

### The 4px Grid
All spacing uses a 4px base grid:
- `4px` - micro spacing (icon gaps)
- `8px` - tight spacing (within components)
- `12px` - standard spacing (between related elements)
- `16px` - comfortable spacing (section padding)
- `24px` - generous spacing (between sections)
- `32px` - major separation

### Symmetrical Padding
**TLBR must match.** If top padding is 16px, left/bottom/right must also be 16px. Exception: when content naturally creates visual balance.

```css
/* Good */
padding: 16px;
padding: 12px 16px; /* Only when horizontal needs more room */

/* Bad */
padding: 24px 16px 12px 16px;
```

### Border Radius Consistency
Stick to the 4px grid. Sharper corners feel technical, rounder corners feel friendly. Pick a system and commit:

- Sharp: 4px, 6px, 8px
- Soft: 8px, 12px
- Minimal: 2px, 4px, 6px

Don't mix systems. Consistency creates coherence.

### Depth & Elevation Strategy

**Match your depth approach to your design direction.** Depth is a tool, not a requirement. Different products need different approaches:

**Borders-only (flat)** — Clean, technical, dense. Works for utility-focused tools where information density matters more than visual lift. Linear, Raycast, and many developer tools use almost no shadows — just subtle borders to define regions. This isn't lazy; it's intentional restraint.

**Subtle single shadows** — Soft lift without complexity. A simple `0 1px 3px rgba(0,0,0,0.08)` can be enough. Works for approachable products that want gentle depth without the weight of layered shadows.

**Layered shadows** — Rich, premium, dimensional. Multiple shadow layers create realistic depth for products that want to feel substantial. Stripe and Mercury use this approach. Best for cards that need to feel like physical objects.

**Surface color shifts** — Background tints establish hierarchy without any shadows. A card at `#fff` on a `#f8fafc` background already feels elevated. Shadows can reinforce this, but color does the heavy lifting.

Choose ONE approach and commit. Mixing flat borders on some cards with heavy shadows on others creates visual inconsistency.

```css
/* Borders-only approach */
--border: rgba(0, 0, 0, 0.08);
--border-subtle: rgba(0, 0, 0, 0.05);
border: 0.5px solid var(--border);

/* Single shadow approach */
--shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Layered shadow approach (when appropriate) */
--shadow-layered:
  0 0 0 0.5px rgba(0, 0, 0, 0.05),
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 4px rgba(0, 0, 0, 0.03),
  0 4px 8px rgba(0, 0, 0, 0.02);
```

**The craft is in the choice, not the complexity.** A flat interface with perfect spacing and typography is more polished than a shadow-heavy interface with sloppy details.

### Card Layouts Vary, Surface Treatment Stays Consistent
Monotonous card layouts are lazy design. A metric card doesn't have to look like a plan card doesn't have to look like a settings card. One might have a sparkline, another an avatar stack, another a progress ring, another a two-column split.

Design each card's internal structure for its specific content — but keep the surface treatment consistent: same border weight, shadow depth, corner radius, padding scale, typography. Cohesion comes from the container chrome, not from forcing every card into the same layout template.

### Isolated Controls
UI controls deserve container treatment. Date pickers, filters, dropdowns — these should feel like crafted objects sitting on the page, not plain text with click handlers.

**Never use native form elements for styled UI.** Native `<select>`, `<input type="date">`, and similar elements render OS-native dropdowns and pickers that cannot be styled. Build custom components instead:

- Custom select: trigger button + positioned dropdown menu
- Custom date picker: input + calendar popover
- Custom checkbox/radio: styled div with state management

**Custom select triggers must use `display: inline-flex` with `white-space: nowrap`** to keep text and chevron icons on the same row. Without this, flex children can wrap to new lines.

### Typography Hierarchy
- Headlines: 600 weight, tight letter-spacing (-0.02em)
- Body: 400-500 weight, standard tracking
- Labels: 500 weight, slight positive tracking for uppercase
- Scale: 11px, 12px, 13px, 14px (base), 16px, 18px, 24px, 32px

### Monospace for Data
Numbers, IDs, codes, timestamps belong in monospace. Use `tabular-nums` for columnar alignment. Mono signals "this is data."

### Iconography
Use **Phosphor Icons** (`@phosphor-icons/react`). Icons clarify, not decorate — if removing an icon loses no meaning, remove it.

Give standalone icons presence with subtle background containers.

### Animation
- 150ms for micro-interactions, 200-250ms for larger transitions
- Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- No spring/bouncy effects in enterprise UI

### Contrast Hierarchy
Build a four-level system: foreground (primary) → secondary → muted → faint. Use all four consistently.

### Color for Meaning Only
Gray builds structure. Color only appears when it communicates: status, action, error, success. Decorative color is noise.

When building data-heavy interfaces, ask whether each use of color is earning its place. Score bars don't need to be color-coded by performance — a single muted color works. Grade badges don't need traffic-light colors — typography can do the hierarchy work. Look at how GitHub renders tables and lists: almost entirely monochrome, with color reserved for status indicators and actionable elements.

---

## Navigation Context

Screens need grounding. A data table floating in space feels like a component demo, not a product. Consider including:

- **Navigation** — sidebar or top nav showing where you are in the app
- **Location indicator** — breadcrumbs, page title, or active nav state
- **User context** — who's logged in, what workspace/org

When building sidebars, consider using the same background as the main content area. Tools like Supabase, Linear, and Vercel rely on a subtle border for separation rather than different background colors. This reduces visual weight and feels more unified.

---

## Dark Mode Considerations

Dark interfaces have different needs:

**Borders over shadows** — Shadows are less visible on dark backgrounds. Lean more on borders for definition. A border at 10-15% white opacity might look nearly invisible but it's doing its job — resist the urge to make it more prominent.

**Adjust semantic colors** — Status colors (success, warning, error) often need to be slightly desaturated or adjusted for dark backgrounds to avoid feeling harsh.

**Same structure, different values** — The hierarchy system (foreground → secondary → muted → faint) still applies, just with inverted values.

---

## Anti-Patterns

### Never Do This (Technical)
- Dramatic drop shadows (`box-shadow: 0 25px 50px...`)
- Large border radius (16px+) on small elements
- Asymmetric padding without clear reason
- Pure white cards on colored backgrounds
- Thick borders (2px+) for decoration
- Excessive spacing (margins > 48px between sections)
- Spring/bouncy animations
- Gradients for decoration
- Multiple accent colors in one interface

### Never Do This (AI Template Tells)
- Symmetric grids without editorial intention
- Picking fonts without researching alternatives
- Initials in colored circles as avatar placeholders
- Big decorative quote marks (`"`) on testimonials
- All testimonials/cards same size and structure
- Everything perfectly centered without reason
- Rainbow colors across icons or cards
- Using patterns because they're "safe" not because they fit

### Always Question
- "Did I think about what this product needs, or did I default?"
- "Does this direction fit the context and users?"
- "Does this element feel crafted?"
- "Is my depth strategy consistent and intentional?"
- "Are all elements on the grid?"
- **"Would this layout appear in a magazine or a Canva template?"**
- **"Is there visual hierarchy, or is everything equal?"**
- **"Am I using Montserrat/Poppins because it's safe, or because it's right?"**

---

## The Standard

Every interface should look designed by a team that obsesses over 1-pixel differences. Not stripped — *crafted*. And designed for its specific context.

Different products want different things. A developer tool wants precision and density. A collaborative product wants warmth and space. A financial product wants trust and sophistication. Let the product context guide the aesthetic.

The goal: intricate minimalism with appropriate personality. Same quality bar, context-driven execution.
