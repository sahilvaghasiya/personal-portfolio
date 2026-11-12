'use client'

import { useEffect } from 'react'

export function AnimateOnScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const seen = new WeakSet<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.remove('reveal-wait')
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -32px 0px' },
    )

    const watch = (root: ParentNode) => {
      root.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        el.classList.add('reveal-wait')
        io.observe(el)
      })
    }

    watch(document)
    const changes = new MutationObserver(() => watch(document))
    changes.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      changes.disconnect()
    }
  }, [])

  return null
}
