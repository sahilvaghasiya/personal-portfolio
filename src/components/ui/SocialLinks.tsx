import { Github, Instagram, Linkedin } from 'lucide-react'
import { socialLinks } from '@/data/portfolio'

const icons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
} as const

type SocialLinksProps = {
  className?: string
  glow?: boolean
}

export function SocialLinks({ className = '', glow = false }: SocialLinksProps) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = icons[link.name]
        return (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink ${
                glow ? 'social-glow' : 'transition-colors hover:bg-wash hover:text-accent'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
