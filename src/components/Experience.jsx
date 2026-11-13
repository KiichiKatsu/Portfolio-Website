import Section, { Reveal } from './Section.jsx'
import { experience } from '../data/content.js'

// Dark full-bleed chapter (the "services" moment on davidecarusio.it).
export default function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I've worked" tone="dark">
      <ol className="border-t border-white/10">
        {experience.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 0.08}
            className="group grid gap-2 border-b border-white/10 py-7 transition-colors sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
              {item.subtitle}
            </p>
            <div>
              <h3 className="font-serif text-xl font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65">{item.blurb}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
