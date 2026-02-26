'use client'

import { motion } from 'framer-motion'

interface PullHandleProps {
  onPull: () => void
  disabled: boolean
  label: string
}

export function PullHandle({ onPull, disabled, label }: PullHandleProps) {
  return (
    <motion.button
      onClick={onPull}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`
        relative flex items-center justify-center
        px-8 py-4 sm:px-10 sm:py-5
        rounded-2xl font-bold text-lg sm:text-xl
        text-white shadow-lg
        transition-all duration-200
        ${
          disabled
            ? 'bg-warm-gray/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-red-600 hover:shadow-xl active:shadow-md cursor-pointer'
        }
      `}
      aria-label={label}
    >
      {/* Decorative side bar (handle look) */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-10 bg-secondary rounded-full shadow hidden sm:block" />

      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}
