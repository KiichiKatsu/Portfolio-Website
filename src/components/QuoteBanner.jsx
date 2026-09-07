import { motion } from 'framer-motion'
import { quote } from '../data/content.js'

// Slim full-width band under the hero for a favourite quote.
export default function QuoteBanner() {
  return (
    <section className="border-y border-line/70 bg-white/40 backdrop-blur-sm">
      <motion.figure
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-3xl px-5 py-7 text-center sm:px-6 sm:py-8 md:py-10"
      >
        <blockquote className="font-serif text-base italic leading-relaxed text-ink/85 sm:text-lg md:text-xl">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        {quote.attribution && (
          <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            {quote.attribution}
          </figcaption>
        )}
      </motion.figure>
    </section>
  )
}
