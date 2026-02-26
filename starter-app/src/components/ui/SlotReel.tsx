'use client'

import { useState, useEffect, useRef } from 'react'
import { SYMBOLS } from '@/lib/constants/slot-machine-data'

interface SlotReelProps {
  targetIndex: number
  spinning: boolean
  reelIndex: number
  onStop?: () => void
}

const SYMBOL_HEIGHT = 80
const TOTAL_SYMBOLS = SYMBOLS.length

export function SlotReel({ targetIndex, spinning, reelIndex, onStop }: SlotReelProps) {
  const [offset, setOffset] = useState(targetIndex * SYMBOL_HEIGHT)
  const rafRef = useRef<number>(0)
  const speedRef = useRef(0)
  const phaseRef = useRef<'idle' | 'accelerating' | 'fast' | 'decelerating' | 'stopped'>('idle')
  const tickRef = useRef(0)
  const stopCalledRef = useRef(false)

  // Duration before this reel starts decelerating
  const spinTicks = 60 + reelIndex * 30 // ~1s + 0.5s per reel at 60fps

  useEffect(() => {
    if (!spinning) return

    phaseRef.current = 'accelerating'
    tickRef.current = 0
    speedRef.current = 2
    stopCalledRef.current = false

    const totalHeight = TOTAL_SYMBOLS * SYMBOL_HEIGHT

    const loop = () => {
      tickRef.current++

      if (phaseRef.current === 'accelerating') {
        speedRef.current = Math.min(speedRef.current + 0.5, 18)
        if (speedRef.current >= 18) phaseRef.current = 'fast'
      }

      if (phaseRef.current === 'fast' && tickRef.current >= spinTicks) {
        phaseRef.current = 'decelerating'
      }

      if (phaseRef.current === 'decelerating') {
        speedRef.current = Math.max(speedRef.current - 0.3, 0)
        if (speedRef.current <= 0) {
          phaseRef.current = 'stopped'
          // Snap to target
          setOffset(targetIndex * SYMBOL_HEIGHT)
          if (!stopCalledRef.current) {
            stopCalledRef.current = true
            onStop?.()
          }
          return
        }
      }

      setOffset(prev => {
        const next = prev + speedRef.current
        return next % totalHeight
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning])

  // When not spinning, snap to target
  useEffect(() => {
    if (!spinning) {
      setOffset(targetIndex * SYMBOL_HEIGHT)
    }
  }, [spinning, targetIndex])

  return (
    <div
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white border-2 border-secondary/30 shadow-inner overflow-hidden"
      role="img"
      aria-label={`Reel ${reelIndex + 1}`}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(-${offset}px)`,
        }}
      >
        {/* Render symbols 3x for seamless looping */}
        {[...SYMBOLS, ...SYMBOLS, ...SYMBOLS].map((symbol, i) => (
          <div
            key={i}
            className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl sm:text-5xl shrink-0 select-none"
          >
            {symbol.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}
