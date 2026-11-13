import { motion } from 'framer-motion'
import RingLine from './RingLine.jsx'

export const EASE = [0.22, 1, 0.36, 1]

/** Rise into place as it enters the viewport, on a heavy spring that lands
 *  with a slight overshoot — weight rather than a float. `delay` staggers. */
export function Reveal({ children, delay = 0, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        y: { type: 'spring', stiffness: 70, damping: 13, mass: 1.4, delay },
        opacity: { duration: 0.5, delay },
      }}
      className={className}
    >
      {children}
    </M>
  )
}

/**
 * A full-screen chapter (after davidecarusio.it). Each section fills at least
 * the viewport, opens with the same motif as the hero — a small mono label, a
 * hairline that rings down like a tapped actuator, and a big title whose words slide up — then
 * its content.
 *   - tone="dark": full-bleed ink background, white text; stacked above a
 *                   release tucked under its end (see PressPin `tuck`)
 *   - `before`:    something absolutely positioned inside the section (e.g. a scroll transition)
 */
export default function Section({ id, kicker, title, tone = 'light', before, children }) {
  const dark = tone === 'dark'

  return (
    <section
      id={id}
      className={`relative flex min-h-[100svh] flex-col justify-center py-24 sm:px-1 sm:py-28 lg:px-4 ${
        dark ? 'z-[2] bg-ink text-white' : 'text-ink'
      }`}
    >
      {before}
      <div className="mx-auto w-full max-w-[96rem] px-2.5">
        <header className="mb-12 sm:mb-16">
          {kicker && (
            <Reveal
              className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
                dark ? 'text-white/55' : 'text-muted'
              }`}
            >
              {kicker}
            </Reveal>
          )}
          <RingLine className={`mt-3 ${dark ? 'text-white/25' : 'text-ink/20'}`} />
          <h2 className="mt-6 font-serif text-[clamp(2.4rem,6.2vw,5.5rem)] font-semibold leading-[0.95]">
            {title.split(' ').map((word, i) => (
              // each word gets its own mask so multi-line titles reveal cleanly
              <span
                key={i}
                className="mr-[0.3em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
              >
                <motion.span
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.05 + i * 0.06 }}
                  className="inline-block tracking-[-0.04em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </header>
        {children}
      </div>
    </section>
  )
}
