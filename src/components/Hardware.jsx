import Section from './Section.jsx'
import Carousel from './Carousel.jsx'
import { hardware } from '../data/content.js'

export default function Hardware() {
  return (
    <Section
      id="hardware"
      eyebrow="02"
      title="Hardware & Prototyping"
      divider={false}
    >
      <Carousel items={hardware} label="Hardware and prototyping builds" />
    </Section>
  )
}
