'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { navItems, profile } from '@/data/portfolio'
import { useActiveSection } from '@/hooks/use-active-section'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const active = useActiveSection()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return

    const observer = new IntersectionObserver(([entry]) => {
      setElevated(!entry.isIntersecting)
    })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        aria-hidden
      />
      <div className={`nav-bar border-b ${elevated ? 'nav-elevated' : 'border-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/#home" className="truncate text-sm font-semibold text-ink">
            {profile.name}
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                aria-current={item.href === active ? 'location' : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.href === active ? 'text-ink' : 'text-muted hover:bg-wash hover:text-ink'
                }`}
              >
                {item.name}
                {item.href === active &&
                  (reduce === false ? (
                    <motion.span
                      layoutId="nav-current"
                      className="nav-current"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  ) : (
                    <span className="nav-current" />
                  ))}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a href="/#contact" className="btn-primary nav-cta hidden whitespace-nowrap lg:inline-flex">
              {profile.ctaAction}
            </a>
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-wash"
            >
              {mounted ? (
                isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
              ) : (
                <span className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-wash lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`grid bg-canvas lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} motion-reduce:transition-none transition-[grid-template-rows] duration-300 ease-out`}
      >
        <nav
          aria-label="Mobile"
          aria-hidden={open ? undefined : true}
          className={`min-h-0 overflow-hidden ${open ? 'border-b border-line' : ''}`}
        >
          <ul className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  tabIndex={open ? undefined : -1}
                  aria-current={item.href === active ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    item.href === active ? 'bg-wash text-ink' : 'text-muted'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/#contact" tabIndex={open ? undefined : -1} onClick={() => setOpen(false)} className="btn-primary nav-cta mt-2 w-full">
                {profile.ctaAction}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
