# /product-builder - Build a Real SaaS Product

You are helping a workshop participant set up the infrastructure to build a real SaaS product. Make the "tech stack decision" feel easy, not overwhelming.

## What They're Building: $ARGUMENTS

---

## Your Mission

Guide them through choosing and setting up the right tools for their SaaS. **Ship fast, scale later.**

---

## Step 1: Understand What They're Building

Ask them:

> "Before we pick tools, tell me about your app:
>
> 1. **What does it do?** (one sentence)
> 2. **Do users need to log in?** (yes/no)
> 3. **Do you need to save data?** (yes/no)
> 4. **Will users pay for it?** (yes/no)
> 5. **Any real-time features?** (live updates, chat, collaboration)"

---

## Step 2: Pick Their Stack

Based on their answers, recommend ONE path:

### Path A: The "Ship This Week" Stack 🚀

**Best for:** MVPs, validation, getting something live fast

```
Auth:       Clerk (just works, beautiful UI)
Database:   Convex (real-time, TypeScript-native)
Payments:   LemonSqueezy (handles taxes for you)
Email:      Resend (modern, React templates)
Analytics:  Umami (privacy-friendly)
Hosting:    Vercel (deploy in 30 seconds)
```

**Why this stack:** Zero config, generous free tiers, works together seamlessly.

---

### Path B: The "I Want Control" Stack 🎛️

**Best for:** Developers who want SQL, more customization

```
Auth:       Auth.js (NextAuth) - self-hosted
Database:   Supabase (Postgres + Auth + Storage)
Payments:   Stripe (full control)
Email:      Resend
Analytics:  PostHog (product analytics)
Hosting:    Vercel
```

**Why this stack:** Postgres is familiar, full control over auth.

---

### Path C: The "Budget Conscious" Stack 💰

**Best for:** Pre-revenue, learning, personal projects

```
Auth:       Auth.js (free)
Database:   Supabase free tier
Payments:   Stripe (only pay when you get paid)
Email:      Resend free tier (3k/month)
Analytics:  Umami self-hosted (free)
Hosting:    Vercel hobby (free)
```

**Why this stack:** $0/month until you have paying customers.

---

## Step 3: Setup Guide

### Setting Up Auth (Clerk - Recommended)

1. **Create account:** clerk.com
2. **Install:**
   ```bash
   npm install @clerk/nextjs
   ```
3. **Add to `.env.local`:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
4. **Wrap app in provider** (`layout.tsx`)

### Setting Up Database (Convex - Recommended)

1. **Install:**
   ```bash
   npm install convex
   npx convex dev
   ```
2. Follow the prompts to create project
3. Schema goes in `convex/schema.ts`

### Setting Up Database (Supabase - Alternative)

1. **Create project:** supabase.com
2. **Install:**
   ```bash
   npm install @supabase/supabase-js
   ```
3. **Add to `.env.local`:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

### Setting Up Payments (Stripe)

1. **Create account:** stripe.com
2. **Install:**
   ```bash
   npm install stripe @stripe/stripe-js
   ```
3. **Add to `.env.local`:**
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Setting Up Email (Resend)

1. **Create account:** resend.com
2. **Install:**
   ```bash
   npm install resend
   ```
3. **Add to `.env.local`:**
   ```
   RESEND_API_KEY=re_...
   ```

---

## Step 4: SaaS Patterns to Use

### Pricing Page Pattern

```typescript
const plans = [
  {
    name: 'Free',
    price: 0,
    features: ['5 projects', 'Basic analytics', 'Community support'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: 29,
    popular: true, // Highlight this one!
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support'],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Everything in Pro', 'SSO', 'Dedicated support', 'SLA'],
    cta: 'Contact Sales',
  },
];
```

### Subscription Flow

```
1. User signs up (Clerk/Auth.js)
2. User on Free tier (flag in database)
3. User clicks "Upgrade"
4. → Stripe Checkout session
5. ← Webhook: checkout.session.completed
6. Update user.plan in database
7. Show success page
```

### Onboarding Checklist

```typescript
const onboardingSteps = [
  { id: 'profile', label: 'Complete profile', done: !!user.name },
  { id: 'workspace', label: 'Create workspace', done: workspaces.length > 0 },
  { id: 'invite', label: 'Invite team', done: invites.length > 0 },
];

const progress = steps.filter(s => s.done).length / steps.length;
```

### Waitlist Pattern

For pre-launch:
```typescript
// Simple waitlist - collect email, show position
const position = await addToWaitlist(email);
return { message: `You're #${position} on the list!` };
```

---

## Step 5: Common SaaS Questions

### "Should I use Clerk or Auth.js?"

| Question | If Yes → |
|----------|----------|
| Want it to "just work"? | Clerk |
| Need social login + MFA? | Clerk (built-in) |
| Want full control? | Auth.js |
| On a budget? | Auth.js (free) |
| Need enterprise SSO? | Either works |

**Our recommendation:** Clerk for most people. The DX is excellent.

### "Stripe or LemonSqueezy?"

| Question | If Yes → |
|----------|----------|
| Selling globally? | Both work |
| Want to avoid tax headaches? | LemonSqueezy (they handle it) |
| Need complex billing? | Stripe |
| Want simplicity? | LemonSqueezy |

**Our recommendation:** LemonSqueezy for MVPs, Stripe when you need control.

### "Convex or Supabase?"

| Question | If Yes → |
|----------|----------|
| Need real-time? | Convex (built-in) |
| Prefer SQL? | Supabase |
| Like TypeScript? | Convex (fully typed) |
| Want auth + storage bundle? | Supabase |

**Our recommendation:** Try Convex first. The DX is incredible.

---

## Success Message

```
🚀 Your SaaS Stack is Ready!

You now have:
✅ Authentication set up (users can sign up/log in)
✅ Database connected (data persists)
✅ [Payments ready] (if applicable)
✅ Environment variables configured

Your stack:
- Auth: [Clerk/Auth.js]
- Database: [Convex/Supabase]
- Payments: [Stripe/LemonSqueezy/None yet]
- Hosting: Vercel

💡 Pro Tips:
→ Start with Free tier for everything
→ Only add payments when you have users
→ Don't over-engineer — ship first!

What feature should we build first?
```

---

## Troubleshooting

### "Clerk redirects aren't working"
- Check middleware.ts is set up correctly
- Verify the redirect URLs in Clerk dashboard

### "Supabase RLS blocking everything"
- Add Row Level Security policies
- Or temporarily disable RLS for testing (not in production!)

### "Stripe webhooks not firing"
- Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Verify webhook secret matches

### "Convex queries failing"
- Make sure `npx convex dev` is running
- Check schema matches your queries

---

*Part of the Claude Code Masterclass — Barcelona 2026*
