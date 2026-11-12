'use client'

import { useEffect, useRef, useState } from 'react'
import { Braces, Bug, DraftingCompass, Eye, RefreshCw, Rocket } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  {
    title: 'Understand',
    body: 'Define the real problem. Talk to stakeholders. Know the goal before the solution.',
    icon: Eye,
  },
  {
    title: 'Architect',
    body: 'Design the system. Plan for scale. Make decisions that age well.',
    icon: DraftingCompass,
  },
  {
    title: 'Build',
    body: 'Clean, production-grade code. AI where it adds value, not where it adds hype.',
    icon: Braces,
  },
  {
    title: 'Test',
    body: 'Break it before users do. Edge cases aren’t optional.',
    icon: Bug,
  },
  {
    title: 'Deploy',
    body: 'CI/CD, monitoring, observability. It’s not done until it’s live and stable.',
    icon: Rocket,
  },
  {
    title: 'Iterate',
    body: 'Ship fast, learn faster. Feedback drives the next version.',
    icon: RefreshCw,
  },
] as const

const ease = [0.16, 1, 0.3, 1] as const
const stepAngle = 360 / steps.length

export function AboutProcess() {
  const reduce = useReducedMotion()
  const travelerRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const pausedRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const revealed = hovered ?? pinned
  const active = steps[revealed ?? index]

  useEffect(() => {
    pausedRef.current = revealed !== null
  }, [revealed])

  useEffect(() => {
    if (reduce !== false) return
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = Math.min(now - last, 48)
      last = now
      if (!pausedRef.current && travelerRef.current) {
        angleRef.current = (angleRef.current + (delta / 16000) * 360) % 360
        travelerRef.current.style.transform = `rotate(${angleRef.current}deg)`
        const next = Math.round(angleRef.current / stepAngle) % steps.length
        setIndex((current) => (current === next ? current : next))
      }
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [reduce])

  function moveTo(next: number) {
    const node = travelerRef.current
    const current = ((Math.round(angleRef.current / stepAngle) % steps.length) + steps.length) % steps.length
    const delta = ((next - current + steps.length) % steps.length) * stepAngle
    angleRef.current = (angleRef.current + delta) % 360
    if (node) {
      node.classList.add('is-seeking')
      window.requestAnimationFrame(() => {
        node.style.transform = `rotate(${angleRef.current}deg)`
      })
    }
    setIndex(next)
  }

  function hoverStep(next: number) {
    pausedRef.current = true
    setHovered(next)
    moveTo(next)
  }

  function release() {
    setHovered(null)
    if (pinned !== null) {
      pausedRef.current = true
      moveTo(pinned)
      return
    }
    pausedRef.current = false
    travelerRef.current?.classList.remove('is-seeking')
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-[24rem]"
      initial={reduce ? false : { opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease }}
    >
      <h3 id="how-i-work" className="text-center text-lg font-semibold text-ink">
        How I work
      </h3>

      <div className="process-stage relative mx-auto mt-6 aspect-square w-full" onMouseLeave={release}>
        <div className="process-path" aria-hidden />
        {reduce ? null : (
          <div ref={travelerRef} className="process-traveler" aria-hidden>
            <span className="process-dot" />
          </div>
        )}
        {steps.map((step, stepIndex) => {
          const Icon = step.icon
          const lit = !reduce && (revealed ?? index) === stepIndex
          return (
            <div
              key={step.title}
              className="process-step"
              style={{ ['--angle' as string]: `${stepIndex * stepAngle}deg` }}
            >
              <button
                type="button"
                className={lit ? 'process-card is-active' : 'process-card'}
                aria-pressed={revealed === stepIndex}
                aria-expanded={revealed === stepIndex}
                aria-label={`${step.title}. ${step.body}`}
                onMouseEnter={() => hoverStep(stepIndex)}
                onFocus={() => hoverStep(stepIndex)}
                onBlur={release}
                onClick={() => {
                  const next = pinned === stepIndex ? null : stepIndex
                  setPinned(next)
                  if (next === null) {
                    if (hovered !== stepIndex) {
                      pausedRef.current = false
                      travelerRef.current?.classList.remove('is-seeking')
                    }
                    return
                  }
                  pausedRef.current = true
                  moveTo(next)
                }}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                <span>{step.title}</span>
              </button>
            </div>
          )
        })}
        <div className="process-core" aria-hidden>
          <p className="text-sm font-semibold tracking-tight text-ink">Ship it</p>
        </div>
      </div>

      {reduce ? (
        <ol className="mt-6 space-y-3">
          {steps.map((step) => (
            <li key={step.title}>
              <p className="text-sm font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p key={active.title} className="process-caption" aria-live="polite">
          <span className="font-semibold text-ink">{active.title}. </span>
          {active.body}
        </p>
      )}
    </motion.div>
  )
}
