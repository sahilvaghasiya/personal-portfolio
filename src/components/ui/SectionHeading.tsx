type SectionHeadingProps = {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <header className="reveal mb-8 max-w-[62ch]">
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <span className="draw-rule mt-4" aria-hidden />
      {description ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </header>
  )
}
