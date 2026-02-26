'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'

export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="py-16 px-4 bg-dark text-white/80">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-secondary font-medium text-lg">
            {t('footerComingSoon')}
          </p>
          <p className="text-white/60">
            {t('footerSaveDate')}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-px bg-white/20 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl font-serif italic text-white/90"
        >
          {t('footerGreeting')}
        </motion.p>

        <p className="text-white/40 text-sm">
          — Juan
        </p>

        <div className="pt-8 text-white/30 text-xs">
          <p>{t('footerMadeWith')} ❤️ {t('footerMadeIn')}</p>
        </div>
      </div>
    </footer>
  )
}
