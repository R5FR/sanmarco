'use client'

import { motion } from 'framer-motion'

const items = [
  'San Marco',
  'Depuis 1997',
  'Chaville',
  'Pizzeria Familiale',
  'Cuisine Italienne',
  'Fait Maison',
]

const repeated = [...items, ...items]

export function MarqueeStrip() {
  return (
    <div className="overflow-hidden border-y border-border/50 py-4 bg-primary/[0.04]">
      <motion.div
        className="flex gap-0 whitespace-nowrap will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((label, i) => (
          <span
            key={i}
            className="shrink-0 font-display text-sm font-bold uppercase tracking-[0.3em] text-primary/40 px-8"
          >
            {label}
            <span className="mx-6 text-primary/20">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
