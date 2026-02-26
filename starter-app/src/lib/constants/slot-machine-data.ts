import type { SlotSymbol, SpinResult } from '@/types'

export const SYMBOLS: SlotSymbol[] = [
  { emoji: '💃', label: 'Salsa dancer' },
  { emoji: '🎵', label: 'Music note' },
  { emoji: '🌶️', label: 'Chili pepper' },
  { emoji: '🧘', label: 'Yoga' },
  { emoji: '👨‍🍳', label: 'Chef' },
  { emoji: '🎨', label: 'Paint palette' },
  { emoji: '🏋️', label: 'Fitness' },
  { emoji: '📚', label: 'Book' },
]

// Index references into SYMBOLS array
// 0=💃 1=🎵 2=🌶️ 3=🧘 4=👨‍🍳 5=🎨 6=🏋️ 7=📚

export const SPIN_RESULTS: SpinResult[] = [
  // Spin 1: Near miss — 💃 🎵 🧘
  { reels: [0, 1, 3], isJackpot: false },
  // Spin 2: Another tease — 🌶️ 💃 🎨
  { reels: [2, 0, 5], isJackpot: false },
  // Spin 3: JACKPOT — 💃 💃 💃
  { reels: [0, 0, 0], isJackpot: true },
]

export const JACKPOT_SYMBOL_INDEX = 0 // 💃

// How many full rotations before stopping
export const SPIN_ROTATIONS = 3
// Base spin duration in ms per reel
export const SPIN_DURATION_BASE = 1500
// Extra delay per reel (creates staggered stop)
export const SPIN_DELAY_PER_REEL = 500
