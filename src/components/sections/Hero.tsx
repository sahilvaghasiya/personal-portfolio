import { profile } from '@/data/portfolio'
import { HeroMind } from '@/components/sections/HeroMind'
import { HeroNetwork } from '@/components/sections/HeroNetwork'

export default function Hero() {
  return (
    <section id="home" className="hero-mesh relative scroll-mt-20 overflow-hidden pb-16 pt-28 sm:pb-20">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <HeroNetwork />
      <div className="hero-blob pointer-events-none absolute -left-24 top-16 h-[28rem] w-[28rem]" aria-hidden />
      <div className="hero-blob hero-blob-violet pointer-events-none absolute left-10 top-1/3 h-[22rem] w-[22rem]" aria-hidden />
      <div className="container-custom relative z-[1] grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
        <div>
          <p className="availability-badge load-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-sm text-ink">
            <span className="pulse-dot" aria-hidden />
            {profile.availability}
          </p>
          <h1
            className="load-in mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12]"
            style={{ animationDelay: '70ms' }}
          >
            {profile.tagline}
          </h1>
          <p className="hero-lead load-in mt-5 max-w-[42ch] text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {profile.subtagline}
          </p>
          <div className="load-in mt-7 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '80ms' }}>
            <a href="#contact" className="btn-primary">
              {profile.ctaAction}
            </a>
            <a href="#projects" className="btn-secondary">
              View projects
            </a>
          </div>
        </div>

        <aside className="load-in w-full" style={{ animationDelay: '140ms' }} aria-label="What drives me">
          <HeroMind />
        </aside>
      </div>
    </section>
  )
}
