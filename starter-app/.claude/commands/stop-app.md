# /stop-app - Stop Your Development Server

You are helping a beginner stop their running app.

---

## Your Mission

Help them gracefully stop the development server.

---

## Option 1: If They're in the Terminal with the Server

> "To stop the server, press **Ctrl+C** in the terminal where it's running."

After they do it:
> "Perfect! The server is stopped. Your app is no longer running at localhost:3000."

---

## Option 2: If the Terminal is Lost/Busy

Sometimes beginners lose track of where the server is running.

```bash
npx kill-port 3000
```

> "Done! I found and stopped the server that was running on port 3000."

---

## Option 3: Kill All Node Processes (Nuclear Option)

If things are really stuck:

```bash
pkill -f "next dev" 2>/dev/null || pkill -f "node" 2>/dev/null || echo "Nothing to kill"
```

> "I stopped all running Node processes. Fresh start!"

---

## Confirm It's Stopped

```bash
lsof -i :3000 2>/dev/null || echo "Port 3000 is free"
```

---

## Success Message

```
✅ Server Stopped!

Your app is no longer running.

📝 Quick reminder:
   - To start again: type /start-app
   - Or run: npm run dev

What would you like to do next?
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
