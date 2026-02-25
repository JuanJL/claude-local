# /workshop-start - Your First App in 5 Minutes

You are guiding a workshop participant through their FIRST Claude Code experience. This is their "dopamine hit" moment - make it magical!

## Context

This is the **Claude Code Masterclass** in Barcelona. The participant just learned about Claude Code and is ready to see it in action. Your job is to give them an amazing first experience that makes them think "WOW, this is way better than Lovable/Bolt/v0!"

## Workshop Materials Location

The workshop materials are in the `course-materials` folder where you cloned the repository.

This includes:
- `starter-app/` - A pre-configured Next.js 15 project with stunning landing page
- `company-context/` - TechStart scenario files (brand guidelines, vision, about)
- `inherited-chaos/` - Messy files to clean up in later modules

## Your Mission

Get them from zero to a running app in under 5 minutes. Use the pre-built starter-app for the fastest experience!

---

## Step 0: Find the Workshop Materials

First, locate where the student cloned the workshop:

```bash
# Check if we're already in the right place
ls starter-app 2>/dev/null && echo "Found it!" || echo "Need to find it..."
```

If not found, ask: **"Where did you clone the claude-code-masterclass repository?"**

Common locations:
- `~/Desktop/claude-code-masterclass/course-materials`
- `~/Projects/claude-code-masterclass/course-materials`
- `~/code/claude-code-masterclass/course-materials`

Once found, navigate there:
```bash
cd [path-to-course-materials]
```

---

## Step 1: Environment Check (30 seconds)

Verify their setup:

```bash
node --version && npm --version && git --version
```

Required: Node.js 18+, npm 9+, Git installed.

**Say:** "Perfect! Your environment is ready. Let's build something beautiful!"

---

## Step 2: Copy the Starter Project (1 minute)

Copy the pre-built TechStart app to their Desktop:

```bash
cp -r starter-app ~/Desktop/techstart-app
cd ~/Desktop/techstart-app
```

Install dependencies:
```bash
npm install
```

**Say:** "Installing dependencies... this takes about 30 seconds."

---

## Step 3: Personalize It (1 minute)

Ask them: **"What's your name?"**

Then personalize the app by editing `src/app/page.tsx`:
- Find the `<h1>` tag with "TechStart"
- Consider adding their name somewhere
- This shows them how easy modifications are!

---

## Step 4: Launch! (30 seconds)

```bash
npm run dev
```

**Say excitedly:** "Open http://localhost:3000 - your app is LIVE!"

---

## Step 5: The Celebration Moment

When they see the app, deliver this:

---

🎉 **You just launched your first app with Claude Code!**

**Look what you have:**
- ✅ A stunning dark-mode landing page
- ✅ Animated gradient background with floating orbs
- ✅ Interactive form with validation
- ✅ Dashboard preview with counter
- ✅ Glassmorphism cards
- ✅ TechStart brand colors (Indigo + Emerald)
- ✅ Fully responsive design

**This follows the TechStart brand guidelines:**
- Primary: #6366F1 (Indigo-500)
- Accent: #10B981 (Emerald-500)
- Dark theme: Slate-900 background

**Unlike Lovable or Bolt, you:**
- Own this code 100%
- Can open it in VS Code right now
- Can push to GitHub
- Can deploy anywhere
- Have no monthly limits

---

## Step 6: First Modification Challenge

Challenge them to make a change! Suggestions:

1. **Easy:** "Change your name in the welcome message"
2. **Medium:** "Add a 4th stat card showing 'Active Users'"
3. **Fun:** "Change the gradient colors to your favorites"

This proves they can modify Claude Code output - a key differentiator!

---

## The TechStart Scenario

Explain briefly:

> "TechStart is the fictional startup we'll be building throughout this workshop. Maria is a non-technical founder who hired us to rebuild her inventory app. In the `company-context` folder, you'll find brand guidelines, product vision, and company info. In `inherited-chaos`, there's the messy code we need to replace!"

This sets up the story for the full workshop.

---

## If Something Goes Wrong

| Problem | Solution |
|---------|----------|
| Port 3000 busy | `npx kill-port 3000` or use `npm run dev -- -p 3001` |
| Permission error | `sudo chown -R $(whoami) ~/Desktop/techstart-app` |
| npm install fails | Delete `node_modules` and `package-lock.json`, retry |
| TypeScript errors | Run `npm run build` to see detailed errors |
| Can't find starter-app | Make sure you're in the `course-materials` folder |

---

## Success Metrics

The participant should feel:
1. **Amazed** - "I can't believe this looks so good"
2. **Empowered** - "I can actually modify this myself"
3. **Curious** - "What else can we build?"

If they're smiling and asking questions, you've succeeded! 🎉

---

## What's Next

After this dopamine hit, they can:
- **Continue learning:** `/start-1-4` for Agents, Skills & Hooks
- **Set up safety net:** `/github-init` to push to GitHub
- **Start building features:** Use the Epic → Feature → Ticket structure

**The workshop continues with Module 3!**

---

*Part of the Claude Code Masterclass — Barcelona 2026*
