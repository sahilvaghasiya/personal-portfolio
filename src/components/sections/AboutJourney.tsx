'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { education, experiences } from '@/data/portfolio'

const ease = [0.16, 1, 0.3, 1] as const

const entries = [
  ...experiences.map((job) => ({
    key: job.company,
    period: job.period,
    present: job.present,
    role: job.title,
    company: job.company,
    href: job.href,
    detail: null as string | null,
    tags: job.tags,
    points: job.points,
  })),
  ...education.map((item) => ({
    key: item.title,
    period: item.period,
    present: false,
    role: item.title,
    company: null as string | null,
    href: null as string | null,
    detail: item.school,
    tags: [] as readonly string[],
    points: [] as readonly string[],
  })),
]

export function AboutJourney() {
  const reduce = useReducedMotion()

  return (
    <>
      <ol className="journey-track relative mx-auto max-w-3xl">
        <motion.div
          className="journey-line"
          aria-hidden
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          style={{ transformOrigin: 'top' }}
        >
          <span className="journey-glow" />
        </motion.div>
        {entries.map((entry, index) => (
          <motion.li
            key={entry.key}
            className="journey-entry"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease }}
          >
            <p className="journey-date font-mono">{entry.period}</p>
            <span className="journey-node" aria-hidden />
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h4 className="font-semibold text-ink">
                  {entry.company && entry.href ? (
                    <>
                      {entry.role} @{' '}
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {entry.company}
                      </a>
                    </>
                  ) : (
                    entry.role
                  )}
                </h4>
                {entry.present && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs font-medium text-accent">
                    <span className="pulse-dot" aria-hidden />
                    Present
                  </span>
                )}
              </div>
              {entry.detail && <p className="mt-1 text-sm text-muted">{entry.detail}</p>}
              {entry.points.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {entry.points.map((point) => (
                    <li key={point} className="max-w-[58ch] text-sm leading-relaxed text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {entry.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-ink">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </>
  )
}
