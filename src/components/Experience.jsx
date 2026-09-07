import Section from './Section.jsx'
import Carousel from './Carousel.jsx'
import { experience } from '../data/content.js'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="04" title="Experience" divider={false}>
      <Carousel items={experience} label="Experience" />
    </Section>
  )
}
