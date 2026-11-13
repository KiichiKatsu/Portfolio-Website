import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import RingLine from './RingLine.jsx'
import { profile, quote } from '../data/content.js'

const socials = [
  { href: profile.links.linkedin, label: 'LinkedIn', external: true },
  { href: profile.links.orcid, label: 'ORCID', external: true },
  { href: `mailto:${profile.links.email}`, label: 'Email', external: false },
]

const EASE = [0.22, 1, 0.36, 1]

// Split the intro into its first sentence (bold) and the rest, from whatever
// the copy in content.js says — nothing here depends on the current wording.
function splitFirstSentence(text) {
  const m = text.trim().match(/^(.+?[.!?]['"”’)]*)(?:\s+([\s\S]*))?$/)
  return m ? { lead: m[1], rest: m[2] ?? '' } : { lead: text.trim(), rest: '' }
}
const intro = splitFirstSentence([profile.tagline, profile.summary].filter(Boolean).join(' '))

/**
 * Landing hero (after davidecarusio.it): one screen, mostly air.
 *   - a short intro, small, tucked into the top-right corner, with the
 *     favourite quote under it in the lightest weight
 *   - bottom: a tiny mono label row, a hairline, then the name in the
 *     black digital-highlight marker
 * It fills the screen under the top bar, so on landing the name sits at the
 * bottom of the first screen (the floating menu only appears once the top bar
 * has scrolled away). As you scroll away the content drifts up and
 * fades; HomePage wraps it in a PressPin that presses it into the dark statements.
 */
export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // springed so the content trails the scroll and settles with weight
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -160]), { stiffness: 90, damping: 22, mass: 1.2 })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex flex-col sm:px-1 lg:px-4"
      // fills the first screen under the top bar; the floating menu is hidden
      // until the top bar scrolls away, so only a breathing margin at the bottom
      style={{ minHeight: 'calc(100svh - 62px)', paddingBottom: 'clamp(1.75rem, 5svh, 3.25rem)' }}
    >
      <motion.div style={{ y, opacity }} className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col px-2.5">
        {/* intro — small, top-right */}
        <div className="flex flex-1 items-start justify-end pb-16 pt-10 md:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="max-w-[22rem] text-[14px] font-medium leading-snug tracking-tight text-ink sm:text-[15px]"
          >
            {/* one fully justified block, hyphenated so the spacing stays even;
                whatever the first sentence is, it's set bold */}
            <p className="text-justify hyphens-auto">
              <strong className="font-extrabold">{intro.lead}</strong>
              {intro.rest && ` ${intro.rest}`}
            </p>

            {/* the favourite quote, under the intro in the lightest weight */}
            {quote?.text && (
              <figure className="mt-6">
                <blockquote className="text-justify font-extralight hyphens-auto">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                {quote.attribution && (
                  <figcaption className="mt-2 font-mono text-[10px] font-normal uppercase tracking-[0.06em] text-muted">
                    {quote.attribution}
                  </figcaption>
                )}
              </figure>
            )}
          </motion.div>
        </div>

        {/* bottom block */}
        <div className="@container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-muted"
          >
            <span>
              {profile.role} · {profile.affiliation}
            </span>
            <span className="flex gap-5">
              {socials.map(({ href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  data-haptic data-haptic-axis="x"
                  // padding = breathing room for the highlight ring; the negative
                  // margin keeps the text exactly where it was
                  className="-mx-2.5 -my-1.5 rounded-[6px] px-2.5 py-1.5 transition-colors hover:text-ink"
                >
                  {label} ↗
                </a>
              ))}
            </span>
          </motion.div>

          <RingLine className="mt-3 text-ink/20 sm:mt-5" delay={0.35} />

          {/* the name, in the digital-highlight marker: a black bar wipes in
              from the left, then the name fades up in white on top of it.
              No side padding — it hugs the letters like a highlighter stroke. */}
          <h1 className="mt-5 font-serif font-semibold leading-none sm:mt-8">
            <span className="relative inline-block py-[0.06em] text-[clamp(2rem,3.8cqw,3.4rem)] tracking-[-0.03em]">
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                className="absolute inset-0 origin-left bg-ink"
              />
              <motion.span
                initial={{ opacity: 0, y: '0.25em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
                className="relative inline-block text-white"
              >
                {profile.name}
              </motion.span>
            </span>
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
