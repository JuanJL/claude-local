# /test-app - Quick Test Your App Works

You are helping a beginner verify their app is working properly.

## User Request: $ARGUMENTS

---

## Your Mission

Do a quick health check on their app. Make sure everything is working before they continue building.

---

## Test 1: Can It Build?

The build test catches most errors:

```bash
npm run build 2>&1
```

### If Build Succeeds:
```
✅ Build Test: PASSED

Your app compiles without errors!
This means:
- All TypeScript types are correct
- All imports work
- No syntax errors
```

### If Build Fails:
```
❌ Build Test: FAILED

Let me look at the errors...
```

Then help them fix the specific errors.

---

## Test 2: Is the Dev Server Working?

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "NOT_RUNNING"
```

### If Returns 200:
```
✅ Server Test: PASSED

Your app is running and responding at localhost:3000
```

### If NOT_RUNNING:
```
⚠️ Server Test: Not running

Your dev server isn't started. Run /start-app first!
```

---

## Test 3: Check for Common Issues

### Missing Environment Variables

```bash
grep -r "process.env" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -5
```

If found, check .env.local exists:
```bash
ls .env.local 2>/dev/null || echo "MISSING"
```

### TypeScript Errors

```bash
npx tsc --noEmit 2>&1 | head -20
```

### Lint Errors

```bash
npm run lint 2>&1 | head -20
```

---

## Test 4: Visual Check with Browser (If BrowserMCP Available)

If browser tools are available, do a visual check:

1. Navigate to localhost:3000
2. Take a screenshot
3. Check for:
   - Page loads without blank screen
   - No error messages visible
   - Basic layout renders

---

## Output: Health Report

```
🏥 App Health Check Report
═══════════════════════════

✅ Build:      PASSED
✅ Server:     RUNNING
✅ TypeScript: No errors
⚠️ Lint:       2 warnings (non-critical)
✅ Env:        .env.local exists

───────────────────────────
Overall Status: HEALTHY ✅
───────────────────────────

Your app is ready! What would you like to build next?
```

Or if issues:

```
🏥 App Health Check Report
═══════════════════════════

❌ Build:      FAILED
   → Error in src/components/Header.tsx line 15
   → "Cannot find module '@/lib/utils'"

✅ Server:     RUNNING
⚠️ TypeScript: 3 errors

───────────────────────────
Overall Status: NEEDS FIXES 🔧
───────────────────────────

Let me help you fix these issues...
```

Then proceed to fix each issue.

---

## Quick Fixes Library

### "Module not found"
```bash
# Check if the file exists
ls src/lib/utils.ts 2>/dev/null || echo "File missing - let me create it"
```

### "Cannot read properties of undefined"
Usually means:
- Data is null/undefined
- Add optional chaining: `data?.property`

### "Hydration mismatch"
Usually means:
- Server and client render different content
- Check for Date/Time or random values

### "Port 3000 already in use"
```bash
npx kill-port 3000
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
