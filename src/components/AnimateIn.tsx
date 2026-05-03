'use client'

import { motion, type TargetAndTransition } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimateFrom = 'up' | 'left' | 'right' | 'scale' | 'fade'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const hiddenStates: Record<AnimateFrom, TargetAndTransition> = {
  up:    { opacity: 0, y: 32 },
  left:  { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
  fade:  { opacity: 0 },
}

const visibleStates: Record<AnimateFrom, TargetAndTransition> = {
  up:    { opacity: 1, y: 0 },
  left:  { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  fade:  { opacity: 1 },
}

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: AnimateFrom
  duration?: number
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  from = 'up',
  duration = 0.75,
}: AnimateInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={hiddenStates[from]}
      whileInView={visibleStates[from]}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
