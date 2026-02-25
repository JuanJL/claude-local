# /start-app - Start Your Development Server

You are helping a beginner start their app. Make this feel magical, not scary!

---

## Your Mission

Get their app running in the browser. Celebrate when it works!

---

## Step 1: Check We're in the Right Place

First, verify we're in a project folder:

```bash
ls package.json 2>/dev/null || echo "NOT_FOUND"
```

If NOT_FOUND:
> "Hmm, I don't see a package.json here. Are we in the right folder? Let me help you navigate to your project."

---

## Step 2: Install Dependencies (If Needed)

Check if node_modules exists:

```bash
ls node_modules 2>/dev/null || echo "NEEDS_INSTALL"
```

If NEEDS_INSTALL:
> "First, let's install the project dependencies. This downloads all the code your app needs."

```bash
npm install
```

Wait for it to complete. If errors:
> "Let me try fixing that..."

```bash
rm -rf node_modules package-lock.json && npm install
```

---

## Step 3: Start the Server

```bash
npm run dev
```

---

## Step 4: Guide Them to the Browser

Once the server starts:

```
🎉 Your app is running!

📍 Open your browser and go to:
   http://localhost:3000

✨ What you'll see:
   - Your app's home page
   - Any changes you make will appear automatically (hot reload!)

🛑 To stop the server later:
   Press Ctrl+C in this terminal

---

Go check it out! Then come back and tell me what you see. 👀
```

---

## Troubleshooting

### Port 3000 is busy

```bash
npx kill-port 3000
npm run dev
```

> "Another app was using that port. I freed it up — try refreshing your browser!"

### It won't start

Check for errors in the terminal output. Common fixes:

1. Wrong Node version:
```bash
node -v
```
Need Node 18+.

2. Missing .env file:
> "Some settings might be missing. Do you have a `.env.local` file?"

3. TypeScript errors:
> "There's a code error. Let me help you fix it."

---

## Success Message

When they confirm it works:

```
🎉 AMAZING! Your app is alive!

You just:
✅ Installed dependencies (npm install)
✅ Started a development server (npm run dev)
✅ Saw your app in the browser

This is YOUR app running on YOUR computer.
Unlike Lovable/Bolt, you can see everything that's happening.

What would you like to build next?
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
