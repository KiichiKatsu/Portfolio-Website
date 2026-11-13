import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EASE, Reveal } from './Section.jsx'
import RingLine from './RingLine.jsx'
import { RESUME_URL } from './Nav.jsx'
import { profile } from '../data/content.js'

const links = [
  { label: 'Résumé', href: RESUME_URL },
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'ORCID', href: profile.links.orcid },
]

// Closing screen: one big line and a way to reach me, mirroring the hero.
// "TOUCH" buzzes now and then (and on hover) like a phone on a desk.
export default function Contact() {
  return (
    <section id="contact" className="flex min-h-[100svh] flex-col justify-end pb-10 pt-24 sm:px-1 lg:px-4">
      <div className="@container mx-auto w-full max-w-[96rem] px-2.5">
        <Reveal className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Contact
        </Reveal>
        <RingLine className="mt-3 text-ink/20" />

        <h2 className="mt-8 font-serif font-semibold leading-[0.88] text-ink">
          {['Keep', 'in', 'TOUCH'].map((word, i) => (
            <span key={word} className="mr-[0.3em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.08 }}
                className="inline-block text-[15cqw] tracking-[-0.05em] md:text-[12.5cqw]"
              >
                {/* the buzz lives on an inner span: a CSS animation on the
                    motion span would override framer's slide-up transform */}
                {word === 'TOUCH' ? <span className="touch-buzz-wrap inline-block">{word}</span> : word}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.2} className="max-w-sm text-[17px] font-medium leading-snug">
            Open to collaborations, studies, and good conversations about touch.
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col items-start gap-5 md:items-end">
            <a
              href={`mailto:${profile.links.email}`}
              data-haptic data-haptic-axis="x"
              className="group inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {profile.links.email}
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="flex gap-2">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-haptic data-haptic-axis="x"
                  className="rounded-[6px] px-4 py-2.5 text-[13px] font-semibold ring-1 ring-ink/20 ring-inset transition-colors hover:bg-ink hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
