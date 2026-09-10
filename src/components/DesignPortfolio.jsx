import CarouselPage from './CarouselPage.jsx'
import { designPortfolio } from '../data/content.js'

export default function DesignPortfolio() {
  return (
    <CarouselPage
      id="design"
      eyebrow="03"
      title="Design Portfolio"
      items={designPortfolio}
      label="Design portfolio projects"
    />
  )
}
