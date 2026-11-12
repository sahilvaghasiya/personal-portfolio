import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/layout/Navbar'
import { AnimateOnScroll } from '@/components/motion/AnimateOnScroll'

const sans = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const title = 'Sahil Vaghasiya, Software Engineer'
const description =
  'From architecture to deployment, Sahil Vaghasiya builds AI-first products that make it to production.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Software Engineer',
    'OpenAI',
    'Gemini',
    'Cursor',
    'Next.js',
    'TypeScript',
    'Sahil Vaghasiya',
  ],
  authors: [{ name: 'Sahil Vaghasiya' }],
  openGraph: {
    title,
    description,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AnimateOnScroll />
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="content" tabIndex={-1} className="relative z-[1] outline-none">
            <div id="top-sentinel" className="h-px" aria-hidden />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
