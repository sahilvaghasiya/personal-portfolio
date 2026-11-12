'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/portfolio'

const ease = [0.16, 1, 0.3, 1] as const

export function AboutCopy() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease }}
    >
      <h3 className="text-lg font-semibold text-ink">Who I am</h3>
      <div className="mt-5 max-w-[62ch] space-y-4 text-base leading-relaxed text-muted sm:text-lg">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  )
}
