# /workshop-help - Troubleshooting & Common Issues

You are a helpful troubleshooter for the Claude Code Masterclass. Help participants resolve common issues quickly so they can get back to learning.

---

## Quick Fixes

### Port 3000 Already in Use

```bash
npx kill-port 3000
```

Or use a different port:
```bash
npm run dev -- -p 3001
```

---

### npm install Failed

```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

If still failing, clear npm cache:
```bash
npm cache clean --force
npm install
```

---

### Permission Errors

```bash
sudo chown -R $(whoami) .
```

Or for a specific folder:
```bash
sudo chown -R $(whoami) ~/Desktop/my-app
```

---

### TypeScript Errors

Run the build to see all errors:
```bash
npm run build
```

Common fixes:
- Missing type? Add `as any` temporarily (not ideal but works)
- Import error? Check the file path
- Property doesn't exist? Define an interface

---

### Environment Variables Not Loading

1. Check the file is named exactly `.env.local` (with the dot)
2. Restart the dev server after changes
3. Variables must start with `NEXT_PUBLIC_` to be accessible in browser

```bash
# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

---

### Supabase Issues

**Connection refused:**
- Check your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify the project is running in Supabase dashboard

**Auth not working:**
- Enable the auth provider in Supabase dashboard
- Add redirect URL: `http://localhost:3000/**`

**RLS blocking queries:**
- Check Row Level Security policies
- Temporarily disable RLS to test (then re-enable!)

---

### Convex Issues

**Not syncing:**
```bash
# Run in separate terminal
npx convex dev
```

**Schema errors:**
```bash
npx convex dev --once
```

**Functions not updating:**
- Check for TypeScript errors in convex/ folder
- Restart `npx convex dev`

---

### Git Issues

**Not a git repository:**
```bash
git init
```

**Push rejected:**
```bash
git pull origin main --rebase
git push origin main
```

**Wrong remote:**
```bash
git remote remove origin
git remote add origin YOUR_CORRECT_URL
```

---

### Vercel Deployment Issues

**Build failed:**
- Check the build logs in Vercel dashboard
- Run `npm run build` locally first

**Environment variables:**
- Add all variables in Vercel dashboard
- Redeploy after adding: `vercel --prod`

**Domain not working:**
- Check DNS propagation (can take 15-30 minutes)
- Verify DNS records are correct

---

## Module-Specific Help

### Module 1 Issues
- Mostly conceptual, no code issues expected
- If confused about concepts, re-read the analogies

### Module 2 Issues
- Starter app not copying? Check the path
- Dev server won't start? Check Node version (need 18+)

### Module 3 Issues
- Database setup is the tricky part
- Double-check environment variables
- Verify auth provider settings

### Module 4 Issues
- Styling not applying? Check Tailwind classes
- Animations jerky? Reduce duration (try 0.2s)
- Fonts not loading? Check import syntax

### Module 5 Issues
- Build must pass locally before deploying
- Environment variables must be set in Vercel
- Auth providers need production URLs added

---

## Still Stuck?

1. **Ask Claude:** Describe your error in detail
2. **Share the error message:** Copy the exact text
3. **Show your code:** Reference the specific file
4. **Raise your hand:** Workshop facilitators are here to help!

---

## Useful Commands Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Install dependencies | `npm install` |
| Add a package | `npm install PACKAGE_NAME` |
| Kill port 3000 | `npx kill-port 3000` |
| Deploy to Vercel | `vercel` |
| Deploy to production | `vercel --prod` |
| Check Convex | `npx convex dev` |
| Git status | `git status` |
| Git commit | `git add . && git commit -m "message"` |
| Git push | `git push origin main` |

---

## Emergency Reset

If everything is broken and you want to start fresh:

```bash
# Back up any important changes first!

# For Module 2+ (fresh starter app)
rm -rf ~/Desktop/my-app
cp -r ./starter-app ~/Desktop/my-app
cd ~/Desktop/my-app
npm install
npm run dev
```

This gives you a clean slate with the starter app.

---

**Remember:** Every developer hits errors. The skill is knowing how to debug them. You're learning that skill right now!
