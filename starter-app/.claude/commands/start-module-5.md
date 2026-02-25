# /start-module-5 - Deploy & Launch

You are guiding a workshop participant through DEPLOYMENT. This is the finale — their app goes LIVE to the world!

## Your Mission

Get their app deployed to a real URL that anyone can visit. Make the launch feel like a celebration.

---

## 🚀 Quick Deploy Option

If they just want to deploy fast, they can use:

```
/ship
```

This interactive command walks through:
- Pre-flight checks (build, env vars, git)
- Vercel CLI or Dashboard deployment
- Environment variable setup
- Post-deployment verification

**Use `/ship` for the guided experience, or follow the manual steps below.**

---

## Step 1: Pre-Deploy Checklist (10 minutes)

Before deploying, verify everything is ready:

### Code Check:
```bash
npm run build
```

If it fails, fix the errors. Common issues:
- TypeScript errors (missing types)
- Import errors (wrong paths)
- Environment variables not set

### Checklist:

- [ ] Build passes without errors
- [ ] All environment variables documented
- [ ] No console.logs left in production code
- [ ] No hardcoded localhost URLs
- [ ] Auth configured for production domain
- [ ] Database in production mode

---

## Step 2: Set Up Vercel (5 minutes)

### Create Account:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Authorize access to your repositories

### First, push to GitHub:

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

Create a new repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy (5 minutes)

### Option A: Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts:
1. Link to existing project? → No, create new
2. Project name? → Use default or customize
3. Framework? → Next.js (auto-detected)
4. Build settings? → Use defaults

### Option B: Vercel Dashboard

1. Go to vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Click "Deploy"

---

## Step 4: Environment Variables (5 minutes)

In Vercel Dashboard → Your Project → Settings → Environment Variables

Add all your secrets:

### For Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### For Convex:
```
CONVEX_DEPLOYMENT=your-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

### For Clerk:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

**After adding variables, redeploy:**
```bash
vercel --prod
```

---

## Step 5: Configure Auth for Production

### Supabase:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel URL to "Redirect URLs"
   - `https://your-app.vercel.app/**`
3. Add to "Site URL"
   - `https://your-app.vercel.app`

### Clerk:
1. Go to Clerk Dashboard → Your App
2. Add production domain to allowed origins
3. Update any webhook URLs

---

## Step 6: Custom Domain (Optional, 10 minutes)

If they have a domain:

### In Vercel:
1. Project Settings → Domains
2. Add your domain: `myapp.com`
3. Vercel provides DNS instructions

### Update DNS:
- **A Record:** Point to `76.76.21.21`
- **CNAME:** Point `www` to `cname.vercel-dns.com`

Wait 5-15 minutes for propagation.

---

## Step 7: The Launch Moment 🚀

When deployment is complete:

1. Open their live URL together
2. Test the key features:
   - [ ] Page loads
   - [ ] Auth works
   - [ ] Database saves/loads data
   - [ ] Looks correct on mobile

3. **CELEBRATE!**

---

## The Celebration

---

**🎉 CONGRATULATIONS!**

**Your app is LIVE at:** `https://your-app.vercel.app`

**What you built TODAY:**

| Module | Achievement |
|--------|-------------|
| Module 1 | Understood the AI mindset |
| Module 2 | Built first app in 5 minutes |
| Module 3 | Added auth + database |
| Module 4 | Made it beautiful |
| Module 5 | **Deployed to the world!** |

**From zero to live product in one day.**

---

## What You Can Do Now:

1. **Share your URL** — Send it to friends, family, investors
2. **Keep building** — Add more features with Claude Code
3. **Customize the domain** — Make it truly yours
4. **Scale** — Vercel handles millions of visitors

---

## You Are Now An Engineering Lead

You don't write code.
You LEAD a team of AI specialists.

**Your workflow:**
1. Define your Epic (what you want)
2. Break into Features
3. Create Tickets for agents
4. Review and approve work
5. Deploy with confidence

**This is the future of building software.**

---

## Resources for Continued Learning

- **Skills folder** — Keep using these patterns
- **Claude Code docs** — [docs.anthropic.com](https://docs.anthropic.com)
- **Vercel docs** — [vercel.com/docs](https://vercel.com/docs)
- **Your workshop community** — Stay connected!

---

**Thank you for joining the Claude Code Masterclass!**

*Built in Barcelona 🇪🇸 — January 2026*

---

## Troubleshooting Deployment

### Build Fails:
```bash
# Check for errors locally first
npm run build
```

### Environment Variables Not Working:
- Check spelling exactly matches local `.env.local`
- Redeploy after adding variables
- Check Vercel logs for errors

### Auth Redirect Issues:
- Add production URL to auth provider's allowed URLs
- Clear browser cookies and try again

### Database Connection Failed:
- Check if IP needs to be whitelisted
- Verify connection string is correct
- Check Vercel function logs

### Page Not Loading:
```bash
# Check deployment logs
vercel logs
```
