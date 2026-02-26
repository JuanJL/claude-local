# Reddit Auto-Poster

Generate and optionally post a Reddit post from LobbyRanker market data.

## Usage

Run a dry-run preview (default):
```
npx tsx scripts/reddit-poster.ts --dry-run
```

Preview a specific template and market:
```
npx tsx scripts/reddit-poster.ts --dry-run --template provider-market-share --market NL
```

Post live to a specific subreddit:
```
npx tsx scripts/reddit-poster.ts --subreddit casinotracker
```

## Templates

| ID | Description |
|-----|-------------|
| `provider-market-share` | Provider dominance analysis with top-5 table |
| `top-games-ranking` | Top 10 most visible games per market |
| `weekly-movers` | Weekly visibility changes (requires Redis delta data) |
| `cross-market-comparison` | Same game/provider across markets |
| `category-insights` | Category deep dive (crash, live, slots) |

## CLI Flags

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview without posting |
| `--template <id>` | Force specific template |
| `--market <code>` | Force specific market (NL, UK, DE, ES, etc.) |
| `--subreddit <name>` | Force specific subreddit |

## Prerequisites

Set these environment variables (or GitHub Secrets for CI):
- `REDDIT_CLIENT_ID` — Reddit app client ID
- `REDDIT_CLIENT_SECRET` — Reddit app client secret
- `REDDIT_USERNAME` — Reddit account username
- `REDDIT_PASSWORD` — Reddit account password
- `RESEND_API_KEY` — (optional) For email fallback
- `UPSTASH_REDIS_REST_URL` — (optional) For weekly delta data
- `UPSTASH_REDIS_REST_TOKEN` — (optional) For weekly delta data

---

Run `npx tsx scripts/reddit-poster.ts --dry-run` to preview the next post.
