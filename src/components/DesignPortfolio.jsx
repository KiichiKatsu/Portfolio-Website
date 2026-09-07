import Section from './Section.jsx'
import Carousel from './Carousel.jsx'
import { designPortfolio } from '../data/content.js'

export default function DesignPortfolio() {
  return (
    <Section id="design" eyebrow="03" title="Design Portfolio" divider={false}>
      <Carousel items={designPortfolio} label="Design portfolio projects" />
    </Section>
  )
}
