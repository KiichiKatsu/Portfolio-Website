import { useRef, useState } from 'react'
import usePill from './usePill.js'
import PillLabel from './PillLabel.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { TransitionLink } from './PageTransition.jsx'
import { profile } from '../data/content.js'
import logo from '../assets/logo.svg'

// Shared by the top bar and the floating bottom menu (FloatMenu.jsx).
// Everything lives on the home page now; each item scrolls to its section.
export const NAV_ITEMS = [
  { label: 'Projects', to: '/', scrollTo: 'projects' },
  { label: 'Research', to: '/', scrollTo: 'research' },
  { label: 'Experience', to: '/', scrollTo: 'experience' },
  { label: 'Awards', to: '/', scrollTo: 'awards' },
]

const LINK = 'flex h-9 items-center rounded-[6px] px-3 text-sm font-medium text-ink/70'

export const RESUME_URL = `${import.meta.env.BASE_URL}Resume.pdf`

const CTA = 'flex h-[42px] items-center rounded-[6px] px-5 text-sm font-medium'
const CTAS = [
  { key: 'resume', label: 'Résumé', href: RESUME_URL, external: true },
  { key: 'touch', label: 'Keep in touch', href: `mailto:${profile.links.email}` },
]
// the pill's resting place in the top-right pair (a stable ref for usePill)
const CTA_REST = { current: 'resume' }

/**
 * Top menu bar (after awwwards.com, minus its background strip): logo, links,
 * then a dark + an outline button on the right, straight on the backdrop.
 * It sits in the page flow and scrolls away; the floating bottom menu takes
 * over navigation once you're scrolling.
 */
export default function Nav() {
  const ctaRef = useRef(null)
  const ctaTwinRef = useRef(null)
  const hoveredCta = useRef(null)
  usePill({ rowRef: ctaRef, twinRef: ctaTwinRef, current: CTA_REST, hovered: hoveredCta })
  const linksRef = useRef(null)
  const linksTwinRef = useRef(null)
  const hoveredLink = useRef(null)
  usePill({ rowRef: linksRef, twinRef: linksTwinRef, hovered: hoveredLink })
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="relative z-50 pt-2 sm:px-1 lg:px-4">
      <nav className="relative mx-auto flex h-[54px] max-w-[96rem] items-center gap-2 pl-2.5 pr-1 sm:gap-4">
        <TransitionLink
          to="/"
          onNavigate={close}
          data-haptic="plain" data-haptic-axis="x"
          className="flex min-w-0 items-center gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-ink">
            <img src={logo} alt="" className="h-[17px] w-[17px] brightness-0 invert" />
          </span>
          {/* no ring here: while it holds the cursor, the name just dims */}
          <span className="truncate text-sm font-semibold tracking-tight text-ink transition-opacity duration-200 [[data-haptic-active]_&]:opacity-55">
            {profile.name}
          </span>
        </TransitionLink>

        {/* desktop links — one sliding ink pill (same as the bottom bar, in
            reverse): it only appears on the link holding the cursor, and the
            label turns white exactly where the pill covers it */}
        <div ref={linksRef} className="relative ml-4 hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <TransitionLink
              key={item.label}
              to={item.to}
              scrollTo={item.scrollTo}
              data-tile={item.label}
              data-haptic="plain"
              data-haptic-axis="x"
              onPointerEnter={(e) => (hoveredLink.current = e.currentTarget)}
              onPointerLeave={() => (hoveredLink.current = null)}
              className={LINK}
            >
              {/* full stop reserved but invisible; only the pill's copy shows it */}
              <PillLabel label={item.label} hidden />
            </TransitionLink>
          ))}
          <div
            ref={linksTwinRef}
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 flex items-center gap-1 bg-ink p-4 opacity-0 transition-opacity duration-200"
            style={{ clipPath: 'inset(50%)' }}
          >
            {NAV_ITEMS.map((item) => (
              <span key={item.label} className={`${LINK} text-white`}>
                <PillLabel label={item.label} />
              </span>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Résumé / Keep in touch — the same sliding ink pill: it rests on
              Résumé (so it still reads as the primary button) and slides to
              Keep in touch while that holds the cursor */}
          <div ref={ctaRef} className="relative hidden items-center gap-1 lg:flex">
            {CTAS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                data-tile={c.key}
                data-haptic="plain"
                data-haptic-axis="x"
                onPointerEnter={(e) => (hoveredCta.current = e.currentTarget)}
                onPointerLeave={() => (hoveredCta.current = null)}
                className={`${CTA} text-ink`}
              >
                {/* full stop reserved but invisible; only the pill's copy shows it */}
                <PillLabel label={c.label} hidden />
              </a>
            ))}
            <div
              ref={ctaTwinRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 flex items-center gap-1 bg-ink p-4 opacity-0 transition-opacity duration-200"
              style={{ clipPath: 'inset(50%)' }}
            >
              {CTAS.map((c) => (
                <span key={c.key} className={`${CTA} text-white`}>
                  <PillLabel label={c.label} />
                </span>
              ))}
            </div>
          </div>

          {/* menu toggle (below md) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[6px] text-ink transition-colors hover:bg-black/5 md:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>

        {/* mobile dropdown — hangs off the bar like Awwwards' menus */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full mt-1.5 rounded-[10px] border border-white/60 bg-white/60 p-1.5 shadow-[0_20px_40px_-20px_rgba(30,30,40,0.35)] backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <TransitionLink
                      to={item.to}
                      scrollTo={item.scrollTo}
                      onNavigate={close}
                      className="block rounded-[6px] px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-black/5 hover:text-ink"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[42px] items-center justify-center rounded-[6px] bg-ink text-sm font-medium text-white"
                >
                  Résumé
                </a>
                <a
                  href={`mailto:${profile.links.email}`}
                  className="flex h-[42px] items-center justify-center rounded-[6px] text-sm font-medium text-ink ring-[0.5px] ring-ink ring-inset"
                >
                  Keep in touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
