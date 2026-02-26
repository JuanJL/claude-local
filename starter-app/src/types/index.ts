export type Language = 'en' | 'es' | 'ca' | 'nl'

export interface TranslationStrings {
  // Hero
  heroSaveTheDate: string
  heroTurning: string
  heroBirthday: string
  heroCelebration: string
  heroTagline: string
  heroScrollHint: string

  // Countdown
  countdownDays: string
  countdownHours: string
  countdownMinutes: string
  countdownSeconds: string

  // Slot Machine
  slotTitle: string
  slotSubtitle: string
  slotPull: string
  slotSpinAgain: string
  slotSpin1Reaction: string
  slotSpin2Reaction: string
  slotJackpot: string
  slotReveal: string
  slotRevealSub: string

  // Bonus
  bonusTitle: string
  bonusSub: string

  // Program (after jackpot)
  programTitle: string
  programSalsa: string
  programSalsaSub: string
  programDinner: string
  programDinnerSub: string
  programClub: string
  programClubSub: string

  // RSVP
  rsvpTitle: string
  rsvpSubtitle: string
  rsvpName: string
  rsvpNamePlaceholder: string
  rsvpAttending: string
  rsvpYes: string
  rsvpMaybe: string
  rsvpNo: string
  rsvpDietary: string
  rsvpDietaryPlaceholder: string
  rsvpMessage: string
  rsvpMessagePlaceholder: string
  rsvpSubmit: string
  rsvpSubmitting: string
  rsvpSuccess: string
  rsvpSuccessSub: string
  rsvpError: string

  // Footer
  footerComingSoon: string
  footerSaveDate: string
  footerGreeting: string
  footerMadeWith: string
  footerMadeIn: string
}

export interface SlotSymbol {
  emoji: string
  label: string
}

export interface SpinResult {
  reels: [number, number, number]
  isJackpot: boolean
}

export interface PartyDetails {
  name: string
  age: number
  birthday: Date
  partyDate: Date
  city: string
}
