import { ReactNode } from 'react'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 md:py-20 ${className}`}>
      <div className="container-custom">{children}</div>
    </section>
  )
}
