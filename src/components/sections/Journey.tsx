import { AboutJourney } from '@/components/sections/AboutJourney'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function Journey() {
  return (
    <Section id="journey">
      <SectionHeading title="Journey" />
      <AboutJourney />
    </Section>
  )
}
