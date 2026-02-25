---
name: gsap-animation-patterns
description: GSAP animation patterns including ScrollTrigger, SplitText, MorphSVG, timeline orchestration, and performance optimization. Use for scroll animations, text reveals, SVG morphing, and complex animation sequences.
---

# GSAP Animation Patterns

Comprehensive patterns for GSAP animations in React/Next.js applications.

## Core Setup

### Installation
```bash
npm install gsap @gsap/react
```

### Premium Plugins (Club GreenSock)
```bash
# Add to package.json for private npm
npm install gsap-trial  # or gsap with club membership
```

### Next.js Configuration
```typescript
// lib/gsap.ts - Register plugins once
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
}

export { gsap, ScrollTrigger, SplitText, ScrollSmoother };
```

## useGSAP Hook Pattern

```typescript
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // All GSAP code here - auto cleanup on unmount
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef } // Scopes all selectors to container
  );

  return (
    <div ref={containerRef}>
      <h1 ref={titleRef}>Animated Title</h1>
    </div>
  );
}
```

## ScrollTrigger Patterns

### Basic Scroll Animation
```typescript
useGSAP(() => {
  gsap.from(".card", {
    scrollTrigger: {
      trigger: ".card",
      start: "top 80%",
      end: "top 20%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
  });
}, { scope: containerRef });
```

### Pinned Section with Scrub
```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1,
    },
  });

  tl.to(".hero-title", { scale: 0.8, opacity: 0 })
    .to(".hero-image", { scale: 1.2 }, "<")
    .from(".reveal-content", { y: 100, opacity: 0 });
}, { scope: containerRef });
```

### Horizontal Scroll Section
```typescript
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".horizontal-container")!.scrollWidth,
    },
  });
}, { scope: containerRef });
```

### Parallax Layers
```typescript
useGSAP(() => {
  gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "0");
    gsap.to(el, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}, { scope: containerRef });
```

## SplitText Patterns

### Character-by-Character Reveal
```typescript
useGSAP(() => {
  const split = new SplitText(".hero-title", {
    type: "chars,words,lines",
    linesClass: "overflow-hidden",
  });

  gsap.from(split.chars, {
    y: 100,
    opacity: 0,
    rotationX: -90,
    duration: 0.8,
    stagger: 0.02,
    ease: "back.out(1.7)",
  });

  return () => split.revert(); // Cleanup
}, { scope: containerRef });
```

### Word-by-Word Stagger
```typescript
useGSAP(() => {
  const split = new SplitText(".tagline", { type: "words" });

  gsap.from(split.words, {
    scrollTrigger: {
      trigger: ".tagline",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
  });

  return () => split.revert();
}, { scope: containerRef });
```

### Line-by-Line Reveal
```typescript
useGSAP(() => {
  const split = new SplitText(".paragraph", {
    type: "lines",
    linesClass: "line-wrapper",
  });

  // Wrap each line for overflow hidden
  split.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(split.lines, {
    y: "100%",
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  return () => split.revert();
}, { scope: containerRef });
```

## Timeline Orchestration

### Complex Sequence
```typescript
useGSAP(() => {
  const master = gsap.timeline({ paused: true });

  // Scene 1: Hero entrance
  const heroTl = gsap.timeline();
  heroTl
    .from(".hero-bg", { scale: 1.3, duration: 1.5 })
    .from(".hero-title", { y: 100, opacity: 0, duration: 1 }, "-=1")
    .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 });

  // Scene 2: Features reveal
  const featuresTl = gsap.timeline();
  featuresTl
    .from(".feature-card", { y: 60, opacity: 0, stagger: 0.2 })
    .from(".feature-icon", { scale: 0, stagger: 0.1 }, "-=0.5");

  // Compose master timeline
  master.add(heroTl).add(featuresTl, "-=0.3");

  master.play();
}, { scope: containerRef });
```

### Responsive Labels
```typescript
useGSAP(() => {
  const tl = gsap.timeline();

  tl.addLabel("start")
    .from(".logo", { opacity: 0, duration: 0.5 })
    .addLabel("logoComplete")
    .from(".nav-item", { y: -20, opacity: 0, stagger: 0.1 })
    .addLabel("navComplete")
    .from(".hero-content", { y: 40, opacity: 0 }, "navComplete-=0.2");

  // Jump to labels
  // tl.play("logoComplete");
}, { scope: containerRef });
```

## MorphSVG Patterns

### Shape Morphing
```typescript
useGSAP(() => {
  gsap.to("#circle", {
    morphSVG: "#star",
    duration: 1,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
}, { scope: containerRef });
```

### Path Drawing
```typescript
useGSAP(() => {
  const paths = gsap.utils.toArray<SVGPathElement>(".draw-path");

  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
      },
    });
  });
}, { scope: containerRef });
```

## Easing Reference

### Common Easings
```typescript
// Smooth entrances
"power2.out"     // Standard ease out
"power3.out"     // More dramatic
"expo.out"       // Very snappy start

// Exits
"power2.in"      // Accelerating
"expo.in"        // Very slow start

// Symmetric
"power2.inOut"   // Balanced
"expo.inOut"     // Dramatic both ends

// Character
"back.out(1.7)"  // Overshoot
"elastic.out(1, 0.5)"  // Bouncy
"bounce.out"     // Bouncing ball

// Custom
"cubic-bezier(0.25, 1, 0.5, 1)"
```

## Performance Optimization

### Will-Change Setup
```typescript
useGSAP(() => {
  // Set will-change before animation
  gsap.set(".animated", { willChange: "transform, opacity" });

  gsap.from(".animated", {
    y: 100,
    opacity: 0,
    onComplete: () => {
      // Remove will-change after animation
      gsap.set(".animated", { willChange: "auto" });
    },
  });
}, { scope: containerRef });
```

### GPU-Accelerated Properties
```typescript
// Prefer these (GPU accelerated)
gsap.to(el, { x: 100, y: 50, scale: 1.2, rotation: 45, opacity: 0.5 });

// Avoid these when possible (causes reflow)
gsap.to(el, { width: 200, height: 100, top: 50, left: 100 });
```

### Batch ScrollTrigger Creation
```typescript
useGSAP(() => {
  ScrollTrigger.batch(".fade-in", {
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    },
    once: true,
  });
}, { scope: containerRef });
```

## ScrollSmoother Pattern

```typescript
"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });

    return () => smoother.kill();
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
```

## Award-Winning Animation Patterns

Techniques from Awwwards-winning sites (7/10 use Lenis + GSAP).

### Hero Section Cinematic Reveal
Layered text, masking, multi-object parallax with coordinated scroll reveals.
```typescript
useGSAP(() => {
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
    },
  });

  // Layer 1: Background scale + fade
  heroTl.fromTo(".hero-bg",
    { scale: 1 },
    { scale: 1.3, duration: 1 }
  );

  // Layer 2: Title reveal with mask
  heroTl.fromTo(".hero-title",
    { clipPath: "inset(100% 0 0 0)" },
    { clipPath: "inset(0% 0 0 0)", duration: 0.8 },
    0.2
  );

  // Layer 3: Parallax elements at different speeds
  heroTl.to(".parallax-slow", { y: "-20%", duration: 1 }, 0);
  heroTl.to(".parallax-fast", { y: "-50%", duration: 1 }, 0);

  // Layer 4: Content fade out
  heroTl.to(".hero-content", { opacity: 0, y: -50 }, 0.7);

  // Layer 5: Next section preview
  heroTl.from(".next-section-preview", { y: 100, opacity: 0 }, 0.8);
}, { scope: containerRef });
```

### SplitText + ScrollTrigger Combo (Award-Winning Pattern)
```typescript
useGSAP(() => {
  const titles = gsap.utils.toArray<HTMLElement>(".reveal-title");

  titles.forEach((title) => {
    const split = new SplitText(title, {
      type: "chars,words",
      charsClass: "char",
    });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      rotateX: -90,
      transformOrigin: "0% 50% -50",
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        each: 0.02,
        from: "start",
      },
    });
  });
}, { scope: containerRef });
```

### Multi-Object Parallax with Depth
```typescript
useGSAP(() => {
  // Define depth layers
  const layers = [
    { selector: ".bg-layer", speed: 0.3 },
    { selector: ".mid-layer", speed: 0.5 },
    { selector: ".fore-layer", speed: 0.8 },
    { selector: ".content-layer", speed: 1 },
  ];

  layers.forEach(({ selector, speed }) => {
    gsap.to(selector, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });

  // Add scale + opacity for extra depth
  gsap.to(".bg-layer", {
    scale: 1.1,
    opacity: 0.5,
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "center center",
      scrub: true,
    },
  });
}, { scope: containerRef });
```

### Scroll-Linked Storytelling Section
Pin → Reveal Features → Unpin pattern.
```typescript
useGSAP(() => {
  const features = gsap.utils.toArray<HTMLElement>(".feature");
  const totalFeatures = features.length;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".storytelling-section",
      start: "top top",
      end: () => `+=${100 * totalFeatures}%`,
      pin: true,
      scrub: 1,
      snap: 1 / totalFeatures,
    },
  });

  features.forEach((feature, i) => {
    const isLast = i === totalFeatures - 1;

    // Reveal current feature
    tl.from(feature, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.5,
    });

    // Hold for reading
    tl.to({}, { duration: 0.3 });

    // Fade out (except last)
    if (!isLast) {
      tl.to(feature, {
        opacity: 0,
        y: -30,
        duration: 0.3,
      });
    }
  });
}, { scope: containerRef });
```

### Counter Animation (Stats Section)
```typescript
useGSAP(() => {
  const counters = gsap.utils.toArray<HTMLElement>(".counter");

  counters.forEach((counter) => {
    const target = parseFloat(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        counter.textContent = Math.floor(obj.value).toLocaleString() + suffix;
      },
    });
  });
}, { scope: containerRef });
```

### Staggered Grid Entrance
```typescript
useGSAP(() => {
  gsap.from(".grid-item", {
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top 75%",
    },
    y: 60,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power3.out",
    stagger: {
      each: 0.1,
      grid: "auto",
      from: "start", // or "center", "edges", "random"
    },
  });
}, { scope: containerRef });
```

### Magnetic Element Effect
```typescript
useGSAP(() => {
  const magnets = gsap.utils.toArray<HTMLElement>(".magnetic");

  magnets.forEach((magnet) => {
    const strength = parseFloat(magnet.dataset.strength || "0.3");

    magnet.addEventListener("mousemove", (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(magnet, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    magnet.addEventListener("mouseleave", () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
}, { scope: containerRef });
```

## Performance for 90+ Lighthouse Score

Award-winning sites achieve high performance with these practices:

### DO
```typescript
// 1. Only animate transform and opacity
gsap.to(el, { x: 100, y: 50, scale: 1.2, rotation: 45, opacity: 0.5 });

// 2. Use will-change sparingly and clean up
gsap.set(el, { willChange: "transform" });
gsap.to(el, {
  x: 100,
  onComplete: () => gsap.set(el, { willChange: "auto" }),
});

// 3. Use scrub for scroll-linked (not per-frame listeners)
scrollTrigger: { scrub: true }

// 4. Batch similar animations
ScrollTrigger.batch(".card", {
  onEnter: (batch) => gsap.from(batch, { y: 40, opacity: 0, stagger: 0.1 }),
});

// 5. Use matchMedia for responsive animations
ScrollTrigger.matchMedia({
  "(min-width: 768px)": () => {
    // Desktop animations
  },
  "(max-width: 767px)": () => {
    // Mobile - simpler animations
  },
});
```

### DON'T
```typescript
// Avoid layout-triggering properties
gsap.to(el, { width: 200, height: 100, top: 50, left: 100 }); // BAD

// Avoid many simultaneous ScrollTriggers
// Instead, batch or use timeline with single trigger

// Avoid animating during scroll without scrub
window.addEventListener("scroll", () => gsap.to(el, { y: scrollY })); // BAD
```

### Reduced Motion Support
```typescript
useGSAP(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Skip animations, show final state
    gsap.set(".animated", { opacity: 1, y: 0 });
    return;
  }

  // Normal animations
  gsap.from(".animated", { y: 40, opacity: 0, stagger: 0.1 });
}, { scope: containerRef });
```

## Common Patterns Quick Reference

| Pattern | Use Case | Key Properties |
|---------|----------|----------------|
| Fade up | Section reveals | `y: 40, opacity: 0` |
| Scale in | Emphasis | `scale: 0.8, opacity: 0` |
| Slide in | Drawers/panels | `x: "100%"` |
| Stagger | Lists/grids | `stagger: 0.1` |
| Scrub | Scroll-linked | `scrub: 1` |
| Pin | Sticky sections | `pin: true` |
| Snap | Discrete sections | `snap: 1/sections` |
| Magnetic | Buttons/cards | Mouse tracking + elastic ease |
| Cinematic | Hero sections | Multi-layer parallax + pin |
| Counter | Stats sections | `onUpdate` with number formatting |
