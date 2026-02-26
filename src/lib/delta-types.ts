// Types for LobbyRanker market data and weekly deltas

export interface RealGame {
  name: string;
  provider: string;
  category: string;
  visibility_score: number;
  casino_count: number;
  avg_position: number;
}

export interface RealMarketData {
  market: string;
  market_name: string;
  last_updated: string;
  total_casinos: number;
  total_games: number;
  games: RealGame[];
}

export interface ProviderStats {
  provider: string;
  total_visibility: number;
  game_count: number;
  avg_visibility: number;
  market_share_pct: number;
}

export interface CategoryStats {
  category: string;
  total_visibility: number;
  game_count: number;
  avg_visibility: number;
  share_pct: number;
  top_provider: string;
}

export interface DeltaMover {
  name: string;
  provider: string;
  previous_score: number;
  current_score: number;
  change: number;
  change_pct: number;
}

export interface ProviderRankChange {
  provider: string;
  previous_rank: number;
  current_rank: number;
  direction: "up" | "down" | "stable";
}

export interface WeeklyDelta {
  market: string;
  period: string;
  gainers: DeltaMover[];
  losers: DeltaMover[];
  new_entries: DeltaMover[];
  dropped: DeltaMover[];
  provider_changes: ProviderRankChange[];
}

export const MARKET_REGISTRY: Record<string, string> = {
  NL: "Netherlands",
  UK: "United Kingdom",
  DE: "Germany",
  ES: "Spain",
  SE: "Sweden",
  DK: "Denmark",
  IT: "Italy",
  BE: "Belgium",
};
