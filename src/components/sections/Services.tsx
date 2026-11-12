import { OutcomeCards } from '@/components/sections/OutcomeCards'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading title="What I Bring to the Table" />
      <OutcomeCards />
    </Section>
  )
}
