'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { SlotReel } from '@/components/ui/SlotReel'
import { PullHandle } from '@/components/ui/PullHandle'
import { ConfettiExplosion } from '@/components/effects/ConfettiExplosion'
import { SPIN_RESULTS } from '@/lib/constants/slot-machine-data'

type GameState = 'idle' | 'spinning' | 'result' | 'jackpot'

function ProgramStep({
  emoji,
  title,
  subtitle,
  delay,
}: {
  emoji: string
  title: string
  subtitle: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start gap-4 text-left"
    >
      <span className="text-2xl sm:text-3xl shrink-0 mt-0.5">{emoji}</span>
      <div>
        <p className="font-serif font-bold text-dark text-base sm:text-lg">{title}</p>
        <p className="text-warm-gray text-sm sm:text-base">{subtitle}</p>
      </div>
    </motion.div>
  )
}

export function SlotMachineSection() {
  const { t } = useTranslation()
  const [spinCount, setSpinCount] = useState(0)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [displayedReels, setDisplayedReels] = useState<[number, number, number]>([0, 1, 2])
  const [showJackpotFlash, setShowJackpotFlash] = useState(false)
  const stoppedReels = useRef(0)

  const handleSpin = useCallback(() => {
    if (gameState === 'spinning' || spinCount >= 3) return

    const result = SPIN_RESULTS[spinCount]
    if (!result) return

    setGameState('spinning')
    stoppedReels.current = 0
    setDisplayedReels(result.reels)
  }, [gameState, spinCount])

  const handleReelStop = useCallback(() => {
    stoppedReels.current += 1
    if (stoppedReels.current >= 3) {
      const result = SPIN_RESULTS[spinCount]
      if (result?.isJackpot) {
        setShowJackpotFlash(true)
        setGameState('jackpot')
        setTimeout(() => setShowJackpotFlash(false), 1500)
      } else {
        setGameState('result')
      }
      setSpinCount(prev => prev + 1)
    }
  }, [spinCount])

  const getReactionText = () => {
    if (gameState === 'result' && spinCount === 1) return t('slotSpin1Reaction')
    if (gameState === 'result' && spinCount === 2) return t('slotSpin2Reaction')
    return null
  }

  const getButtonLabel = () => {
    if (gameState === 'spinning') return '...'
    if (spinCount === 0) return t('slotPull')
    if (spinCount < 3) return t('slotSpinAgain')
    return t('slotJackpot')
  }

  return (
    <section
      id="slot-machine"
      className={`min-h-[100dvh] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden transition-colors duration-500 ${
        showJackpotFlash ? 'jackpot-flash' : ''
      }`}
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF0E0 100%)' }}
    >
      <ConfettiExplosion trigger={gameState === 'jackpot'} />

      <div className="max-w-lg mx-auto text-center space-y-8 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark">
            {t('slotTitle')}
          </h2>
          <p className="mt-3 text-warm-gray text-base sm:text-lg">
            {t('slotSubtitle')}
          </p>
        </motion.div>

        {/* Slot Machine Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Machine body */}
          <div className="bg-gradient-to-b from-dark to-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-secondary/20">
            {/* Top decorative bar */}
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                {['💃', '🎰', '💃'].map((e, i) => (
                  <span key={i} className="text-xl">{e}</span>
                ))}
              </div>
            </div>

            {/* Reel window */}
            <div className="bg-cream/10 rounded-2xl p-4 sm:p-6 border border-secondary/10">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {[0, 1, 2].map((reelIndex) => (
                  <SlotReel
                    key={reelIndex}
                    targetIndex={displayedReels[reelIndex]}
                    spinning={gameState === 'spinning'}
                    reelIndex={reelIndex}
                    onStop={handleReelStop}
                  />
                ))}
              </div>
            </div>

            {/* Result display under reels */}
            <div className="h-12 mt-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {gameState === 'result' && (
                  <motion.p
                    key={`reaction-${spinCount}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-secondary text-sm sm:text-base font-medium text-center px-4"
                  >
                    {getReactionText()}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Pull button */}
            {gameState !== 'jackpot' && (
              <div className="mt-2 flex justify-center">
                <PullHandle
                  onPull={handleSpin}
                  disabled={gameState === 'spinning' || spinCount >= 3}
                  label={getButtonLabel()}
                />
              </div>
            )}

            {/* Spin counter dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    i < spinCount ? 'bg-secondary' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Jackpot Reveal */}
        <AnimatePresence>
          {gameState === 'jackpot' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="space-y-6"
            >
              {/* Jackpot title */}
              <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gold neon-glow">
                {t('slotJackpot')}
              </h3>

              {/* Salsa reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">
                  💃 {t('slotReveal')} 💃
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-warm-gray text-base sm:text-lg max-w-md mx-auto leading-relaxed"
              >
                {t('slotRevealSub')}
              </motion.p>

              {/* Bonus card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', bounce: 0.3 }}
                className="bg-gradient-to-r from-gold/20 via-secondary/20 to-gold/20 border-2 border-gold/40 rounded-2xl p-5 sm:p-6 max-w-sm mx-auto"
              >
                <p className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                  🎰 {t('bonusTitle')} 🎰
                </p>
                <p className="mt-2 text-dark text-sm sm:text-base leading-relaxed">
                  {t('bonusSub')}
                </p>
              </motion.div>

              {/* Evening program */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="pt-4"
              >
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-dark mb-6">
                  {t('programTitle')}
                </h4>

                <div className="space-y-5 max-w-sm mx-auto">
                  <ProgramStep
                    emoji="💃"
                    title={t('programSalsa')}
                    subtitle={t('programSalsaSub')}
                    delay={2.4}
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 2.6 }}
                    className="w-px h-6 bg-secondary/30 ml-4"
                  />
                  <ProgramStep
                    emoji="🍽️"
                    title={t('programDinner')}
                    subtitle={t('programDinnerSub')}
                    delay={2.8}
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 3.0 }}
                    className="w-px h-6 bg-secondary/30 ml-4"
                  />
                  <ProgramStep
                    emoji="🎶"
                    title={t('programClub')}
                    subtitle={t('programClubSub')}
                    delay={3.2}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
