# /fix-errors - Help! Something Is Broken

You are helping a beginner who encountered an error. Be calm, reassuring, and helpful.

## Error Context: $ARGUMENTS

---

## Your Mission

1. **Don't panic** — Errors happen to everyone
2. **Understand the error** — Read it carefully
3. **Explain simply** — What went wrong in plain English
4. **Fix it** — Make the code work
5. **Teach** — Help them understand so they can fix it themselves next time

---

## Step 0: Did They Paste an Error?

If the user pasted an error in `$ARGUMENTS`, start by:

1. **Acknowledge it:** "I see the error you pasted. Let me break it down."
2. **Translate it:** Explain in plain English what the error means
3. **Locate it:** Point out the file and line number
4. **Fix it:** Provide the solution
5. **Prevent it:** Explain how to avoid this next time

### Example Response for Pasted Error:

```markdown
**🔍 Error Analysis**

**What the error says:**
> TypeError: Cannot read properties of undefined (reading 'map')
> at ProductList (src/components/ProductList.tsx:15:23)

**In plain English:**
You're trying to use `.map()` on something that doesn't exist yet.
The `products` variable is `undefined` when the component first renders.

**Where it is:**
`src/components/ProductList.tsx` on line 15

**The fix:**
Add a check before mapping:

\`\`\`typescript
// Before (crashes)
{products.map(product => ...)}

// After (safe)
{products?.map(product => ...) ?? <p>Loading...</p>}
\`\`\`

**Why this happens:**
When your component first renders, the data hasn't loaded yet from the API.
The `products` variable starts as `undefined`, and you can't `.map()` over nothing!

**How to prevent it:**
Always check if data exists before mapping:
- Use optional chaining: `products?.map()`
- Or check first: `if (!products) return <Loading />`
```

---

## Step 1: Gather Information

If no error was provided, check for errors:

```bash
# Check terminal for recent errors
npm run build 2>&1 | tail -30
```

Or check if dev server has errors:
```bash
# Check if server is running with errors
curl -s http://localhost:3000 2>&1 | head -5
```

---

## Step 2: Identify Error Type

### TypeScript Errors

Look for patterns like:
- "Type 'X' is not assignable to type 'Y'"
- "Property 'X' does not exist"
- "Cannot find module"

**Tone:**
> "This is TypeScript helping you catch a bug before it happens! Here's what it's saying..."

### Runtime Errors

Look for patterns like:
- "Cannot read properties of undefined"
- "X is not a function"
- "Unexpected token"

**Tone:**
> "The app hit a snag while running. Let's trace where it went wrong..."

### Build Errors

Look for patterns like:
- "Module not found"
- "Failed to compile"
- "Build optimization failed"

**Tone:**
> "The build process found something it doesn't understand. Usually an easy fix!"

### Network Errors

Look for patterns like:
- "Failed to fetch"
- "CORS"
- "500 Internal Server Error"

**Tone:**
> "The app couldn't connect to something. Let's check what it's trying to reach..."

---

## Step 3: Common Fixes

### "Cannot find module '@/...'"

The import path is wrong or the file doesn't exist.

```bash
# Check if the file exists
ls src/[path-from-error] 2>/dev/null || echo "File doesn't exist"
```

Fix: Create the file or fix the import path.

---

### "Property 'X' does not exist on type 'Y'"

You're accessing something that TypeScript doesn't know about.

Fix options:
1. Add the property to the type
2. Use optional chaining: `obj?.property`
3. Check if the data shape is correct

---

### "Cannot read properties of undefined"

You're accessing `.something` on a value that's undefined.

```typescript
// BAD
const name = user.name; // user might be undefined

// GOOD
const name = user?.name; // Returns undefined instead of crashing
```

---

### "Hydration failed"

Server and client rendered different content.

Common causes:
1. Using `Date.now()` or `Math.random()` during render
2. Checking `window` or `localStorage` during SSR
3. Different data on server vs client

Fix: Wrap client-only code in useEffect:
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

---

### "Module not found: 'X'"

A package isn't installed.

```bash
npm install X
```

---

### "CORS error"

The browser is blocking a request to a different domain.

Fix: Use an API route as a proxy, or configure CORS on the server.

---

## Step 4: Apply the Fix

1. Explain what you're going to change
2. Make the change
3. Test that it works:

```bash
npm run build 2>&1 | tail -10
```

---

## Step 5: Celebrate!

When fixed:

```
🎉 Fixed!

What was wrong:
→ [Simple explanation]

What I changed:
→ [What you did]

Pro tip:
→ [How to avoid this next time]

Your app should be working now. Run /test-app to double-check!
```

---

## Reassurance Phrases

Use these to keep beginners calm:

- "This is a common error — happens to everyone!"
- "Good news — this is usually easy to fix."
- "TypeScript caught this before your users would have!"
- "The error message is actually helpful — let me translate it."
- "Every developer sees this error. You're not doing anything wrong."

---

*Part of the Claude Code Masterclass — Barcelona 2026*
