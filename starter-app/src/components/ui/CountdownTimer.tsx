'use client'

import { useState, useEffect } from 'react'
import { getCountdown, type CountdownValues } from '@/lib/utils/countdown'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { PARTY } from '@/lib/constants/party-details'

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl shadow-lg border border-warm-gray/10 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-dark">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-warm-gray uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  )
}

export function CountdownTimer() {
  const { t } = useTranslation()
  const [countdown, setCountdown] = useState<CountdownValues>(() =>
    getCountdown(PARTY.partyDate)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(PARTY.partyDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      <CountdownUnit value={countdown.days} label={t('countdownDays')} />
      <div className="flex items-center text-2xl text-secondary font-bold pt-[-1rem]">:</div>
      <CountdownUnit value={countdown.hours} label={t('countdownHours')} />
      <div className="flex items-center text-2xl text-secondary font-bold pt-[-1rem]">:</div>
      <CountdownUnit value={countdown.minutes} label={t('countdownMinutes')} />
      <div className="flex items-center text-2xl text-secondary font-bold pt-[-1rem]">:</div>
      <CountdownUnit value={countdown.seconds} label={t('countdownSeconds')} />
    </div>
  )
}
