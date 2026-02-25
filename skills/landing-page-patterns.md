---
name: landing-page-patterns
description: Landing page design patterns including hero sections, CTAs, trust signals, social proof, and 2025 design trends. Use for marketing pages, product launches, and conversion-focused design.
---

# Landing Page Patterns

Comprehensive patterns for high-converting, visually stunning landing pages.

## Hero Section Patterns

### Cinematic Hero
Full-viewport, video/image background with overlay text.
```typescript
<section className="relative h-screen overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="h-full w-full object-cover"
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
    <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
      Your Compelling Headline
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-white/80">
      Supporting copy that reinforces the value proposition
    </p>
    <div className="mt-10 flex gap-4">
      <Button size="lg">Primary CTA</Button>
      <Button variant="outline" size="lg">Secondary CTA</Button>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <ChevronDown className="h-6 w-6 animate-bounce text-white/60" />
  </div>
</section>
```

### Split Hero
Content on left, visual on right (or reversed).
```typescript
<section className="grid min-h-screen lg:grid-cols-2">
  {/* Content */}
  <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
    <Badge>New Feature</Badge>
    <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
      Transform Your Workflow
    </h1>
    <p className="mt-6 text-lg text-muted-foreground">
      Description that explains the core benefit
    </p>
    <div className="mt-8 flex flex-wrap gap-4">
      <Button size="lg">Get Started</Button>
      <Button variant="ghost" size="lg">
        Watch Demo <PlayCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
    {/* Trust signals */}
    <div className="mt-12 flex items-center gap-8">
      <div className="flex -space-x-2">
        {avatars.map((src, i) => (
          <Avatar key={i} src={src} className="border-2 border-background" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Join 10,000+ teams already using our platform
      </p>
    </div>
  </div>

  {/* Visual */}
  <div className="relative bg-muted lg:block">
    <Image
      src="/hero-visual.png"
      alt="Product screenshot"
      fill
      className="object-cover"
    />
  </div>
</section>
```

### Minimal Hero
Typography-focused, minimal distractions.
```typescript
<section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
  <h1 className="max-w-3xl text-6xl font-bold tracking-tight md:text-8xl">
    <span className="text-muted-foreground">Build</span>{" "}
    <span className="text-primary">faster</span>
  </h1>
  <p className="mt-8 max-w-xl text-xl text-muted-foreground">
    The modern development platform for ambitious teams
  </p>
  <Button size="lg" className="mt-10">
    Start Building <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</section>
```

## Feature Sections

### Bento Grid Features
```typescript
<section className="py-24">
  <div className="container">
    <div className="text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        Everything you need
      </h2>
      <p className="mt-4 text-muted-foreground">
        Powerful features to supercharge your workflow
      </p>
    </div>

    <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Large featured card */}
      <div className="col-span-2 row-span-2 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
        <Icon className="h-10 w-10 text-primary" />
        <h3 className="mt-6 text-2xl font-semibold">Main Feature</h3>
        <p className="mt-2 text-muted-foreground">
          Detailed description of the primary feature
        </p>
        <div className="mt-8 aspect-video rounded-xl bg-muted" />
      </div>

      {/* Smaller cards */}
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-3xl bg-muted/50 p-6"
        >
          <feature.icon className="h-8 w-8 text-primary" />
          <h3 className="mt-4 font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Icon Grid Features
```typescript
<section className="py-24">
  <div className="container">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Social Proof Patterns

### Logo Cloud
```typescript
<section className="border-y bg-muted/30 py-12">
  <div className="container">
    <p className="text-center text-sm text-muted-foreground">
      Trusted by industry leaders
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {logos.map((logo) => (
        <Image
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          width={120}
          height={40}
          className="opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  </div>
</section>
```

### Testimonial Cards
```typescript
<section className="py-24">
  <div className="container">
    <h2 className="text-center text-3xl font-bold">
      Loved by thousands
    </h2>

    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className="p-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-4 text-muted-foreground">
            "{testimonial.quote}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar src={testimonial.avatar} />
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Stats Section
```typescript
<section className="border-y py-16">
  <div className="container">
    <div className="grid gap-8 text-center md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-4xl font-bold text-primary">{stat.value}</p>
          <p className="mt-2 text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## CTA Patterns

### Centered CTA
```typescript
<section className="py-24">
  <div className="container">
    <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-12 text-center text-primary-foreground">
      <h2 className="text-3xl font-bold">Ready to get started?</h2>
      <p className="mt-4 text-primary-foreground/80">
        Join thousands of teams already using our platform
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button variant="secondary" size="lg">
          Start Free Trial
        </Button>
        <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
          Talk to Sales
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Minimal CTA
```typescript
<section className="border-t py-24">
  <div className="container text-center">
    <h2 className="text-3xl font-bold">Start building today</h2>
    <p className="mt-4 text-muted-foreground">
      Free for individuals. Team plans start at $10/month.
    </p>
    <Button size="lg" className="mt-8">
      Get Started <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
</section>
```

## Pricing Section

```typescript
<section className="py-24">
  <div className="container">
    <div className="text-center">
      <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
      <p className="mt-4 text-muted-foreground">
        Choose the plan that's right for you
      </p>
    </div>

    <div className="mt-16 grid gap-8 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "p-8",
            plan.popular && "border-primary ring-1 ring-primary"
          )}
        >
          {plan.popular && (
            <Badge className="mb-4">Most Popular</Badge>
          )}
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-muted-foreground">{plan.description}</p>
          <p className="mt-6">
            <span className="text-4xl font-bold">${plan.price}</span>
            <span className="text-muted-foreground">/month</span>
          </p>
          <Button
            className="mt-6 w-full"
            variant={plan.popular ? "default" : "outline"}
          >
            Get Started
          </Button>
          <ul className="mt-8 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  </div>
</section>
```

## 2025 Design Trends

### Trend 1: Oversized Typography
- Headlines at 80-120px on desktop
- Variable fonts for dramatic weight changes
- Text as the primary visual element

### Trend 2: Glassmorphism 2.0
- Subtle blur effects (8-16px)
- Gradient borders
- Frosted glass cards on colorful backgrounds

### Trend 3: Bento Grids
- Asymmetric layouts
- Mixed card sizes
- Visual hierarchy through size

### Trend 4: Micro-interactions
- Every interactive element responds
- Hover states that delight
- Loading states that entertain

### Trend 5: Dark Mode First
- Rich dark backgrounds
- Subtle gradients
- Glowing accents

### Trend 6: 3D Elements
- Floating product renders
- Abstract 3D shapes
- Depth through shadows and layers

## Conversion Best Practices

| Element | Best Practice |
|---------|---------------|
| Headline | One clear value proposition |
| CTA | Action-oriented, specific text |
| Trust signals | Above the fold |
| Social proof | Real names and photos |
| Pricing | Anchor with popular plan |
| Form | Minimal fields required |
| Mobile | Thumb-friendly CTAs |
