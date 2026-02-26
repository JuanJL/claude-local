'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { fireBurst } from '@/lib/utils/confetti'

type AttendingStatus = 'yes' | 'maybe' | 'no' | null

export function RsvpSection() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<AttendingStatus>(null)
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const canSubmit = name.trim().length > 0 && attending !== null && status !== 'submitting'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('submitting')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, attending, dietary, message }),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      if (attending === 'yes') {
        fireBurst()
      }
    } catch {
      setStatus('error')
    }
  }

  const attendingOptions: { value: AttendingStatus; label: string; emoji: string; color: string }[] = [
    { value: 'yes', label: t('rsvpYes'), emoji: '🎉', color: 'border-accent bg-accent/10 text-accent' },
    { value: 'maybe', label: t('rsvpMaybe'), emoji: '🤔', color: 'border-secondary bg-secondary/10 text-secondary' },
    { value: 'no', label: t('rsvpNo'), emoji: '😢', color: 'border-warm-gray bg-warm-gray/10 text-warm-gray' },
  ]

  return (
    <section id="rsvp" className="min-h-[80dvh] flex items-center justify-center px-4 py-16 decorative-bg">
      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark">
            {t('rsvpTitle')}
          </h2>
          <p className="mt-3 text-warm-gray text-base sm:text-lg">
            {t('rsvpSubtitle')}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-center space-y-4 py-12"
            >
              <span className="text-6xl block">🎊</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accent">
                {t('rsvpSuccess')}
              </h3>
              <p className="text-warm-gray">
                {t('rsvpSuccessSub')}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="rsvp-name" className="block text-sm font-semibold text-dark mb-2">
                  {t('rsvpName')} *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('rsvpNamePlaceholder')}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-warm-gray/20 bg-white text-dark placeholder:text-warm-gray/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-3">
                  {t('rsvpAttending')} *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {attendingOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAttending(option.value)}
                      className={`
                        flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl border-2 transition-all
                        ${attending === option.value
                          ? `${option.color} border-current shadow-md scale-[1.02]`
                          : 'border-warm-gray/15 bg-white text-warm-gray hover:border-warm-gray/30'
                        }
                      `}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-xs sm:text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary (only if attending yes/maybe) */}
              {(attending === 'yes' || attending === 'maybe') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="rsvp-dietary" className="block text-sm font-semibold text-dark mb-2">
                    {t('rsvpDietary')}
                  </label>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    value={dietary}
                    onChange={e => setDietary(e.target.value)}
                    placeholder={t('rsvpDietaryPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-warm-gray/20 bg-white text-dark placeholder:text-warm-gray/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="rsvp-message" className="block text-sm font-semibold text-dark mb-2">
                  {t('rsvpMessage')}
                </label>
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t('rsvpMessagePlaceholder')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-warm-gray/20 bg-white text-dark placeholder:text-warm-gray/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary text-sm text-center font-medium"
                >
                  {t('rsvpError')}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.02 } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all
                  ${canSubmit
                    ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-lg hover:shadow-xl cursor-pointer'
                    : 'bg-warm-gray/20 text-warm-gray/50 cursor-not-allowed'
                  }
                `}
              >
                {status === 'submitting' ? t('rsvpSubmitting') : t('rsvpSubmit')}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
