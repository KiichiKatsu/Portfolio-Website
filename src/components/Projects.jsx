import Section from './Section.jsx'
import Carousel from './Carousel.jsx'
import { PressPin } from './Transitions.jsx'
import { designPortfolio, hardware } from '../data/content.js'

// Projects: two full-screen chapters, each with its own carousel. The first
// lifts out of the dark statements above it (PressPin release).
export default function Projects() {
  return (
    <>
      {/* tucked under the end of the statements: starts as you leave the last one */}
      <PressPin mode="release" origin="projects" tuck>
        <Section id="projects" kicker="Projects — Hardware" title="Hardware & Prototyping">
          <Carousel items={hardware} label="Hardware and prototyping builds" />
        </Section>
      </PressPin>
      <Section id="design" kicker="Projects — Design" title="Design Portfolio">
        <Carousel items={designPortfolio} label="Design portfolio projects" />
      </Section>
    </>
  )
}
