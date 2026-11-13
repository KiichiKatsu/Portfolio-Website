import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, IdCard } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { TransitionLink } from './PageTransition.jsx'
import { NAV_ITEMS } from './Nav.jsx'
import usePill from './usePill.js'
import PillLabel from './PillLabel.jsx'
import logo from '../assets/logo.svg'

// Home sections tracked by the scroll-spy, in page order.
const HOME_SECTIONS = NAV_ITEMS.filter((i) => i.scrollTo).map((i) => i.scrollTo)

const RADIUS = 6

const TILES = [
  { key: 'top', kind: 'home' },
  ...NAV_ITEMS.map((item) => ({ key: item.scrollTo ?? item.to, kind: 'link', item })),
  { key: 'cards', kind: 'cards' },
]

const TILE = 'flex h-10 shrink-0 items-center justify-center rounded-[6px]'
const SQUARE = `${TILE} w-10`
const LABEL = `${TILE} px-2.5 text-xs font-semibold sm:px-3.5 sm:text-[13px]`

/**
 * Floating bottom menu (after awwwards.com): a dark frosted-glass tray pinned
 * above the bottom edge: [home] [section links] [contact-card toggle].
 *
 * ONE highlight: a white pill that sits on the current section (home at the
 * top of the page, the cards button while the cards are open) and moves to
 * whichever tile holds the haptic cursor — or is hovered, without it. The
 * text moves with it: an ink copy of every tile is layered on top and clipped
 * to the pill's shape, so labels invert exactly where the pill covers them,
 * mid-flight included. Each copy mirrors its tile's haptic lean so the two
 * layers never drift apart. Tiles use data-haptic="plain" (no cursor ring)
 * and data-haptic-axis="x" (pull and lean only side to side).
 */
export default function FloatMenu({ cardsOpen = false, onToggleCards }) {
  const { pathname } = useLocation()
  const [section, setSection] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  // hidden while the top bar is on screen; rises in once it has scrolled away
  const [shown, setShown] = useState(false)
  const rowRef = useRef(null)
  const twinRef = useRef(null)
  const hovered = useRef(null)
  const current = useRef('top')

  current.current = cardsOpen ? 'cards' : pathname === '/' ? section ?? 'top' : 'top'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400)
      const header = document.querySelector('header')
      setShown(!header || header.getBoundingClientRect().bottom <= 0)
      if (pathname !== '/') return setSection(null)
      const mid = window.innerHeight * 0.5
      let found = null
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        // a section revealed by a PressPin release (possibly tucked under the
        // section before) only counts once its reveal is under way
        const pin = el.closest('[data-pin-release]')
        const top = pin ? pin.getBoundingClientRect().top + window.innerHeight * 0.6 : el.getBoundingClientRect().top
        if (top < mid) found = id
      }
      setSection(found)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  usePill({ rowRef, twinRef, current, hovered, radius: RADIUS })

  const hover = (key) => ({
    onPointerEnter: (e) => (hovered.current = e.currentTarget),
    onPointerLeave: () => (hovered.current = null),
    'data-tile': key,
  })

  // one tile, as the real control (white on the dark tray) or as its inert
  // ink copy on the pill layer
  const tile = (t, copy) => {
    if (t.kind === 'home') {
      const img = <img src={logo} alt="" className={`h-5 w-5 ${copy ? 'brightness-0' : 'brightness-0 invert'}`} />
      return copy ? (
        <span key={t.key} className={`${SQUARE} hidden sm:flex`}>{img}</span>
      ) : (
        <TransitionLink key={t.key} to="/" aria-label="Home" data-haptic="plain" data-haptic-axis="x" data-nav="top" className={`${SQUARE} hidden sm:flex`} {...hover(t.key)}>
          {img}
        </TransitionLink>
      )
    }
    if (t.kind === 'cards') {
      const icon = <IdCard className="h-5 w-5" strokeWidth={2} />
      return copy ? (
        <span key={t.key} className={`${SQUARE} text-ink`}>{icon}</span>
      ) : (
        <button
          key={t.key}
          type="button"
          onClick={onToggleCards}
          aria-pressed={cardsOpen}
          aria-label={cardsOpen ? 'Hide contact cards' : 'Show contact cards'}
          title="Contact cards"
          data-haptic="plain" data-haptic-axis="x"
          data-nav="cards"
          className={`${SQUARE} text-white`}
          {...hover(t.key)}
        >
          {icon}
        </button>
      )
    }
    const { item } = t
    return copy ? (
      <span key={t.key} className={`${LABEL} text-ink`}><PillLabel label={item.label} /></span>
    ) : (
      <TransitionLink
        key={t.key}
        to={item.to}
        scrollTo={item.scrollTo}
        aria-current={current.current === t.key ? 'page' : undefined}
        data-haptic="plain" data-haptic-axis="x"
        data-nav={t.key}
        className={`${LABEL} text-white/75`}
        {...hover(t.key)}
      >
        {/* full stop reserved but invisible; only the pill's copy shows it */}
        <PillLabel label={item.label} hidden />
      </TransitionLink>
    )
  }

  const glass =
    'border border-white/10 bg-ink/85 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_18px_40px_-16px_rgba(20,20,26,0.55)] backdrop-blur-xl backdrop-saturate-150'

  return (
    <>
      {/* back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="top"
            type="button"
            aria-label="Back to top"
            data-haptic
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed bottom-6 left-3 z-40 hidden h-[50px] w-[50px] items-center justify-center rounded-[10px] text-white [--haptic-ring:white] transition-colors hover:bg-ink/85 lg:flex ${glass}`}
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Sections"
        initial={false}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        // a slow, soft arrival; leaving is quicker
        transition={shown ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] } : { duration: 0.35, ease: 'easeOut' }}
        // while hidden: no clicks, and the haptic cursor ignores its tiles
        data-haptic-off={shown ? undefined : ''}
        className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-2 sm:bottom-6"
      >
        {/* tiles are 40px; radii are concentric (10 = 6 + 4 padding) */}
        <div data-nav-bar className={`rounded-[10px] p-1 ${shown ? 'pointer-events-auto' : ''} ${glass}`}>
          <div ref={rowRef} className="relative flex items-center gap-1">
            {TILES.map((t) => tile(t, false))}
            {/* the pill: white, with ink copies of every tile, clipped to one tile */}
            <div
              ref={twinRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 flex items-center gap-1 bg-white p-4 opacity-0 transition-opacity duration-200"
              style={{ clipPath: 'inset(50%)' }}
            >
              {TILES.map((t) => tile(t, true))}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
