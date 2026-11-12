'use client'

import { useEffect, useMemo, useState } from 'react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine, ISourceOptions } from '@tsparticles/engine'

function readNetwork() {
  const dark = document.documentElement.classList.contains('dark')
  const color =
    getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() ||
    (dark ? '#5eead4' : '#185a78')
  return { dark, color }
}

async function registerParticles(engine: Engine) {
  await loadSlim(engine)
}

export function HeroNetwork() {
  const [color, setColor] = useState('#5eead4')
  const [dark, setDark] = useState(true)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      const network = readNetwork()
      setReduce(media.matches)
      setColor(network.color)
      setDark(network.dark)
    }
    apply()
    media.addEventListener('change', apply)
    const theme = new MutationObserver(apply)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      media.removeEventListener('change', apply)
      theme.disconnect()
    }
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      particles: {
        number: { value: dark ? 46 : 58, density: { enable: true } },
        color: { value: color },
        links: {
          enable: true,
          distance: 150,
          color,
          opacity: dark ? 0.32 : 0.72,
          width: dark ? 1 : 1.35,
        },
        move: { enable: !reduce, speed: 0.45, outModes: { default: 'bounce' } },
        opacity: { value: dark ? 0.55 : 0.92 },
        size: { value: dark ? { min: 1, max: 2.4 } : { min: 1.4, max: 3 } },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: !reduce, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: dark ? 0.85 : 0.72, color } },
        },
      },
    }),
    [color, dark, reduce],
  )

  return (
    <ParticlesProvider init={registerParticles}>
      <Particles
        id="hero-network"
        className="pointer-events-none absolute inset-0"
        options={options}
      />
    </ParticlesProvider>
  )
}
