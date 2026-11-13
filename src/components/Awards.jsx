import Section, { Reveal } from './Section.jsx'
import { awards } from '../data/content.js'

// Light chapter; HomePage wraps it in a PressPin release out of dark Experience.
export default function Awards() {
  return (
    <Section id="awards" kicker="Recognition" title="Awards">
      <ul className="border-t border-ink/10">
        {awards.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 0.08}
            className="grid gap-1 border-b border-ink/10 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{item.year}</span>
            <span>
              <span className="font-serif text-lg font-semibold tracking-[-0.03em] sm:text-xl">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{item.detail}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
