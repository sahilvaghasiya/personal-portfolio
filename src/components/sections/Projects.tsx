'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Project, ProjectCategory, projects } from '@/data/portfolio'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const filters: Array<{ id: 'All' | ProjectCategory; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'AI', label: 'AI' },
  { id: 'Full Stack', label: 'Full-Stack' },
  { id: 'Backend', label: 'Backend' },
]

export default function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]['id']>('All')
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const allowMotion = ready && reduce === false

  useEffect(() => {
    setReady(true)
  }, [])

  const visible = active === 'All' ? projects : projects.filter((project) => project.category === active)
  const featured = visible.filter((project) => project.featured)
  const rest = visible.filter((project) => !project.featured)

  return (
    <Section id="projects">
      <SectionHeading title="Work" description="Products shipped from the model through the interface and the API." />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((filter) => {
          const selected = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActive(filter.id)
                setOpen(null)
              }}
              className={`relative min-h-11 rounded-full px-4 text-sm font-semibold transition-colors active:scale-[0.98] motion-reduce:active:scale-100 ${
                selected ? 'text-canvas' : 'bg-surface text-ink hover:bg-wash'
              }`}
            >
              {allowMotion && selected && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {!allowMotion && selected && <span className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{filter.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 space-y-4" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {featured.map((project, index) => (
            <motion.div
              layout={allowMotion}
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              exit={allowMotion ? { opacity: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <FeaturedProject project={project} />
            </motion.div>
          ))}
        </AnimatePresence>

        {rest.length > 0 && (
          <ul className={`grid gap-4 ${rest.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              {rest.map((project, index) => (
                <motion.li
                  layout={allowMotion}
                  key={project.title}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  exit={allowMotion ? { opacity: 0 } : undefined}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CompactProject
                    project={project}
                    open={open === project.title}
                    onToggle={() => setOpen((current) => (current === project.title ? null : project.title))}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {visible.length === 0 && <p className="mt-10 text-sm text-muted">No projects in this category.</p>}
    </Section>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="project-card project-card-feature grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div>
        <p className="font-mono text-sm text-accent">{categoryLabel(project.category)}</p>
        <h3 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{project.title}</h3>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">{project.tagline}</p>
        <dl className="mt-6 space-y-4">
          <Story label="Problem" text={project.problem} />
          <Story label="Role" text={project.role} />
          <Story label="Outcome" text={project.outcome} />
        </dl>
        <TechList items={project.technologies} />
        <ProjectLinks project={project} />
      </div>
      <ProjectFrame project={project} />
    </article>
  )
}

function CompactProject({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  return (
    <article className={`project-card group flex h-full flex-col ${open ? 'is-open' : ''}`}>
      <button type="button" className="w-full text-left" aria-expanded={open} onClick={onToggle}>
        <p className="font-mono text-xs text-accent">{categoryLabel(project.category)}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.brief} {project.role}
        </p>
      </button>
      <TechList items={project.technologies} />
      {open && (
        <dl className="mt-4 space-y-3 border-t border-line pt-4">
          <Story label="Problem" text={project.problem} />
          <Story label="Role" text={project.role} />
          <Story label="Outcome" text={project.outcome} />
        </dl>
      )}
      <div className="mt-auto">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

function Story({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-muted">{text}</dd>
    </div>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((tech) => (
        <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-ink">
          {tech}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveHref && !project.codeHref) return null
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {project.liveHref && (
        <a href={project.liveHref} className="btn-primary" target="_blank" rel="noreferrer">
          Live demo
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}
      {project.codeHref && (
        <a href={project.codeHref} className="btn-secondary" target="_blank" rel="noreferrer">
          Code
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}
    </div>
  )
}

function ProjectFrame({ project }: { project: Project }) {
  return (
    <div className="project-frame overflow-hidden rounded-xl border border-line bg-canvas" aria-hidden>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted">{project.title}</span>
      </div>
      <div className="p-4 sm:p-5">
        {project.frame === 'campaign' ? <CampaignMock /> : <AnalysisMock />}
      </div>
    </div>
  )
}

function AnalysisMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.8fr_1fr]">
      <div className="mock-stage flex aspect-[4/3] items-end rounded-lg bg-accent-soft p-3">
        <span className="rounded-full bg-surface px-2 py-1 font-mono text-[10px] text-accent">Image in</span>
      </div>
      <ul className="space-y-2">
        {['Ingredients', 'Nutrition', 'Rewrite'].map((label) => (
          <li key={label} className="mock-panel rounded-lg border border-line bg-surface px-3 py-2">
            <p className="font-mono text-[10px] text-accent">{label}</p>
            <span className="mock-bar mt-2 block h-1.5 w-4/5 rounded-full bg-wash" />
            <span className="mock-bar mt-1.5 block h-1.5 w-3/5 rounded-full bg-wash" />
          </li>
        ))}
      </ul>
    </div>
  )
}

function CampaignMock() {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Campaigns</p>
      <ul className="mt-3 space-y-2">
        {[
          ['Spring drop', 'Live'],
          ['Thank-you notes', 'Draft'],
          ['Weekend push', 'Scheduled'],
        ].map(([name, status]) => (
          <li key={name} className="mock-panel flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2">
            <span className="text-sm text-ink">{name}</span>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">{status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function categoryLabel(category: ProjectCategory) {
  if (category === 'AI') return 'AI Products'
  if (category === 'Full Stack') return 'Full-Stack'
  return 'Backend'
}
