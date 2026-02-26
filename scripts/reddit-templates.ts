import { readFileSync } from "fs";
import { createHash } from "crypto";
import { resolve } from "path";
import type {
  RealMarketData,
  RealGame,
  ProviderStats,
  CategoryStats,
  WeeklyDelta,
} from "../src/lib/delta-types.js";
import { MARKET_REGISTRY } from "../src/lib/delta-types.js";

// ── Data loading ──────────────────────────────────────────────────────────────

const DATA_DIR = resolve(__dirname, "../src/data");

export function loadMarketData(market: string): RealMarketData | null {
  try {
    const raw = readFileSync(
      resolve(DATA_DIR, `${market}-real-data.json`),
      "utf-8"
    );
    return JSON.parse(raw) as RealMarketData;
  } catch {
    return null;
  }
}

// ── Provider aggregation ──────────────────────────────────────────────────────

export function computeProviderStats(data: RealMarketData): ProviderStats[] {
  const map = new Map<
    string,
    { total_visibility: number; game_count: number }
  >();
  const totalVisibility = data.games.reduce(
    (s, g) => s + g.visibility_score,
    0
  );

  for (const g of data.games) {
    const entry = map.get(g.provider) ?? { total_visibility: 0, game_count: 0 };
    entry.total_visibility += g.visibility_score;
    entry.game_count++;
    map.set(g.provider, entry);
  }

  return [...map.entries()]
    .map(([provider, stats]) => ({
      provider,
      total_visibility: round(stats.total_visibility),
      game_count: stats.game_count,
      avg_visibility: round(stats.total_visibility / stats.game_count),
      market_share_pct: round((stats.total_visibility / totalVisibility) * 100),
    }))
    .sort((a, b) => b.total_visibility - a.total_visibility);
}

// ── Category aggregation ──────────────────────────────────────────────────────

export function computeCategoryBreakdown(
  data: RealMarketData
): CategoryStats[] {
  const map = new Map<
    string,
    { total_visibility: number; game_count: number; providers: Map<string, number> }
  >();
  const totalVisibility = data.games.reduce(
    (s, g) => s + g.visibility_score,
    0
  );

  for (const g of data.games) {
    const entry = map.get(g.category) ?? {
      total_visibility: 0,
      game_count: 0,
      providers: new Map(),
    };
    entry.total_visibility += g.visibility_score;
    entry.game_count++;
    entry.providers.set(
      g.provider,
      (entry.providers.get(g.provider) ?? 0) + g.visibility_score
    );
    map.set(g.category, entry);
  }

  return [...map.entries()]
    .map(([category, stats]) => {
      const topProvider = [...stats.providers.entries()].sort(
        (a, b) => b[1] - a[1]
      )[0];
      return {
        category,
        total_visibility: round(stats.total_visibility),
        game_count: stats.game_count,
        avg_visibility: round(stats.total_visibility / stats.game_count),
        share_pct: round((stats.total_visibility / totalVisibility) * 100),
        top_provider: topProvider[0],
      };
    })
    .sort((a, b) => b.total_visibility - a.total_visibility);
}

// ── Dedup hash ────────────────────────────────────────────────────────────────

export function hashContent(
  templateId: string,
  market: string,
  dataKey: string
): string {
  return createHash("sha256")
    .update(`${templateId}:${market}:${dataKey}`)
    .digest("hex")
    .slice(0, 12);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function round(n: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function markdownTable(headers: string[], rows: string[][]): string {
  const header = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return `${header}\n${sep}\n${body}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Subreddit tone profiles ───────────────────────────────────────────────────

interface SubredditTone {
  audience: string;
  style: "industry" | "player" | "casual" | "enthusiast" | "analytical";
}

const SUBREDDIT_TONES: Record<string, SubredditTone> = {
  igaming: { audience: "industry professionals", style: "industry" },
  onlinegambling: { audience: "active online casino players", style: "player" },
  gambling: { audience: "gambling enthusiasts", style: "casual" },
  slots: { audience: "slot players", style: "enthusiast" },
  casinotracker: { audience: "casino data enthusiasts", style: "analytical" },
};

// ── Template types ────────────────────────────────────────────────────────────

export interface RedditPost {
  templateId: string;
  title: string;
  body: string;
  subreddits: string[];
  dataHash: string;
  market: string;
}

export type TemplateId =
  | "provider-market-share"
  | "top-games-ranking"
  | "weekly-movers"
  | "cross-market-comparison"
  | "category-insights";

export const ALL_TEMPLATE_IDS: TemplateId[] = [
  "provider-market-share",
  "top-games-ranking",
  "weekly-movers",
  "cross-market-comparison",
  "category-insights",
];

const FOOTER = `\n\n---\n\n*Data from [LobbyRanker](https://lobbyranker.com) — we track lobby visibility across ${Object.keys(MARKET_REGISTRY).length} regulated European markets daily*`;

// ── Template 1: Provider Market Share ─────────────────────────────────────────

export function generateProviderMarketShare(
  data: RealMarketData,
  subreddit: string
): RedditPost | null {
  const stats = computeProviderStats(data);
  if (stats.length < 3) return null;

  const top = stats[0];
  const runner = stats[1];
  const tone = SUBREDDIT_TONES[subreddit] ?? SUBREDDIT_TONES.gambling;

  // Find interesting data points for narrative
  const topSlotProvider = stats[0];
  const combinedTopTwo = round(stats[0].market_share_pct + stats[1].market_share_pct);
  const smallProviders = stats.filter((s) => s.market_share_pct < 5);

  const top5 = stats.slice(0, 5);
  const table = markdownTable(
    ["Provider", "Visibility Share", "Games Tracked", "Avg Score"],
    top5.map((s) => [
      s.provider,
      `${s.market_share_pct}%`,
      String(s.game_count),
      String(s.avg_visibility),
    ])
  );

  const title = `${top.provider} controls ${top.market_share_pct}% of lobby visibility in ${data.market_name} regulated casinos`;

  let body: string;

  if (tone.style === "industry") {
    body = [
      `We monitor lobby placements across all ${data.total_casinos} regulated ${data.market_name} online casinos on a daily basis. The latest data shows a clear concentration of visibility at the top.`,
      "",
      `**${top.provider}** commands ${top.market_share_pct}% of total lobby visibility with just ${top.game_count} games — an average score of ${top.avg_visibility} per title. That's a significant gap over ${runner.provider} at ${runner.market_share_pct}%.`,
      "",
      `### Provider Visibility Rankings (${data.market})`,
      "",
      table,
      "",
      `Together, the top two providers control **${combinedTopTwo}%** of all lobby visibility. That leaves ${smallProviders.length} smaller providers splitting the remaining space.`,
      "",
      `### What this means`,
      "",
      `High visibility concentration typically signals strong B2B relationships between providers and operators. ${top.provider}'s dominance likely reflects both the quality of their titles and favorable commercial terms with ${data.market_name} operators.`,
      "",
      `Worth noting: visibility doesn't equal revenue share — a game can be prominently placed without being the top earner. But lobby position is one of the strongest predictors of player engagement.`,
      "",
      `What trends are you seeing on the operator side? Is this concentration healthy for the market?`,
    ].join("\n");
  } else if (tone.style === "player") {
    body = [
      `Ever notice how certain games always seem to be front and center when you open an online casino? That's not random — it's lobby placement strategy.`,
      "",
      `I track which games get the most prominent positions across ${data.total_casinos} licensed ${data.market_name} casinos. Here's the current state:`,
      "",
      `### Who dominates the lobbies?`,
      "",
      table,
      "",
      `**${top.provider}** is everywhere. Their ${top.game_count} tracked games average a visibility score of ${top.avg_visibility}, meaning they consistently get top lobby positions across almost every casino.`,
      "",
      `**What this means for you as a player:** The games you see first when opening a casino aren't necessarily the "best" games — they're the ones with the best placement deals. ${top.provider} and ${runner.provider} together take up **${combinedTopTwo}%** of the visible lobby space.`,
      "",
      `If you want to find hidden gems, you often need to scroll past the first few rows or use the search function. The ${smallProviders.length} smaller providers have some great titles but they're buried deeper in the lobby.`,
      "",
      `Have you noticed this at your casino? Do you tend to play whatever's on the homepage, or do you dig deeper?`,
    ].join("\n");
  } else if (tone.style === "enthusiast") {
    body = [
      `If you play at ${data.market_name} online casinos, you've probably noticed some providers seem to own the lobby. Here's the actual data on who gets the most screen time.`,
      "",
      table,
      "",
      `**${top.provider}** absolutely dominates with ${top.market_share_pct}% of total visibility. Their games like ${data.games.filter((g) => g.provider === top.provider).slice(0, 3).map((g) => g.name).join(", ")} are basically impossible to miss.`,
      "",
      `Meanwhile, ${runner.provider} is a distant second at ${runner.market_share_pct}%. The gap between #1 and #2 is ${round(top.market_share_pct - runner.market_share_pct)} percentage points — that's massive.`,
      "",
      `The interesting thing is that high visibility doesn't always mean those are the best games to play. It means the provider has strong deals with operators. Some of the best slots from smaller studios like ${stats.length > 4 ? stats[4].provider : "indie studios"} barely get any lobby space.`,
      "",
      `What ${top.provider} games do you actually enjoy vs. which ones do you just see everywhere?`,
    ].join("\n");
  } else if (tone.style === "analytical") {
    body = [
      `### ${data.market} Market — Provider Visibility Analysis`,
      "",
      `**Data set:** ${data.total_games} games across ${data.total_casinos} regulated operators`,
      `**Last updated:** ${data.last_updated}`,
      "",
      table,
      "",
      `### Key metrics`,
      "",
      `- **Market concentration:** Top 2 providers hold ${combinedTopTwo}% of visibility (HHI suggests moderate-to-high concentration)`,
      `- **${top.provider} efficiency:** ${top.market_share_pct}% share from only ${top.game_count} games = ${round(top.market_share_pct / top.game_count, 2)}% per title`,
      `- **${runner.provider} efficiency:** ${runner.market_share_pct}% share from ${runner.game_count} games = ${round(runner.market_share_pct / runner.game_count, 2)}% per title`,
      `- **Long tail:** ${smallProviders.length} providers with <5% share each`,
      "",
      `### Observations`,
      "",
      `The ${data.market} market shows typical European concentration patterns. ${top.provider}'s average visibility score of ${top.avg_visibility} suggests consistent top-3 lobby positioning across operators rather than dominance in a few casinos.`,
      "",
      `Methodology: Visibility score (0-100) combines lobby position, number of operators featuring the game, and placement prominence. Tracked daily across all licensed operators in the market.`,
    ].join("\n");
  } else {
    body = [
      `Here's a fun fact: when you open an online casino in ${data.market_name}, about a third of what you see comes from a single game provider.`,
      "",
      `I've been tracking which companies get the most lobby space across ${data.total_casinos} regulated casinos, and the results are pretty eye-opening:`,
      "",
      table,
      "",
      `**${top.provider}** is basically the Netflix of ${data.market_name} casino lobbies — you can't avoid them. With ${top.game_count} games averaging a ${top.avg_visibility} visibility score, their titles dominate the homepage of almost every operator.`,
      "",
      `The two biggest providers together control **${combinedTopTwo}%** of all lobby visibility. That means when you open a casino, half of everything you see comes from just two companies.`,
      "",
      `Meanwhile, ${smallProviders.length} smaller providers are fighting over the remaining space. Some of them make fantastic games — they just don't get the prime shelf placement.`,
      "",
      `Does it bother anyone else that we're basically being shown the same providers everywhere? Or is there a reason they're on top?`,
    ].join("\n");
  }

  return {
    templateId: "provider-market-share",
    title,
    body: body + FOOTER,
    subreddits: ["igaming", "onlinegambling", "gambling"],
    dataHash: hashContent(
      "provider-market-share",
      data.market,
      `${top.provider}:${top.market_share_pct}`
    ),
    market: data.market,
  };
}

// ── Template 2: Top Games Ranking ─────────────────────────────────────────────

export function generateTopGamesRanking(
  data: RealMarketData,
  subreddit: string
): RedditPost | null {
  if (data.games.length < 10) return null;

  const top10 = data.games.slice(0, 10);
  const tone = SUBREDDIT_TONES[subreddit] ?? SUBREDDIT_TONES.gambling;

  // Find interesting patterns in the top 10
  const providerCounts = new Map<string, number>();
  for (const g of top10) {
    providerCounts.set(g.provider, (providerCounts.get(g.provider) ?? 0) + 1);
  }
  const dominantProvider = [...providerCounts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0];
  const categories = [...new Set(top10.map((g) => g.category))];
  const universalGame = top10.find(
    (g) => g.casino_count >= data.total_casinos * 0.9
  );

  const title = `The 10 most visible games in ${data.market_name} online casinos right now`;

  let body: string;

  if (tone.style === "enthusiast" || tone.style === "player") {
    const list = top10
      .map((g, i) => {
        const inPct = round((g.casino_count / data.total_casinos) * 100);
        let note = "";
        if (i === 0) note = " **👑 #1 most visible**";
        else if (g.casino_count >= data.total_casinos * 0.9)
          note = ` — available almost everywhere`;
        else if (g.category !== "slots") note = ` — ${g.category} game`;
        return `**${i + 1}. ${g.name}** by ${g.provider}\n   Score: ${g.visibility_score} — Found in ${g.casino_count}/${data.total_casinos} casinos (${inPct}%)${note}`;
      })
      .join("\n\n");

    body = [
      `Which games do ${data.market_name} casinos push the hardest? I track lobby positions across all ${data.total_casinos} regulated operators to find out.`,
      "",
      `Here's the current top 10 — ranked by how prominently each game is placed across casino lobbies, not just whether it's available:`,
      "",
      list,
      "",
      `---`,
      "",
      `### Quick takeaways`,
      "",
      `- **${dominantProvider[0]}** has ${dominantProvider[1]} games in the top 10 — they clearly have the strongest operator relationships`,
      `- ${universalGame ? `**${universalGame.name}** is in ${universalGame.casino_count}/${data.total_casinos} casinos — almost impossible to miss` : `No single game appears in every casino`}`,
      `- Categories represented: ${categories.map(capitalize).join(", ")}`,
      "",
      `Remember: a high visibility score means the game gets premium lobby placement — not that it's necessarily the most played or highest-paying game.`,
      "",
      `How many of these have you played? Any favorites missing from the top 10?`,
    ].join("\n");
  } else if (tone.style === "industry") {
    const table = markdownTable(
      ["#", "Game", "Provider", "Category", "Score", "Casinos"],
      top10.map((g, i) => [
        String(i + 1),
        g.name,
        g.provider,
        g.category,
        String(g.visibility_score),
        `${g.casino_count}/${data.total_casinos}`,
      ])
    );

    body = [
      `Latest lobby visibility rankings from ${data.total_casinos} regulated ${data.market_name} operators. These rankings reflect prominence of placement, not revenue or play volume.`,
      "",
      table,
      "",
      `### Analysis`,
      "",
      `**Provider concentration:** ${dominantProvider[0]} holds ${dominantProvider[1]}/10 top positions, reinforcing their lobby dominance in ${data.market}. ${providerCounts.size === 2 ? "Only 2 providers" : `${providerCounts.size} providers`} represented in the top 10.`,
      "",
      `**Category mix:** ${categories.length === 1 ? "Entirely slots — no category diversity in the top 10" : `${categories.map(capitalize).join(", ")} — ${categories.includes("live") ? "live casino maintaining" : "live casino absent from"} top positions`}.`,
      "",
      `**Distribution gap:** #1 (${top10[0].visibility_score}) vs #10 (${top10[9].visibility_score}) = ${round(top10[0].visibility_score - top10[9].visibility_score)} point spread. ${top10[0].visibility_score - top10[9].visibility_score > 25 ? "Steep dropoff indicating strong top-heavy concentration." : "Relatively flat curve suggesting competitive positioning."}`,
      "",
      `The visibility score methodology: daily tracking of lobby positions weighted by prominence and operator coverage.`,
    ].join("\n");
  } else if (tone.style === "analytical") {
    const table = markdownTable(
      ["#", "Game", "Provider", "Score", "Coverage", "Avg Pos"],
      top10.map((g, i) => [
        String(i + 1),
        g.name,
        g.provider,
        String(g.visibility_score),
        `${round((g.casino_count / data.total_casinos) * 100)}%`,
        String(g.avg_position),
      ])
    );

    body = [
      `### ${data.market} Market — Top 10 Lobby Visibility (${data.last_updated})`,
      "",
      `**Operators monitored:** ${data.total_casinos} | **Total games tracked:** ${data.total_games}`,
      "",
      table,
      "",
      `### Metrics explained`,
      `- **Score (0-100):** Composite of lobby position, operator coverage, and placement prominence`,
      `- **Coverage:** Percentage of licensed operators featuring this game`,
      `- **Avg Pos:** Mean lobby position across operators (lower = closer to top)`,
      "",
      `### Notable patterns`,
      `- Score range: ${top10[9].visibility_score}–${top10[0].visibility_score} (spread: ${round(top10[0].visibility_score - top10[9].visibility_score)})`,
      `- ${dominantProvider[0]} representation: ${dominantProvider[1]}/10 titles`,
      `- Highest coverage: ${top10.sort((a, b) => b.casino_count - a.casino_count)[0].name} at ${round((top10[0].casino_count / data.total_casinos) * 100)}%`,
      `- Best avg position: ${[...top10].sort((a, b) => a.avg_position - b.avg_position)[0].name} at ${[...top10].sort((a, b) => a.avg_position - b.avg_position)[0].avg_position}`,
    ].join("\n");
  } else {
    const list = top10
      .map(
        (g, i) =>
          `${i + 1}. **${g.name}** (${g.provider}) — Score: ${g.visibility_score}, in ${g.casino_count}/${data.total_casinos} casinos`
      )
      .join("\n");

    body = [
      `If you play at online casinos in ${data.market_name}, these are the games the operators WANT you to see first. I track lobby positions across all ${data.total_casinos} regulated casinos.`,
      "",
      list,
      "",
      `${dominantProvider[0]} has ${dominantProvider[1]} out of 10 games on this list — they basically own the lobby in ${data.market_name}.`,
      "",
      `Visibility score measures how prominently a game is placed, not how good it is. A game with a score of ${top10[0].visibility_score} is basically impossible to miss at any ${data.market_name} online casino.`,
      "",
      `Curious: do you usually play whatever's on the homepage, or do you have specific games you search for?`,
    ].join("\n");
  }

  return {
    templateId: "top-games-ranking",
    title,
    body: body + FOOTER,
    subreddits: ["slots", "onlinegambling", "gambling", "casinotracker"],
    dataHash: hashContent(
      "top-games-ranking",
      data.market,
      top10.map((g) => g.name).join(",")
    ),
    market: data.market,
  };
}

// ── Template 3: Weekly Movers ─────────────────────────────────────────────────

export function generateWeeklyMovers(
  data: RealMarketData,
  delta: WeeklyDelta | null,
  subreddit: string
): RedditPost | null {
  if (!delta) return null;
  if (delta.gainers.length < 2 && delta.losers.length < 2) return null;

  const tone = SUBREDDIT_TONES[subreddit] ?? SUBREDDIT_TONES.gambling;

  let body = "";

  if (tone.style === "industry") {
    body += `Weekly lobby visibility shifts across ${data.total_casinos} regulated ${data.market_name} operators (${delta.period}). These movements often indicate new distribution deals or campaign changes.\n\n`;
  } else {
    body += `Every week, games move up and down in casino lobbies. Here's what changed this week across ${data.total_casinos} ${data.market_name} casinos.\n\n`;
  }

  if (delta.gainers.length > 0) {
    body += "### 📈 Biggest gainers\n\n";
    body += markdownTable(
      ["Game", "Provider", "Change", "New Score"],
      delta.gainers.slice(0, 5).map((m) => [
        m.name,
        m.provider,
        `+${round(m.change)}`,
        String(round(m.current_score)),
      ])
    );
    const topGainer = delta.gainers[0];
    body += `\n\n${topGainer.name} jumped the most with a +${round(topGainer.change)} increase. ${tone.style === "industry" ? "Likely a new operator deal or lobby refresh." : "Expect to see this one front and center at more casinos this week."}\n\n`;
  }

  if (delta.losers.length > 0) {
    body += "### 📉 Biggest drops\n\n";
    body += markdownTable(
      ["Game", "Provider", "Change", "New Score"],
      delta.losers.slice(0, 5).map((m) => [
        m.name,
        m.provider,
        String(round(m.change)),
        String(round(m.current_score)),
      ])
    );
    body += "\n\n";
  }

  if (delta.new_entries.length > 0) {
    body += `### 🆕 New in lobbies\n\n`;
    body += delta.new_entries
      .map((e) => `- **${e.name}** (${e.provider}) — debuted at ${round(e.current_score)}`)
      .join("\n");
    body += "\n\n";
  }

  if (delta.dropped.length > 0) {
    body += `### ❌ Dropped out\n\n`;
    body += delta.dropped
      .map((e) => `- ${e.name} (${e.provider})`)
      .join("\n");
    body += "\n\n";
  }

  if (tone.style === "player" || tone.style === "enthusiast") {
    body += `---\n\nThese shifts affect what you see when you open your casino app. A game dropping in visibility doesn't mean it's gone — you just need to search for it instead of finding it on the homepage.\n\nAnything here match what you're seeing?`;
  } else if (tone.style === "industry") {
    body += `---\n\nMovement of this magnitude in a single week typically correlates with contract renewals or seasonal campaign shifts. Worth monitoring whether these trends sustain.`;
  }

  return {
    templateId: "weekly-movers",
    title: `Biggest visibility changes in ${data.market_name} casino lobbies this week`,
    body: body + FOOTER,
    subreddits: ["igaming", "slots", "onlinegambling"],
    dataHash: hashContent("weekly-movers", data.market, delta.period),
    market: data.market,
  };
}

// ── Template 4: Cross-Market Comparison ───────────────────────────────────────

export function generateCrossMarketComparison(
  markets: { data: RealMarketData; market: string }[],
  subreddit: string
): RedditPost | null {
  if (markets.length < 2) return null;

  const gameMap = new Map<
    string,
    { market: string; marketName: string; score: number; provider: string; casino_count: number; total_casinos: number }[]
  >();

  for (const { data } of markets) {
    for (const g of data.games) {
      const entries = gameMap.get(g.name) ?? [];
      entries.push({
        market: data.market,
        marketName: data.market_name,
        score: g.visibility_score,
        provider: g.provider,
        casino_count: g.casino_count,
        total_casinos: data.total_casinos,
      });
      gameMap.set(g.name, entries);
    }
  }

  // Find top 3 games with biggest cross-market variance
  const variances: { name: string; variance: number; entries: typeof gameMap extends Map<string, infer V> ? V : never }[] = [];
  for (const [name, entries] of gameMap) {
    if (entries.length < 2) continue;
    const scores = entries.map((e) => e.score);
    const variance = Math.max(...scores) - Math.min(...scores);
    if (variance >= 10) {
      variances.push({ name, variance, entries });
    }
  }
  variances.sort((a, b) => b.variance - a.variance);

  if (variances.length === 0) return null;

  const best = variances[0];
  const sorted = best.entries.sort((a, b) => b.score - a.score);
  const high = sorted[0];
  const low = sorted[sorted.length - 1];
  const tone = SUBREDDIT_TONES[subreddit] ?? SUBREDDIT_TONES.gambling;

  const title = `Same game, different visibility: ${best.name} scores ${round(high.score)} in ${high.market} but ${round(low.score)} in ${low.market}`;

  // Build comparison table for the main game
  const mainTable = markdownTable(
    ["Market", "Score", "Casino Coverage"],
    sorted.map((e) => [
      `${e.marketName} (${e.market})`,
      String(round(e.score)),
      `${e.casino_count}/${e.total_casinos}`,
    ])
  );

  let body: string;

  if (tone.style === "industry") {
    body = [
      `Cross-market lobby analysis reveals significant visibility discrepancies for the same titles across regulated European markets.`,
      "",
      `### ${best.name} (${high.provider})`,
      "",
      mainTable,
      "",
      `That's a **${round(best.variance)} point spread** between ${high.market} and ${low.market}.`,
      "",
    ].join("\n");

    // Add 2nd game comparison if available
    if (variances.length > 1) {
      const second = variances[1];
      const s2sorted = second.entries.sort((a, b) => b.score - a.score);
      body += `### ${second.name} (${s2sorted[0].provider})\n\n`;
      body += markdownTable(
        ["Market", "Score"],
        s2sorted.map((e) => [e.market, String(round(e.score))])
      );
      body += `\n\nSpread: ${round(second.variance)} points.\n\n`;
    }

    body += [
      `### Implications`,
      "",
      `These discrepancies point to localized distribution strategies rather than a universal approach. Factors at play:`,
      `- **Operator preferences** — local operators prioritize different providers`,
      `- **Regulatory environment** — game availability varies by jurisdiction`,
      `- **Commercial terms** — revenue share deals differ per market`,
      "",
      `This data challenges the assumption that a "top game" is universally top everywhere.`,
    ].join("\n");
  } else if (tone.style === "player" || tone.style === "casual") {
    body = [
      `If you play at online casinos in different European countries, you've probably noticed the lobbies look completely different. Turns out, the same game can be featured prominently in one market and buried in another.`,
      "",
      `Take **${best.name}** by ${high.provider}:`,
      "",
      mainTable,
      "",
      `In ${high.marketName}, this game is front and center with a score of ${round(high.score)}. But in ${low.marketName}? It barely gets noticed at ${round(low.score)}. That's a **${round(best.variance)} point gap**.`,
      "",
    ].join("\n");

    if (variances.length > 1) {
      const second = variances[1];
      const s2sorted = second.entries.sort((a, b) => b.score - a.score);
      body += `It's not just one game. **${second.name}** shows a similar pattern: ${s2sorted.map((e) => `${round(e.score)} in ${e.market}`).join(", ")}.\n\n`;
    }

    body += [
      `### Why does this happen?`,
      "",
      `Casino lobbies aren't curated by "what's best" — they're curated by deals. Each operator in each country negotiates separately with game providers. So a provider might have a great deal with Dutch casinos but not with German ones.`,
      "",
      `Next time you visit a casino in a different country, compare the lobby. You might discover games you've never seen before.`,
    ].join("\n");
  } else {
    body = [
      `Lobby placement data from multiple regulated European markets shows that game visibility varies massively across borders.`,
      "",
      `### ${best.name} (${high.provider}) — ${round(best.variance)} point spread`,
      "",
      mainTable,
      "",
    ].join("\n");

    if (variances.length > 1) {
      body += `### Other notable spreads\n\n`;
      for (const v of variances.slice(1, 4)) {
        const vs = v.entries.sort((a, b) => b.score - a.score);
        body += `- **${v.name}:** ${vs.map((e) => `${e.market} (${round(e.score)})`).join(" → ")} — ${round(v.variance)}pt spread\n`;
      }
      body += "\n";
    }

    body += `The variation suggests lobby curation is locally driven rather than provider-led. What's your experience — do you play in multiple markets?`;
  }

  return {
    templateId: "cross-market-comparison",
    title,
    body: body + FOOTER,
    subreddits: ["igaming", "onlinegambling"],
    dataHash: hashContent(
      "cross-market-comparison",
      markets.map((m) => m.market).join("-"),
      best.name
    ),
    market: markets[0].market,
  };
}

// ── Template 5: Category Insights ─────────────────────────────────────────────

export function generateCategoryInsights(
  data: RealMarketData,
  subreddit: string
): RedditPost | null {
  const cats = computeCategoryBreakdown(data);
  if (cats.length < 2) return null;

  const interestingCat =
    cats.find((c) => c.category === "crash") ??
    cats.find((c) => c.category === "live") ??
    cats[1];

  if (!interestingCat) return null;

  const catGames = data.games.filter(
    (g) => g.category === interestingCat.category
  );
  const slotsCat = cats.find((c) => c.category === "slots");
  const tone = SUBREDDIT_TONES[subreddit] ?? SUBREDDIT_TONES.gambling;

  const topCatGame = catGames[0];
  const catProviders = new Map<string, number>();
  for (const g of catGames) {
    catProviders.set(
      g.provider,
      (catProviders.get(g.provider) ?? 0) + g.visibility_score
    );
  }
  const catLeader = [...catProviders.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0];

  const allCatsTable = markdownTable(
    ["Category", "Share", "Games", "Top Provider"],
    cats.map((c) => [
      capitalize(c.category),
      `${c.share_pct}%`,
      String(c.game_count),
      c.top_provider,
    ])
  );

  const top5 = catGames.slice(0, 5);
  const gamesTable = markdownTable(
    ["Game", "Provider", "Score", "Casino Coverage"],
    top5.map((g) => [
      g.name,
      g.provider,
      String(g.visibility_score),
      `${g.casino_count}/${data.total_casinos}`,
    ])
  );

  const catName = capitalize(interestingCat.category);
  const title = `${catName} games account for ${interestingCat.share_pct}% of lobby visibility in ${data.market_name} — here's who dominates`;

  let body: string;

  if (tone.style === "enthusiast" && interestingCat.category === "crash") {
    body = [
      `Crash games have been growing fast in online casino lobbies. But how much space do they actually take up? I checked the data for ${data.market_name}.`,
      "",
      `### The full category breakdown`,
      "",
      allCatsTable,
      "",
      `${slotsCat ? `Slots still dominate at ${slotsCat.share_pct}%, but` : ""} crash games have carved out **${interestingCat.share_pct}%** of total visibility with just ${interestingCat.game_count} games. That's an average visibility score of ${interestingCat.avg_visibility} per title — ${interestingCat.avg_visibility > (slotsCat?.avg_visibility ?? 50) ? "actually higher than the average slot" : "competitive with many slot titles"}.`,
      "",
      `### Top crash games in ${data.market_name}`,
      "",
      gamesTable,
      "",
      `**${catLeader[0]}** dominates the crash category${catLeader[0] === "Spribe" ? " — no surprise given they pioneered Aviator" : ""}. ${topCatGame.name} leads with a ${topCatGame.visibility_score} visibility score, appearing in ${topCatGame.casino_count}/${data.total_casinos} casinos.`,
      "",
      `### The bigger picture`,
      "",
      `What makes crash games interesting from a lobby perspective is their efficiency. ${interestingCat.game_count} games generating ${interestingCat.share_pct}% visibility means each crash title punches well above its weight compared to the average slot.`,
      "",
      `Are you into crash games? Which ones do you play most?`,
    ].join("\n");
  } else if (tone.style === "industry") {
    body = [
      `Category-level analysis of ${data.total_casinos} regulated ${data.market_name} operators reveals the current distribution of lobby visibility across game types.`,
      "",
      allCatsTable,
      "",
      `### ${catName} category deep dive`,
      "",
      gamesTable,
      "",
      `**Market dynamics:** ${catLeader[0]} leads the ${interestingCat.category} segment with the highest aggregate visibility. The category holds ${interestingCat.share_pct}% of total visibility with ${interestingCat.game_count} titles — a visibility-per-title ratio of ${round(interestingCat.share_pct / interestingCat.game_count, 2)}% vs ${slotsCat ? `${round(slotsCat.share_pct / slotsCat.game_count, 2)}% for slots` : "the market average"}.`,
      "",
      `${interestingCat.category === "crash" ? "The crash category's growth trajectory suggests operators are responding to player demand for instant-result formats. However, regulatory scrutiny in some markets may cap future expansion." : interestingCat.category === "live" ? "Live casino maintains premium positioning (note the high avg scores), reflecting both player preference for immersive experiences and the higher revenue margins operators typically see." : "Table games maintain steady but modest visibility, serving as a complement to the dominant slots and live categories."}`,
      "",
      `How is your organization allocating lobby space across categories?`,
    ].join("\n");
  } else {
    body = [
      `Everyone talks about slots, but what about the rest of the casino lobby? I analyzed ${data.total_games} games across ${data.total_casinos} ${data.market_name} casinos to see how lobby space is actually divided.`,
      "",
      `### How casinos divide their lobby space`,
      "",
      allCatsTable,
      "",
      `${slotsCat ? `Slots take the lion's share at ${slotsCat.share_pct}%, but` : ""} ${interestingCat.category} games are interesting because they punch above their weight — **${interestingCat.share_pct}%** of visibility from just ${interestingCat.game_count} games.`,
      "",
      `### Top ${interestingCat.category} games`,
      "",
      gamesTable,
      "",
      `**${topCatGame.name}** by ${topCatGame.provider} is the clear ${interestingCat.category} leader, showing up in ${topCatGame.casino_count} out of ${data.total_casinos} casinos. ${catGames.length > 1 ? `${catGames[1].name} comes second but with a noticeable gap (${round(topCatGame.visibility_score - catGames[1].visibility_score)} points lower).` : ""}`,
      "",
      `${interestingCat.category === "crash" ? "Crash games are relatively new but they've claimed real lobby space fast. If you haven't tried them, they offer a completely different experience from traditional slots." : interestingCat.category === "live" ? "Live games tend to get premium placement because they generate higher engagement. If you see them near the top of your casino lobby, that's deliberate." : ""}`,
      "",
      `What's your go-to category? Slots, ${interestingCat.category}, or something else?`,
    ].join("\n");
  }

  return {
    templateId: "category-insights",
    title,
    body: body + FOOTER,
    subreddits: ["igaming", "slots", "gambling", "casinotracker"],
    dataHash: hashContent(
      "category-insights",
      data.market,
      `${interestingCat.category}:${interestingCat.share_pct}`
    ),
    market: data.market,
  };
}

// ── Template dispatch ─────────────────────────────────────────────────────────

export function generatePost(
  templateId: TemplateId,
  market: string,
  allMarkets: string[],
  delta: WeeklyDelta | null,
  subreddit: string
): RedditPost | null {
  const data = loadMarketData(market);
  if (!data) return null;

  switch (templateId) {
    case "provider-market-share":
      return generateProviderMarketShare(data, subreddit);
    case "top-games-ranking":
      return generateTopGamesRanking(data, subreddit);
    case "weekly-movers":
      return generateWeeklyMovers(data, delta, subreddit);
    case "cross-market-comparison": {
      const marketDataList = allMarkets
        .map((m) => {
          const d = loadMarketData(m);
          return d ? { data: d, market: m } : null;
        })
        .filter(
          (x): x is { data: RealMarketData; market: string } => x !== null
        );
      return generateCrossMarketComparison(marketDataList, subreddit);
    }
    case "category-insights":
      return generateCategoryInsights(data, subreddit);
    default:
      return null;
  }
}
