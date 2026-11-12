'use client'

import { useEffect, useState } from 'react'
import { navItems } from '@/data/portfolio'

const ACTIVATION_OFFSET = 96

export function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.scrollY + ACTIVATION_OFFSET
      let current = ''

      for (const item of navItems) {
        const node = document.querySelector(item.href)
        if (!(node instanceof HTMLElement)) continue
        const top = node.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = item.href
      }

      setActive((previous) => (previous === current ? previous : current))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return active
}
