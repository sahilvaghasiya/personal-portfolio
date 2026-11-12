import { ArrowUp } from 'lucide-react'
import { navItems, profile } from '@/data/portfolio'
import { SocialLinks } from '@/components/ui/SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer reveal">
      <div className="container-custom grid gap-10 py-12 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-16">
        <div>
          <p className="text-lg font-semibold text-ink">{profile.name}</p>
          <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">{profile.tagline}</p>
          <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-muted">
            <li>{profile.availability}</li>
            <li>{profile.engagement}</li>
            <li>{profile.workMode}</li>
          </ul>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Quick Links</p>
          <nav aria-label="Footer" className="mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={`/${item.href}`} className="text-sm text-muted transition-colors hover:text-ink">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={profile.resumeHref} download className="btn-secondary mt-6">
            Download Resume
          </a>
        </div>
      </div>

      <div className="container-custom flex flex-col items-start gap-3 border-t border-line py-5 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {profile.name}
        </p>
        <p className="sm:flex-1 sm:text-center">Built with intent</p>
        <a href="/#home" className="back-to-top" aria-label="Back to top">
          <ArrowUp className="h-4 w-4" aria-hidden />
          Top
        </a>
      </div>
    </footer>
  )
}
