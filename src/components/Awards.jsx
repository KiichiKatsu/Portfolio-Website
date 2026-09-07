import Section from './Section.jsx'
import { awards } from '../data/content.js'

export default function Awards() {
  return (
    <Section id="awards" eyebrow="05" title="Awards & Recognition">
      <ul className="divide-y divide-line border-y border-line">
        {awards.map((item, i) => (
          <li key={i} className="flex gap-4 py-4 sm:gap-6">
            <span className="w-12 shrink-0 text-sm text-muted sm:w-14">{item.year}</span>
            <span className="text-sm text-ink">
              {item.title}
              <span className="text-muted"> — {item.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
