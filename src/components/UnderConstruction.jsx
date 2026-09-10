import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Construction, X } from 'lucide-react'

const STORAGE_KEY = 'uc-notice-dismissed'

// One-time "site under construction" notice. Shows on first load of a browsing
// session; dismissal is remembered for the rest of that session (sessionStorage),
// so a refresh won't nag but a fresh visit will show it again.
export default function UnderConstruction() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      dismissed = false
    }
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 450) // let the page paint first
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode / storage blocked — fine, it'll just show again next load */
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const fade = reduced ? { duration: 0.15 } : { duration: 0.28, ease: [0.22, 0.75, 0.32, 1] }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="uc-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="uc-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
          onClick={dismiss}
          className="pointer-events-auto fixed inset-0 z-[180] flex items-center justify-center bg-ink/25 px-5 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={fade}
            className="relative w-full max-w-sm rounded-2xl border border-white/60 bg-white/85 p-6 text-center shadow-[0_30px_60px_-18px_rgba(30,30,40,0.35)] backdrop-blur-md sm:p-7"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notice"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
              <Construction className="h-5 w-5" />
            </span>

            <h2
              id="uc-title"
              className="mt-4 font-serif text-xl text-ink"
            >
              Under construction
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This site is a work in progress. Content and layout are still being
              built out — expect placeholder text, rough edges, and things that
              move around.
            </p>

            <button
              type="button"
              onClick={dismiss}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
