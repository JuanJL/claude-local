'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { CountdownTimer } from '@/components/ui/CountdownTimer'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 py-12 decorative-bg">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Decorative top element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <span className="text-5xl">🎉</span>
        </motion.div>

        {/* Save the Date */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dark leading-tight"
        >
          {t('heroSaveTheDate')}
        </motion.h1>

        {/* Turning 34 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-primary font-serif font-semibold"
        >
          {t('heroTurning')}
        </motion.p>

        {/* Dates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-1"
        >
          <p className="text-sm sm:text-base text-warm-gray/70">
            {t('heroBirthday')}
          </p>
          <p className="text-lg sm:text-xl text-dark font-semibold">
            {t('heroCelebration')}
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-lg text-warm-gray/80 italic"
        >
          {t('heroTagline')}
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"
        />

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-4"
        >
          <a
            href="#slot-machine"
            className="inline-flex flex-col items-center gap-2 text-accent hover:text-primary transition-colors group"
          >
            <span className="text-sm font-medium">{t('heroScrollHint')}</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
