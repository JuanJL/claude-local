# /demo-scraper-test - Test Your Scraper Demo Before Workshop

This is a **practice command** to verify the scraper demo works before the live workshop.

---

## Pre-Workshop Checklist

Run this the day before to verify everything works:

### Test 1: Browser Navigation

```
Navigate to https://unsplash.com/s/photos/coffee and:
1. Confirm the page loads
2. Note 3 image URLs visible
3. Report: "Browser working: YES/NO"
```

**Expected:** Browser opens, navigates, you can see coffee photos.

---

### Test 2: Image Download

```
From the Unsplash coffee page:
1. Download 3 images to /demo-test/images/
2. Name them coffee-1.jpg, coffee-2.jpg, coffee-3.jpg
3. Confirm files exist with ls
```

**Expected:** 3 files in the folder.

---

### Test 3: Vision Analysis

```
Analyze the 3 downloaded coffee images:
1. For each, describe: colors, composition, mood
2. Create a mini "Visual DNA" report
3. Save to /demo-test/coffee-analysis.md
```

**Expected:** Markdown file with analysis of each image.

---

### Test 4: Full Demo Simulation

Run the exact demo you'll do live:

```
Go to dribbble.com/shots/popular and:
1. Download top 5 design shots
2. Analyze each for:
   - Design trends used
   - Color schemes
   - Typography style
3. Create a "2026 Design Trends" report
4. Save to /demo-test/design-trends.md
```

**Expected:** Complete report with downloaded images.

---

## Backup Sites if Main Sites Fail

| Primary | Backup | Why |
|---------|--------|-----|
| Instagram | Unsplash | IG may rate-limit |
| Dribbble | Behance | Different community |
| Twitter | LinkedIn | Different API rules |

---

## Troubleshooting

### "Browser not opening"

```bash
# Check BrowserMCP status
# In Claude Code settings, verify browser MCP is connected
```

**Fix:** Restart Claude Code, reconnect BrowserMCP

### "Images not downloading"

```bash
# Check folder permissions
mkdir -p /demo-test/images
chmod 755 /demo-test/images
```

**Fix:** Create folder manually, check write permissions

### "Vision analysis not working"

**Check:** Image file isn't corrupted
**Fix:** Try downloading a different image, smaller file size

---

## Pre-Demo Commands

Run these right before the workshop:

```bash
# 1. Clear old demo files
rm -rf /demo-test/*

# 2. Create fresh folders
mkdir -p /demo-test/images /demo-test/reports

# 3. Test browser MCP
# (run a simple navigation test)

# 4. Verify vision works
# (analyze a simple local image)
```

---

## Demo Readiness Checklist

- [ ] Browser MCP connected and working
- [ ] Test download completed successfully
- [ ] Vision analysis returned meaningful results
- [ ] Full demo simulation ran without errors
- [ ] Backup sites identified if primary fails
- [ ] Demo folder clean and ready

---

## If Everything Works

```
✅ DEMO READY!

All systems tested:
- Browser: Working
- Download: Working
- Vision: Working
- Full flow: Working

You're ready for the live workshop demo!

💡 Tips for live demo:
1. Have this test output open as backup
2. Know your backup sites
3. Stay calm if something fails - show the backup
4. The "fail and recover" is also a good demo!
```

---

## If Something Fails

```
⚠️ DEMO NEEDS ATTENTION

Failed component: [Browser/Download/Vision]

Backup plan:
1. Use pre-recorded GIF of the demo
2. Show static screenshots with narration
3. Focus on other demos that work

Remember: The workshop is about concepts, not perfect demos!
```

---

*Part of the Claude Code Masterclass — Barcelona 2026*
