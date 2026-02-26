import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import type { RealMarketData, RealGame } from "../src/lib/delta-types.js";

/**
 * Refreshes market data JSON files with updated timestamps and
 * randomized visibility score shifts to simulate daily lobby changes.
 *
 * In production, replace simulateRefresh() with real data fetching
 * from the LobbyRanker API or database.
 *
 * Usage:
 *   npx tsx scripts/refresh-market-data.ts
 *   npx tsx scripts/refresh-market-data.ts --market NL
 */

const DATA_DIR = resolve(__dirname, "../src/data");
const CONFIG = JSON.parse(
  readFileSync(resolve(__dirname, "config.json"), "utf-8")
);
const MARKETS: string[] = CONFIG.markets.available;

// ── CLI args ──────────────────────────────────────────────────────────────────

const forcedMarket = process.argv.includes("--market")
  ? process.argv[process.argv.indexOf("--market") + 1]
  : null;

// ── Simulate daily score shifts ───────────────────────────────────────────────

function simulateRefresh(data: RealMarketData): RealMarketData {
  const today = new Date().toISOString().split("T")[0];

  const updatedGames: RealGame[] = data.games.map((game) => {
    // Random daily shift: -3 to +3 points
    const shift = (Math.random() - 0.5) * 6;
    const newScore = Math.max(5, Math.min(100, game.visibility_score + shift));

    // Slight casino count variation (-1 to +1)
    const casinoShift = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    const newCasinoCount = Math.max(
      1,
      Math.min(data.total_casinos, game.casino_count + casinoShift)
    );

    // Avg position adjusts inversely to score changes
    const posShift = shift > 0 ? -(Math.random() * 0.5) : Math.random() * 0.5;
    const newAvgPos = Math.max(1, game.avg_position + posShift);

    return {
      ...game,
      visibility_score: round(newScore),
      casino_count: newCasinoCount,
      avg_position: round(newAvgPos),
    };
  });

  // Re-sort by visibility score (descending)
  updatedGames.sort((a, b) => b.visibility_score - a.visibility_score);

  return {
    ...data,
    last_updated: today,
    games: updatedGames,
  };
}

function round(n: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main(): void {
  const marketsToRefresh = forcedMarket ? [forcedMarket] : MARKETS;
  let updated = 0;
  let skipped = 0;

  for (const market of marketsToRefresh) {
    const filePath = resolve(DATA_DIR, `${market}-real-data.json`);

    try {
      const raw = readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw) as RealMarketData;

      // Check if already updated today
      const today = new Date().toISOString().split("T")[0];
      if (data.last_updated === today) {
        console.log(`${market}: already up to date (${today}), skipping`);
        skipped++;
        continue;
      }

      const refreshed = simulateRefresh(data);
      writeFileSync(filePath, JSON.stringify(refreshed, null, 2) + "\n");
      console.log(
        `${market}: refreshed (${data.last_updated} → ${refreshed.last_updated}), ${refreshed.games.length} games`
      );
      updated++;
    } catch (err) {
      console.log(`${market}: no data file found, skipping`);
      skipped++;
    }
  }

  console.log(
    `\nDone: ${updated} markets updated, ${skipped} skipped`
  );
}

main();
