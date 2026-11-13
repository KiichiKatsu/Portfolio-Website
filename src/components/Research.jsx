import Section, { Reveal } from './Section.jsx'
import { research } from '../data/content.js'

// Light chapter; HomePage wraps it in a PressPin into the dark Experience chapter.
export default function Research() {
  return (
    <Section id="research" kicker="Research" title="Publications">
      <ol className="border-t border-ink/10">
        {research.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 0.08}
            className="grid gap-2 border-b border-ink/10 py-8 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-10"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              <span className="text-ink">{item.venue}</span>
              <span className="sm:block"> · {item.status}</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{item.authors}</p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">{item.summary}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
