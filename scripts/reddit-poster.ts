import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  generatePost,
  ALL_TEMPLATE_IDS,
  type TemplateId,
  type RedditPost,
} from "./reddit-templates.js";
import type { WeeklyDelta } from "../src/lib/delta-types.js";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PostHistoryEntry {
  date: string;
  templateId: string;
  market: string;
  subreddit: string;
  dataHash: string;
  emailSent: boolean;
  title: string;
}

interface CLIArgs {
  dryRun: boolean;
  template: TemplateId | null;
  market: string | null;
  subreddit: string | null;
}

// ── Config ────────────────────────────────────────────────────────────────────

interface Config {
  markets: { available: string[]; priority: string[] };
  subreddits: Record<string, string[]>;
  cooldown_hours: number;
  dedup_days: number;
}

const CONFIG: Config = JSON.parse(
  readFileSync(resolve(__dirname, "config.json"), "utf-8")
);

const HISTORY_PATH = resolve(__dirname, "reddit-post-history.json");
const AVAILABLE_MARKETS = CONFIG.markets.available;
const MARKET_PRIORITY = CONFIG.markets.priority;
const TEMPLATE_SUBREDDITS = CONFIG.subreddits;
const COOLDOWN_HOURS = CONFIG.cooldown_hours;
const DEDUP_DAYS = CONFIG.dedup_days;
const DRAFT_EMAIL = process.env.DRAFT_EMAIL ?? "jghmlacroix@gmail.com";

// ── CLI argument parsing ──────────────────────────────────────────────────────

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const result: CLIArgs = {
    dryRun: false,
    template: null,
    market: null,
    subreddit: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dry-run":
        result.dryRun = true;
        break;
      case "--template":
        result.template = args[++i] as TemplateId;
        break;
      case "--market":
        result.market = args[++i];
        break;
      case "--subreddit":
        result.subreddit = args[++i];
        break;
    }
  }

  return result;
}

// ── Post history management ───────────────────────────────────────────────────

function loadHistory(): PostHistoryEntry[] {
  try {
    const raw = readFileSync(HISTORY_PATH, "utf-8");
    try {
      return JSON.parse(raw) as PostHistoryEntry[];
    } catch (parseErr) {
      console.warn(`WARNING: post history is malformed JSON, starting fresh. Error: ${parseErr}`);
      return [];
    }
  } catch {
    return [];
  }
}

function saveHistory(history: PostHistoryEntry[]): void {
  writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2) + "\n");
}

// ── Template selection ────────────────────────────────────────────────────────

function selectTemplate(
  history: PostHistoryEntry[],
  forced: TemplateId | null
): TemplateId {
  if (forced) return forced;

  const recent = history
    .slice(-2)
    .map((h) => h.templateId)
    .filter(Boolean);

  const candidates = ALL_TEMPLATE_IDS.filter((t) => !recent.includes(t));
  if (candidates.length === 0) return ALL_TEMPLATE_IDS[0];

  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ── Market selection ──────────────────────────────────────────────────────────

function selectMarket(
  history: PostHistoryEntry[],
  forced: string | null
): string {
  if (forced) return forced;

  const recent = history
    .slice(-3)
    .map((h) => h.market)
    .filter(Boolean);

  const candidates = MARKET_PRIORITY.filter((m) => !recent.includes(m));
  if (candidates.length === 0) return MARKET_PRIORITY[0];

  return candidates[0];
}

// ── Subreddit selection ───────────────────────────────────────────────────────

function selectSubreddit(
  history: PostHistoryEntry[],
  allowedSubs: string[],
  forced: string | null
): string | null {
  if (forced) {
    return forced.replace(/^r\//, "");
  }

  const now = Date.now();
  const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;

  const available = allowedSubs.filter((sub) => {
    const lastPost = [...history]
      .reverse()
      .find((h) => h.subreddit === sub);
    if (!lastPost) return true;
    return now - new Date(lastPost.date).getTime() > cooldownMs;
  });

  if (available.length === 0) return null;

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const idx = dayOfYear % available.length;
  return available[idx];
}

// ── Duplicate check ───────────────────────────────────────────────────────────

function isDuplicate(
  history: PostHistoryEntry[],
  dataHash: string,
  subreddit: string
): boolean {
  const cutoff = Date.now() - DEDUP_DAYS * 24 * 60 * 60 * 1000;
  return history.some(
    (h) =>
      h.dataHash === dataHash &&
      h.subreddit === subreddit &&
      new Date(h.date).getTime() > cutoff
  );
}

// ── Markdown to HTML (for email preview) ──────────────────────────────────────

function markdownToHtml(md: string): string {
  return md
    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;">')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 style="margin:18px 0 8px;font-size:16px;color:#1a1a1b;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin:20px 0 10px;font-size:18px;color:#1a1a1b;">$2</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em style="color:#666;">$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#0079d3;text-decoration:none;">$1</a>')
    // Markdown tables → HTML tables
    .replace(/(\|.+\|\n\|[\s-:|]+\|\n(?:\|.+\|\n?)+)/g, (table) => {
      const rows = table.trim().split("\n");
      const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim());
      const dataRows = rows.slice(2).map((r) =>
        r.split("|").filter(Boolean).map((c) => c.trim())
      );

      let html = '<table style="border-collapse:collapse;width:100%;margin:12px 0;font-size:14px;">';
      html += "<thead><tr>";
      for (const h of headers) {
        html += `<th style="text-align:left;padding:10px 14px;background:#f8f9fa;border-bottom:2px solid #edeff1;color:#1a1a1b;font-weight:600;">${h}</th>`;
      }
      html += "</tr></thead><tbody>";
      for (let i = 0; i < dataRows.length; i++) {
        const bg = i % 2 === 0 ? "#fff" : "#f8f9fa";
        html += `<tr style="background:${bg};">`;
        for (const c of dataRows[i]) {
          html += `<td style="padding:8px 14px;border-bottom:1px solid #edeff1;color:#1a1a1b;">${c}</td>`;
        }
        html += "</tr>";
      }
      html += "</tbody></table>";
      return html;
    })
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;color:#1a1a1b;">$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul style="margin:8px 0;padding-left:20px;">$1</ul>')
    // Ordered lists (1. 2. etc)
    .replace(/^\d+\.\s/gm, (match) => match) // keep as-is, handled below
    // Paragraphs (non-empty lines that aren't already HTML)
    .replace(/^(?!<[a-z]|$|\d+\.)(.+)$/gm, '<p style="margin:8px 0;line-height:1.6;color:#1a1a1b;">$1</p>')
    // Clean up double spacing
    .replace(/\n{3,}/g, "\n\n");
}

// ── Email template ────────────────────────────────────────────────────────────

function buildEmailHtml(
  subreddit: string,
  title: string,
  body: string,
  templateId: string,
  market: string
): string {
  const submitUrl = `https://www.reddit.com/r/${subreddit}/submit?selftext=true`;
  const previewHtml = markdownToHtml(body);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="background:#ff4500;border-radius:12px 12px 0 0;padding:24px 28px;text-align:center;">
      <div style="font-size:24px;font-weight:700;color:white;">Reddit Draft</div>
      <div style="color:rgba(255,255,255,0.85);margin-top:6px;font-size:15px;">Ready to post to r/${esc(subreddit)}</div>
    </div>

    <!-- Action bar -->
    <div style="background:#1a1a1b;padding:16px 28px;display:flex;align-items:center;">
      <a href="${submitUrl}" style="display:inline-block;background:#ff4500;color:white;padding:12px 28px;border-radius:24px;text-decoration:none;font-weight:600;font-size:15px;">
        Open r/${esc(subreddit)} &rarr; Create Post
      </a>
      <span style="color:#818384;font-size:13px;margin-left:16px;">${templateId} &middot; ${market} market</span>
    </div>

    <!-- Title section -->
    <div style="background:white;padding:24px 28px;border-bottom:1px solid #edeff1;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#ff4500;font-weight:600;margin-bottom:8px;">Post Title</div>
      <div style="font-size:17px;font-weight:600;color:#1a1a1b;line-height:1.4;padding:14px 16px;background:#f8f9fa;border-radius:8px;border-left:4px solid #ff4500;">
        ${esc(title)}
      </div>
    </div>

    <!-- Preview section -->
    <div style="background:white;padding:24px 28px;border-bottom:1px solid #edeff1;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#0079d3;font-weight:600;margin-bottom:14px;">Preview (how it will look on Reddit)</div>
      <div style="padding:16px;background:#fafafa;border-radius:8px;border:1px solid #edeff1;">
        ${previewHtml}
      </div>
    </div>

    <!-- Raw markdown section -->
    <div style="background:white;padding:24px 28px;border-bottom:1px solid #edeff1;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#818384;font-weight:600;margin-bottom:8px;">Raw Markdown (copy &amp; paste into Reddit)</div>
      <pre style="background:#1a1a1b;color:#d7dadc;padding:16px;border-radius:8px;font-size:13px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word;overflow-x:auto;font-family:'SF Mono',Monaco,Consolas,monospace;">${esc(body)}</pre>
    </div>

    <!-- Footer -->
    <div style="padding:16px 28px;text-align:center;border-radius:0 0 12px 12px;background:#f8f9fa;">
      <div style="color:#818384;font-size:12px;">
        LobbyRanker Reddit Poster &middot; ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      </div>
    </div>

  </div>
</body>
</html>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Email sending via Resend ──────────────────────────────────────────────────

async function sendDraftEmail(
  subreddit: string,
  title: string,
  body: string,
  templateId: string,
  market: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("No RESEND_API_KEY set — cannot send draft email.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LobbyRanker Bot <bot@lobbyranker.com>",
        to: DRAFT_EMAIL,
        subject: `[r/${subreddit}] ${title}`,
        html: buildEmailHtml(subreddit, title, body, templateId, market),
      }),
    });

    if (res.ok) {
      console.log(`Draft email sent to ${DRAFT_EMAIL}`);
      return true;
    } else {
      const text = await res.text();
      console.log(`Email failed (${res.status}): ${text}`);
      return false;
    }
  } catch (err) {
    console.log(`Email error: ${err}`);
    return false;
  }
}

// ── Alert email (for failures) ────────────────────────────────────────────────

async function sendAlertEmail(
  subject: string,
  details: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LobbyRanker Bot <bot@lobbyranker.com>",
        to: DRAFT_EMAIL,
        subject: `[ALERT] ${subject}`,
        html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:#dc2626;color:white;padding:16px 24px;border-radius:8px 8px 0 0;font-weight:600;font-size:18px;">Reddit Poster Alert</div>
          <div style="background:white;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0 0 12px;font-weight:600;">${esc(subject)}</p>
            <pre style="background:#f4f4f4;padding:12px;border-radius:4px;font-size:13px;white-space:pre-wrap;">${esc(details)}</pre>
            <p style="color:#666;font-size:12px;margin:16px 0 0;">${new Date().toISOString()}</p>
          </div>
        </div>`,
      }),
    });
    console.log(`Alert email sent to ${DRAFT_EMAIL}`);
  } catch {
    console.log("Failed to send alert email");
  }
}

// ── Delta data from Redis (optional) ──────────────────────────────────────────

async function loadDeltaFromRedis(
  market: string
): Promise<WeeklyDelta | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/weekly-delta:${market}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as { result: string | null };
    if (!json.result) return null;

    return JSON.parse(json.result) as WeeklyDelta;
  } catch {
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = parseArgs();
  const history = loadHistory();

  console.log(
    `Reddit Poster — ${args.dryRun ? "DRY RUN" : "EMAIL DRAFT"} mode`
  );
  console.log(`History: ${history.length} previous posts`);

  // 1. Select template
  const templateId = selectTemplate(history, args.template);
  console.log(`Template: ${templateId}`);

  // 2. Select market
  const market = selectMarket(history, args.market);
  console.log(`Market: ${market}`);

  // 3. Select subreddit first (needed for tone-aware generation)
  const allowedSubs = TEMPLATE_SUBREDDITS[templateId] ?? ["igaming"];
  const subreddit = selectSubreddit(history, allowedSubs, args.subreddit);
  if (!subreddit) {
    console.log("All subreddits on cooldown. Skipping today.");
    return;
  }
  console.log(`Subreddit: r/${subreddit}`);

  // 4. Load delta if needed
  let delta: WeeklyDelta | null = null;
  if (templateId === "weekly-movers") {
    delta = await loadDeltaFromRedis(market);
    if (!delta) {
      console.log(
        "No delta data available for weekly-movers. Falling back to another template."
      );
      const fallbackTemplates = ALL_TEMPLATE_IDS.filter(
        (t) => t !== "weekly-movers"
      );
      const fallbackTemplate =
        fallbackTemplates[
          Math.floor(Math.random() * fallbackTemplates.length)
        ];
      console.log(`Fallback template: ${fallbackTemplate}`);
      return generateAndProcess(
        fallbackTemplate,
        market,
        subreddit,
        history,
        args,
        null
      );
    }
  }

  return generateAndProcess(
    templateId,
    market,
    subreddit,
    history,
    args,
    delta
  );
}

async function generateAndProcess(
  templateId: TemplateId,
  market: string,
  subreddit: string,
  history: PostHistoryEntry[],
  args: CLIArgs,
  delta: WeeklyDelta | null
): Promise<void> {
  // Generate post with subreddit-aware tone
  let post = generatePost(
    templateId,
    market,
    AVAILABLE_MARKETS,
    delta,
    subreddit
  );

  // Try alternative markets if primary fails
  if (!post) {
    const altMarkets = MARKET_PRIORITY.filter((m) => m !== market);
    for (const altMarket of altMarkets) {
      console.log(`No data for ${market}, trying ${altMarket}...`);
      post = generatePost(
        templateId,
        altMarket,
        AVAILABLE_MARKETS,
        delta,
        subreddit
      );
      if (post) break;
    }
  }

  if (!post) {
    console.log("ERROR: All markets failed to generate a post.");
    await sendAlertEmail(
      "Reddit Poster: no post generated",
      `Template "${templateId}" returned null for all available markets.\n\nCheck if market data files exist and contain enough data.`
    );
    return;
  }

  // Check duplicate
  if (isDuplicate(history, post.dataHash, subreddit)) {
    console.log(
      `Duplicate detected (hash ${post.dataHash} on r/${subreddit} within ${DEDUP_DAYS} days). Skipping.`
    );
    return;
  }

  // Dry run — print to stdout
  if (args.dryRun) {
    console.log("\n" + "=".repeat(60));
    console.log(`SUBREDDIT: r/${subreddit}`);
    console.log(
      `SUBMIT URL: https://www.reddit.com/r/${subreddit}/submit?selftext=true`
    );
    console.log(`TITLE: ${post.title}`);
    console.log("=".repeat(60));
    console.log(post.body);
    console.log("=".repeat(60));
    console.log(`Data hash: ${post.dataHash}`);
    console.log(`Template: ${post.templateId}`);
    console.log(`Market: ${post.market}`);
    return;
  }

  // Send draft email
  console.log(`Sending draft email for r/${subreddit}...`);
  const sent = await sendDraftEmail(
    subreddit,
    post.title,
    post.body,
    post.templateId,
    post.market
  );

  // Update history
  history.push({
    date: new Date().toISOString(),
    templateId: post.templateId,
    market: post.market,
    subreddit,
    dataHash: post.dataHash,
    emailSent: sent,
    title: post.title,
  });
  saveHistory(history);

  if (sent) {
    console.log("Done! Check your email for the draft.");
  } else {
    console.log("ERROR: Draft email failed — check RESEND_API_KEY.");
    // Don't send alert email since email itself is broken
  }
}

main().catch(async (err) => {
  console.error("Fatal error:", err);
  await sendAlertEmail(
    "Reddit Poster crashed",
    `Unhandled error: ${err instanceof Error ? err.message : String(err)}\n\n${err instanceof Error ? err.stack ?? "" : ""}`
  ).catch(() => {});
  process.exit(0);
});
