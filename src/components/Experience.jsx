import CarouselPage from './CarouselPage.jsx'
import { experience } from '../data/content.js'

export default function Experience() {
  return (
    <CarouselPage
      id="experience"
      eyebrow="04"
      title="Experience"
      items={experience}
      label="Experience"
    />
  )
}
