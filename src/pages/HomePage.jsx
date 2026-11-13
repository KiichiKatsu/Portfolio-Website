import Hero from '../components/Hero.jsx'
import Statements from '../components/Statements.jsx'
import Projects from '../components/Projects.jsx'
import Research from '../components/Research.jsx'
import Experience from '../components/Experience.jsx'
import Awards from '../components/Awards.jsx'
import Contact from '../components/Contact.jsx'
import { PressPin } from '../components/Transitions.jsx'

// The whole site is one cinematic scroll:
//   hero ▸ press ▸ pinned statements (dark) ▸ release ▸ projects ▸ research
//   ▸ press ▸ experience (dark) ▸ release ▸ awards ▸ contact
export default function HomePage() {
  return (
    <>
      {/* the bar isn't on screen yet: the circle sweeps in from the bottom-right
          corner instead, with a longer run-up */}
      {/* normal stacking: the statements (hidden until the press completes)
          sit above the hero once revealed, so the first statement shows at once */}
      <PressPin origin="corner" length={1.4}>
        <Hero />
      </PressPin>
      <Statements />
      <Projects />
      {/* same as the hero: swept in from the bottom-right corner, longer run-up */}
      <PressPin origin="corner" length={1.4}>
        <Research />
      </PressPin>
      <Experience />
      {/* tucked under the end of Experience: starts as Experience ends */}
      <PressPin mode="release" origin="awards" tuck>
        <Awards />
      </PressPin>
      <Contact />
    </>
  )
}
