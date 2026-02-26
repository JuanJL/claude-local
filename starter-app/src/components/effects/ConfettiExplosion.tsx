'use client'

import { useEffect } from 'react'
import { fireJackpotConfetti, fireBurst } from '@/lib/utils/confetti'

interface ConfettiExplosionProps {
  trigger: boolean
}

export function ConfettiExplosion({ trigger }: ConfettiExplosionProps) {
  useEffect(() => {
    if (trigger) {
      // Initial burst
      fireBurst()
      // Then continuous celebration
      const timeout = setTimeout(() => {
        fireJackpotConfetti()
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [trigger])

  return null
}
