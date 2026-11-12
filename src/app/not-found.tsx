import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <section className="container-custom pb-24 pt-32">
      <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">This page is not here.</h1>
      <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
        The address does not match a page on this site.
      </p>
      <a href="/" className="btn-primary mt-8">
        Back home
      </a>
    </section>
  )
}
