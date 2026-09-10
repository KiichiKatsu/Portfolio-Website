import CarouselPage from './CarouselPage.jsx'
import { hardware } from '../data/content.js'

export default function Hardware() {
  return (
    <CarouselPage
      id="hardware"
      eyebrow="02"
      title="Hardware & Prototyping"
      items={hardware}
      label="Hardware and prototyping builds"
    />
  )
}
