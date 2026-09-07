import { motion } from 'framer-motion'

// Shared wrapper: consistent vertical rhythm + a small on-scroll fade.
//  - `divider` draws the top hairline (default on)
//  - `pad`     overrides the default vertical padding
export default function Section({
  id,
  eyebrow,
  title,
  action,
  children,
  divider = true,
  pad = 'py-16 sm:py-20 md:py-28',
}) {
  return (
    <section id={id} className={divider ? 'border-t border-line/70' : undefined}>
      <div className={`mx-auto max-w-5xl px-5 sm:px-6 ${pad}`}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
          )}
          {(title || action) && (
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8 sm:gap-6">
              {title && (
                <h2 className="font-serif text-2xl leading-[1.55] text-ink sm:text-3xl md:text-4xl">
                  {/* digital-highlight look: dark grey marker, white text */}
                  <span className="box-decoration-clone bg-ink px-0 py-1 text-white">
                    {title}
                  </span>
                </h2>
              )}
              {action}
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
