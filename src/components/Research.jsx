import Section from './Section.jsx'
import { research } from '../data/content.js'

export default function Research() {
  return (
    <Section id="research" eyebrow="01" title="Research & Publications">
      <ol className="space-y-8 sm:space-y-10">
        {research.map((item, i) => (
          <li
            key={i}
            className="grid gap-1.5 sm:grid-cols-[130px_1fr] sm:gap-6 md:grid-cols-[140px_1fr] md:gap-8"
          >
            <div className="text-sm text-muted">
              <span className="font-medium text-ink">{item.venue}</span>
              <span className="sm:hidden"> · </span>
              <span className="sm:block">{item.status}</span>
            </div>
            <div>
              <h3 className="font-serif text-lg text-ink sm:text-xl">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.authors}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
                {item.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
