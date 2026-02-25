# /ship - Deploy Your App to the World 🚀

You are guiding a workshop participant through deploying their app to Vercel. This is their moment of triumph — make it feel special!

## Context: $ARGUMENTS

---

## Your Mission

Get their app LIVE on the internet with a real URL anyone can visit. Be patient, celebrate wins, and handle errors gracefully.

---

## 🛫 Pre-Flight Checklist

Before we deploy, let's make sure everything is ready. Run these checks:

### Check 1: Does the build pass?

```bash
npm run build
```

**If it PASSES** ✅ → Continue to Check 2

**If it FAILS** ❌ → Help them fix the errors:

Common build errors and fixes:

| Error | Fix |
|-------|-----|
| `Module not found` | Check import paths, install missing packages |
| `Type error` | Fix TypeScript issues (missing types, wrong types) |
| `'X' is not defined` | Import the missing component/function |
| `Cannot find module '.env'` | Create `.env.local` with required variables |

> "Let's fix this error before deploying. A broken build = broken website!"

---

### Check 2: Environment variables documented?

Ask them:

> "Does your app use any API keys or secrets? Let's make a list."

Create or verify `.env.example`:

```bash
# Check what env vars they're using
grep -r "process.env" src/ --include="*.ts" --include="*.tsx" | head -20
```

Common environment variables:

```
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Database (Convex)
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Authentication (Auth.js)
AUTH_SECRET=
```

> "We'll need to add these to Vercel. Let's note them down!"

---

### Check 3: No localhost URLs?

```bash
# Search for hardcoded localhost
grep -r "localhost" src/ --include="*.ts" --include="*.tsx"
grep -r "127.0.0.1" src/ --include="*.ts" --include="*.tsx"
```

**If found** → Replace with environment variables or relative URLs.

---

### Check 4: Git status clean?

```bash
git status
```

**If there are uncommitted changes:**

```bash
git add .
git commit -m "chore: prepare for deployment"
git push
```

---

## 📋 Pre-Flight Summary

Show them this checklist:

```
┌─────────────────────────────────────────────────┐
│  🛫 PRE-FLIGHT CHECKLIST                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  [ ] Build passes (npm run build)              │
│  [ ] Environment variables documented          │
│  [ ] No hardcoded localhost URLs               │
│  [ ] All changes committed and pushed          │
│  [ ] GitHub repo exists and is up to date      │
│                                                 │
│  All green? Let's deploy! 🚀                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Options

Ask them:

> "How would you like to deploy? Choose your method:"
>
> **Option A: Vercel CLI** (Recommended - Fastest!)
> - Deploy right from the terminal
> - Takes about 2 minutes
>
> **Option B: Vercel Dashboard**
> - Use the web interface
> - Good if you want to see everything visually

---

## Option A: Vercel CLI Deployment

### Step 1: Install Vercel CLI (if needed)

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This opens a browser window. Log in with:
- GitHub (recommended - links your repos!)
- GitLab
- Email

### Step 3: Deploy!

```bash
vercel
```

**Answer the prompts:**

```
? Set up and deploy? [Y/n] → Y
? Which scope? → Select your account
? Link to existing project? → N (first time)
? What's your project's name? → [their-app-name]
? In which directory is your code? → ./ (current)
? Want to modify settings? → N (use defaults)
```

**Watch the magic happen:**

```
🔍 Inspecting project...
📦 Building...
✅ Production: https://[app-name].vercel.app
```

### Step 4: Add Environment Variables

If they have env vars:

```bash
# Add each one
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste the value when prompted
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Repeat for each variable
```

### Step 5: Redeploy with Variables

```bash
vercel --prod
```

> "The `--prod` flag deploys to your main production URL!"

---

## Option B: Vercel Dashboard Deployment

### Step 1: Go to Vercel

Open: **https://vercel.com/new**

### Step 2: Import Repository

1. Click "Import Git Repository"
2. Select your GitHub account
3. Find and select your project repo
4. Click "Import"

### Step 3: Configure Project

Vercel auto-detects Next.js! Verify these settings:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (or next build)
Output Directory: .next
Install Command: npm install
```

### Step 4: Add Environment Variables

Before clicking Deploy, expand **"Environment Variables"**

Add each variable:
1. Name: `NEXT_PUBLIC_SUPABASE_URL`
2. Value: [paste from .env.local]
3. Click "Add"

Repeat for all variables.

### Step 5: Deploy!

Click **"Deploy"** and watch the build logs.

---

## 🔧 Troubleshooting Common Issues

### "Build failed"

```bash
# Check the error in Vercel logs, then fix locally:
npm run build
# Fix the error
git add . && git commit -m "fix: build error" && git push
# Vercel auto-redeploys on push!
```

### "Environment variable not found"

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure the variable names match EXACTLY (case-sensitive!)
3. Click "Redeploy" after adding variables

### "Auth redirect not working"

Your auth provider needs to know your production URL!

**For Supabase:**
1. Supabase Dashboard → Authentication → URL Configuration
2. Add: `https://your-app.vercel.app` to Site URL
3. Add: `https://your-app.vercel.app/**` to Redirect URLs

**For Clerk:**
1. Clerk Dashboard → Your App → Production
2. Add your Vercel URL to allowed origins

### "Database connection failed"

- Check if your database allows connections from Vercel's IPs
- For Supabase: Should work automatically
- For other DBs: May need to whitelist IPs or use connection pooling

### "Page shows 404"

- Check if your routes are correct
- Verify `next.config.ts` doesn't have issues
- Check Vercel's Function Logs for errors

---

## 🎯 Post-Deployment Verification

Once deployed, test EVERYTHING:

```
┌─────────────────────────────────────────────────┐
│  ✅ DEPLOYMENT VERIFICATION                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Open your live URL and check:                  │
│                                                 │
│  [ ] Homepage loads                             │
│  [ ] Navigation works                           │
│  [ ] Auth login/signup works                    │
│  [ ] Data saves to database                     │
│  [ ] Data loads from database                   │
│  [ ] Mobile view looks good                     │
│  [ ] No console errors (F12 → Console)          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎉 Success! Your App is LIVE!

When everything works, celebrate with them:

---

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🎉🎉🎉 CONGRATULATIONS! YOUR APP IS LIVE! 🎉🎉🎉              │
│                                                                 │
│   🌐 Your URL: https://[app-name].vercel.app                   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  What you accomplished today:                           │   │
│   │                                                         │   │
│   │  ✅ Planned your app like an Engineering Lead           │   │
│   │  ✅ Built features with AI agents                       │   │
│   │  ✅ Connected a real database                           │   │
│   │  ✅ Made it look professional                           │   │
│   │  ✅ Deployed to the world!                              │   │
│   │                                                         │   │
│   │  From ZERO to LIVE in one workshop. 🚀                  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   📱 Share your URL!                                            │
│   - Send to friends & family                                    │
│   - Post on LinkedIn/Twitter                                    │
│   - Add to your portfolio                                       │
│                                                                 │
│   🔄 Your app auto-deploys on every git push!                   │
│   Just: git push → Vercel rebuilds automatically                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Optional: Custom Domain

If they want their own domain:

### Step 1: Buy a Domain (if needed)

Recommended registrars:
- **Namecheap** — Affordable, good UI
- **Cloudflare** — Cheapest renewals
- **Google Domains** → Now Squarespace

### Step 2: Add to Vercel

1. Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `yourapp.com`
4. Vercel shows DNS instructions

### Step 3: Configure DNS

At your domain registrar, add:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Wait & Verify

- DNS takes 5-30 minutes to propagate
- Vercel auto-provisions SSL certificate
- Your custom domain is live!

---

## 📊 What's Next?

Now that they're deployed:

```
┌─────────────────────────────────────────────────┐
│  🚀 YOUR APP IS LIVE! WHAT'S NEXT?              │
├─────────────────────────────────────────────────┤
│                                                 │
│  KEEP BUILDING:                                 │
│  • Add more features with /work-on #X          │
│  • Every git push auto-deploys!                │
│                                                 │
│  SHARE YOUR WORK:                              │
│  • Add to your portfolio                       │
│  • Share on social media                       │
│  • Tell potential clients/employers            │
│                                                 │
│  SCALE UP:                                     │
│  • Vercel handles millions of visitors         │
│  • Add analytics with Vercel Analytics         │
│  • Set up monitoring with Vercel Speed Insights│
│                                                 │
│  GET A CUSTOM DOMAIN:                          │
│  • Makes it look more professional             │
│  • ~$10-15/year for a .com                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Quick Reference

```bash
# Deploy (first time)
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME

# Check deployment status
vercel ls

# View logs
vercel logs

# Open dashboard
vercel dashboard
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
