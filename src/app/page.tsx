import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Hero from '@/components/sections/Hero'
import Journey from '@/components/sections/Journey'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </>
  )
}
