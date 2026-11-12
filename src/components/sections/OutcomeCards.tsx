'use client'

import { useState } from 'react'
import { Brain, RefreshCw, Rocket } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { services } from '@/data/portfolio'

const ease = [0.16, 1, 0.3, 1] as const

function ClarityMark({ play }: { play: boolean }) {
  return (
    <svg viewBox="0 0 64 28" className={`outcome-clarity h-7 w-16${play ? ' is-playing' : ''}`} aria-hidden>
      <path className="outcome-tangle" d="M4 14 C 10 4, 14 24, 22 14 S 32 4, 40 14 S 50 24, 60 14" />
      <path className="outcome-straight" d="M4 14 H60" />
    </svg>
  )
}

function ShipMark({ play }: { play: boolean }) {
  return (
    <span className={`outcome-ship inline-flex items-end gap-1${play ? ' is-playing' : ''}`} aria-hidden>
      <Brain className="h-6 w-6 text-accent" strokeWidth={1.5} />
      <Rocket className="outcome-rocket mb-0.5 h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
    </span>
  )
}

function LayersMark({ play }: { play: boolean }) {
  return (
    <span className={`outcome-layers${play ? ' is-playing' : ''}`} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  )
}

function EvolveMark({ play }: { play: boolean }) {
  return (
    <RefreshCw className={`h-6 w-6 text-accent${play ? ' outcome-evolve' : ''}`} strokeWidth={1.5} aria-hidden />
  )
}

const marks = [ClarityMark, ShipMark, LayersMark, EvolveMark]

export function OutcomeCards() {
  const reduce = useReducedMotion()
  const [seen, setSeen] = useState(false)

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {services.map((service, index) => {
        const Mark = marks[index]
        return (
          <motion.li
            key={service.title}
            className="h-full"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.08, ease }}
            onViewportEnter={() => setSeen(true)}
          >
            <article className="outcome-card h-full p-6 sm:p-8">
              <Mark play={seen && reduce === false} />
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
              <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
            </article>
          </motion.li>
        )
      })}
    </ul>
  )
}
