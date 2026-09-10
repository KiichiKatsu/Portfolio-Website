import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { IdCard, Menu, X } from 'lucide-react'
import { TransitionLink } from './PageTransition.jsx'
import logo from '../assets/logo.svg'

// Home sections use `scrollTo`; the rest are their own pages.
const items = [
  { label: 'Research', to: '/', scrollTo: 'research' },
  { label: 'Hardware', to: '/hardware' },
  { label: 'Design', to: '/design' },
  { label: 'Experience', to: '/experience' },
  { label: 'Awards', to: '/', scrollTo: 'awards' },
]

export default function Nav({ cardsOpen = false, onToggleCards }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()
  const barRef = useRef(null)

  // Publish the bar's real height as --nav-h so the vertical carousel pages
  // can pin exactly below it.
  useLayoutEffect(() => {
    const publish = () => {
      const h = barRef.current?.offsetHeight
      // + 1 for the header's bottom border, which sits outside <nav>
      if (h) document.documentElement.style.setProperty('--nav-h', `${h + 1}px`)
    }
    publish()
    window.addEventListener('resize', publish)
    return () => window.removeEventListener('resize', publish)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/25 backdrop-blur-md">
      <nav
        ref={barRef}
        className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3 sm:gap-4 sm:px-6 sm:py-4"
      >
        <TransitionLink
          to="/"
          onNavigate={close}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          {/* app-icon style: filled dark neutral rounded square behind the mark */}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink shadow-[0_2px_8px_-2px_rgba(30,30,40,0.35)]">
            <img
              src={logo}
              alt=""
              className="h-[17px] w-[17px] brightness-0 invert"
            />
          </span>
          <span className="truncate text-sm font-medium tracking-tight text-ink">
            Kiichiro Tatsuzawa
          </span>
        </TransitionLink>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* desktop links */}
          <ul className="hidden items-center gap-5 sm:flex lg:gap-6">
            {items.map((item) => {
              const activePage = !item.scrollTo && pathname === item.to
              return (
                <li key={item.label}>
                  <TransitionLink
                    to={item.to}
                    scrollTo={item.scrollTo}
                    className={`text-sm transition-colors hover:text-ink ${
                      activePage ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              )
            })}
          </ul>

          {/* business-card toggle */}
          <button
            type="button"
            onClick={onToggleCards}
            aria-pressed={cardsOpen}
            aria-label={cardsOpen ? 'Hide business cards' : 'Show business cards'}
            title="Business card"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              cardsOpen
                ? 'border-transparent bg-ink text-white'
                : 'border-white/50 bg-white/40 text-ink hover:bg-white/70'
            }`}
          >
            <IdCard className="h-[18px] w-[18px]" />
          </button>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/50 bg-white/40 text-ink transition-colors hover:bg-white/70 sm:hidden"
          >
            {open ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/30 bg-white/70 backdrop-blur-md sm:hidden"
          >
            <ul className="flex flex-col px-5 py-1.5">
              {items.map((item) => (
                <li key={item.label}>
                  <TransitionLink
                    to={item.to}
                    scrollTo={item.scrollTo}
                    onNavigate={close}
                    className="block py-2.5 text-sm text-ink/80 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
