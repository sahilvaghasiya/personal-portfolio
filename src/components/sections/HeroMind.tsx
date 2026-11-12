'use client'

import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

const lines = [
  '> What drives me?',
  '→ Understand the "why" before the "how"',
  '→ Architecture decisions outlast code decisions',
  '→ Ship it. Then make it better.',
  '→ AI should solve problems, not create demos',
  "→ The best code is the code you don't write",
] as const

function asHtml(line: string, accent: boolean) {
  const safe = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return accent ? `<span class="text-accent">${safe}</span>` : safe
}

export function HeroMind() {
  const [reduce, setReduce] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduce(media.matches)
    apply()
    setReady(true)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  return (
    <>
      <ul className="sr-only">
        {lines.map((text) => (
          <li key={text}>{text.replace(/^[>→]\s/, '')}</li>
        ))}
      </ul>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface/90" aria-hidden>
        <pre className="type-block min-h-[15.5rem] whitespace-pre-wrap p-5 font-mono text-[13px] leading-7 text-muted sm:p-6">
          {ready && !reduce ? (
            <Typewriter
              options={{
                loop: true,
                delay: 55,
                deleteSpeed: 20,
                cursor: '|',
                parseHTML: true,
                skipAddStyles: true,
                deleteOnLoop: false,
              }}
              onInit={(typewriter) => {
                lines.forEach((line, index) => {
                  typewriter.typeString(`${index > 0 ? '<br>' : ''}${asHtml(line, index === 0)}`)
                  if (index < lines.length - 1) typewriter.pauseFor(400)
                })
                typewriter.pauseFor(5000).deleteAll(20).pauseFor(600).start()
              }}
            />
          ) : (
            lines.map((text, index) => (
              <span key={text} className={index === 0 ? 'text-accent' : undefined}>
                {index > 0 ? '\n' : null}
                {ready ? text : ''}
              </span>
            ))
          )}
        </pre>
      </div>
    </>
  )
}
