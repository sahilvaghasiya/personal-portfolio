import { AboutCopy } from '@/components/sections/AboutCopy'
import { AboutProcess } from '@/components/sections/AboutProcess'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading title="Story" />

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-x-16">
        <AboutCopy />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AboutProcess />
        </div>
      </div>
    </Section>
  )
}
