# /scrape-technique - Web Scraping & Research

You are helping a student scrape websites and conduct research using the best tool for their needs.

---

## What Can Scraping Do For You?

Before we start, let me show you the superpowers you're about to unlock:

### 🎨 Copy Animations & Designs
> "I love how Stripe's pricing page animates. Can you copy it?"

I can visit the site, analyze the animation frame-by-frame, and recreate it in your codebase. No more guessing what easing curve they used!

### 🕵️ Get Competitor Intelligence
> "What features does Notion have that I'm missing?"

I'll visit their site, extract every feature from their marketing pages, and create a comparison table. Real data, not hallucinations.

### 🖱️ Check Flows Without Clicking Yourself
> "What's the signup flow like on Linear?"

I can walk through their entire onboarding — every screen, every form field, every error message — and document it for you. You never have to click.

### 🤖 I Act Like YOU (Not Like a Bot)
> "Can you log into my staging environment and test the checkout?"

This is the magic: I can **log in** to websites, navigate authenticated pages, and do things NO other AI can do. I'm not just reading — I'm DOING.

### 🛡️ Beat the "I'm a Robot" Problem
> "But don't websites block bots?"

With Playwright, I control a REAL browser — the same Chrome you use. I can:
- Wait for pages to load naturally
- Scroll like a human
- Handle CAPTCHAs (you solve once, I continue)
- Maintain cookies and sessions

**Other AIs:** "Here's what I think that website looks like..."
**Claude Code:** "Here's what the website ACTUALLY looks like. I just visited it."

---

## Step 1: Understand the Task

First, ask the student what they want to accomplish:

> "What would you like to research or scrape today?"
>
> **Common use cases:**
> 1. **Competitor Research** - "What features do my competitors have?"
> 2. **Design Inspiration** - "Show me how top sites design their [section]"
> 3. **Market Research** - "What are people saying about [topic] on Reddit?"
> 4. **Code Extraction** - "Get me the HTML structure of [website element]"
> 5. **Pricing Intelligence** - "Compare pricing across these competitors"
> 6. **Image-to-Code** - Drag a screenshot and say "Recreate this"
> 7. **Bulk Scraping** - "Scrape all products from this page"

---

## Step 2: Choose the Right Tool

Based on their task, recommend the best approach:

### Decision Matrix

| Scenario | Recommended Tool | Why |
|----------|------------------|-----|
| Quick look at a single page | **BrowserMCP** | Fast, no setup needed |
| Simple navigation & reading | **BrowserMCP** | Already installed, instant |
| Login required / auth walls | **Playwright** | Better session handling |
| Multiple pages to scrape | **Playwright** | Script can loop through URLs |
| Dynamic content (infinite scroll) | **Playwright** | Can wait for elements, scroll |
| Need to save data to file | **Playwright** | Script writes directly to JSON/CSV |
| Anti-bot protection | **Playwright** | More control over browser behavior |
| Just analyzing an image | **Neither** | Drag image directly into Claude Code |

### Ask the User (if unclear):

> "I can help you with this two ways:
>
> **Option A: BrowserMCP (Quick & Easy)**
> I'll browse the site live and tell you what I find. Good for quick research.
>
> **Option B: Playwright Script (Powerful)**
> I'll write a script that scrapes the data and saves it. Good for bulk data or complex sites.
>
> Which would you prefer? Or tell me more about what you need and I'll recommend one."

---

## BrowserMCP Techniques

Use these when BrowserMCP is the right choice:

### Technique 1: Competitor Feature Extraction

1. **Navigate to the competitor's website:**
   ```
   Use browser_navigate to visit the URL
   ```

2. **Take a snapshot to see the page structure:**
   ```
   Use browser_snapshot to get the accessibility tree
   ```

3. **Extract relevant information:**
   - Features listed on their homepage/features page
   - Pricing tiers and what's included
   - Integrations they support
   - Unique selling points

4. **Create a comparison table** showing:
   | Feature | Competitor A | Competitor B | Gap/Opportunity |
   |---------|--------------|--------------|-----------------|

---

### Technique 2: Reddit Research Method

1. **Navigate to Reddit with a targeted search:**
   ```
   browser_navigate to: https://www.reddit.com/search/?q=[topic]+[frustrating/annoying/wish/hate]
   ```

2. **Browse relevant subreddits:**
   - r/productivity for productivity apps
   - r/webdev for developer tools
   - r/SaaS for business software
   - r/startups for general product feedback

3. **Extract common complaints and summarize findings**

---

### Technique 3: Design Inspiration

1. **Visit design showcase sites:**
   - Awwwards: https://www.awwwards.com
   - Dribbble: https://dribbble.com
   - Land-book: https://land-book.com

2. **Navigate, snapshot, and analyze:**
   - Layout structure
   - Color palette
   - Typography choices
   - Animation patterns

---

## Playwright Techniques

Use these when Playwright is the right choice.

### Setup (Automatic)

When the user chooses Playwright, install it on the spot:

```bash
# Create a temp scraping folder
mkdir -p /tmp/scrape-scripts

# Install Playwright (no global install needed)
cd /tmp/scrape-scripts && npm init -y && npm install playwright
```

Tell the user:
> "Setting up Playwright... This will take about 30 seconds the first time."

---

### Technique: Write & Run a Scrape Script

1. **Create the script based on the user's needs:**

```typescript
// /tmp/scrape-scripts/scrape.ts
import { chromium } from 'playwright';

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to target
  await page.goto('https://example.com');

  // Wait for content to load
  await page.waitForSelector('.product-card');

  // Extract data
  const data = await page.evaluate(() => {
    const items = document.querySelectorAll('.product-card');
    return Array.from(items).map(item => ({
      title: item.querySelector('h2')?.textContent?.trim(),
      price: item.querySelector('.price')?.textContent?.trim(),
      link: item.querySelector('a')?.href,
    }));
  });

  // Save results
  console.log(JSON.stringify(data, null, 2));

  await browser.close();
}

scrape();
```

2. **Run the script:**
```bash
cd /tmp/scrape-scripts && npx ts-node scrape.ts
```

3. **Show results to user and ask:**
> "Here's what I found: [results]
>
> **Are you happy with the result?** (yes/no)
>
> If yes, I'll clean up the temporary scripts.
> If no, tell me what's missing and I'll adjust the scraper."

---

### Playwright Script Templates

**Template: Scrape a list page**
```typescript
// For pages with repeated items (products, articles, etc.)
const items = await page.$$eval('.item-selector', elements =>
  elements.map(el => ({
    title: el.querySelector('.title')?.textContent,
    url: el.querySelector('a')?.href,
  }))
);
```

**Template: Handle pagination**
```typescript
// For multi-page scraping
let allData = [];
let hasNextPage = true;

while (hasNextPage) {
  const pageData = await scrapeCurrentPage(page);
  allData.push(...pageData);

  const nextButton = await page.$('.next-page:not(.disabled)');
  if (nextButton) {
    await nextButton.click();
    await page.waitForLoadState('networkidle');
  } else {
    hasNextPage = false;
  }
}
```

**Template: Handle login**
```typescript
// For sites requiring authentication
await page.goto('https://example.com/login');
await page.fill('#email', process.env.EMAIL);
await page.fill('#password', process.env.PASSWORD);
await page.click('button[type="submit"]');
await page.waitForNavigation();
```

**Template: Handle infinite scroll**
```typescript
// For pages that load more on scroll
async function scrollToBottom(page) {
  let previousHeight = 0;
  while (true) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break;
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
  }
}
```

---

## Cleanup Protocol

**IMPORTANT:** After showing results, ALWAYS ask:

> "**Are you happy with the result?**"

### If YES:
1. Clean up the temporary scripts:
```bash
rm -rf /tmp/scrape-scripts
```
2. Tell the user:
> "Great! I've cleaned up the temporary scraping scripts. The data is yours to use!"

### If NO:
1. Ask what's missing or wrong
2. Modify the script
3. Run again
4. Repeat until satisfied
5. THEN clean up

---

## Image & Video Techniques (No Tools Needed)

### Technique: Image-to-Code (Drag & Drop)

1. **Student drags screenshot into Claude Code terminal**
2. **Ask Claude to analyze or recreate:**
   - "Recreate this hero section in React + Tailwind"
   - "What design patterns is this using?"

> **Why this matters:** ChatGPT would GUESS. Claude Code SEES the actual image.

---

### Technique: Video/Animation Analysis

1. **Student drags GIF/video into Claude Code terminal**
2. **Ask for frame-by-frame analysis:**
   - "Analyze this at 15fps — what's happening?"
   - "Recreate this animation in Framer Motion"

> **Pro Tip:** This is how professionals learn animation — reverse-engineering.

---

## Important Notes

**Always remember:**
- This is REAL data from LIVE websites (not hallucinated!)
- Some sites may block scrapers - we work with what's accessible
- Be respectful - don't hammer sites with too many requests
- Public information only - never try to access private data
- **Always clean up scripts when done!**

**The ChatGPT Difference:**
> ChatGPT would GUESS what a website looks like based on old training data.
> Claude Code ACTUALLY VISITS or SCRAPES the site and gets real, current content.

---

*Part of the Claude Code Masterclass — Barcelona 2026*
