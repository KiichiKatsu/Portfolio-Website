import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const INK = '#0b0b0d'
const WIPE = { duration: 0.42, ease: [0.76, 0, 0.24, 1] } // right → left cover
const CURTAIN = { duration: 0.55, ease: [0.62, 0, 0.2, 1] } // split open
const HOLD_MS = 160 // time fully covered while the new page mounts underneath

const Ctx = createContext(null)
export const usePageTransition = () => useContext(Ctx)

/**
 * Wraps the routed app and drives a two-phase page transition:
 *   1. WIPE    — one ink-black sheet slides in from the right, covering the page
 *   2. CURTAIN — once covered (and the route swapped underneath), it splits at
 *                the centre and opens out to both edges, revealing the new page
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [phase, setPhase] = useState('idle') // idle | wipe | cover | curtain
  const pending = useRef(null)
  const coveredRef = useRef(false)

  const go = useCallback(
    (to, scrollTo) => {
      if (phase !== 'idle') return
      const samePath = (location.pathname || '/') === to
      if (samePath) {
        if (scrollTo) {
          document
            .getElementById(scrollTo)
            ?.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }
      pending.current = { to, scrollTo }
      coveredRef.current = false
      setPhase('wipe')
    },
    [phase, location.pathname],
  )

  // Fired when the wipe sheet has fully covered the screen.
  const handleCovered = () => {
    if (coveredRef.current) return
    coveredRef.current = true
    const next = pending.current
    pending.current = null
    setPhase('cover')
    if (next) navigate(next.to)
    window.setTimeout(() => {
      if (next?.scrollTo) {
        document.getElementById(next.scrollTo)?.scrollIntoView({ behavior: 'auto' })
      } else {
        window.scrollTo(0, 0)
      }
      setPhase('curtain')
    }, HOLD_MS)
  }

  const handleRevealed = () => setPhase('idle')

  const activeState = { go, transitioning: phase !== 'idle' }

  return (
    <Ctx.Provider value={activeState}>
      {children}

      {phase !== 'idle' && (
        <div
          aria-hidden="true"
          className="pointer-events-auto fixed inset-0 z-[200] overflow-hidden"
        >
          {/* wipe sheet — carries both curtain halves in as one solid cover */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={WIPE}
            onAnimationComplete={handleCovered}
          >
            <motion.div
              className="absolute inset-y-0 left-0 w-[51%]"
              style={{ background: INK }}
              initial={{ x: '0%' }}
              animate={{ x: phase === 'curtain' ? '-101%' : '0%' }}
              transition={CURTAIN}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-[51%]"
              style={{ background: INK }}
              initial={{ x: '0%' }}
              animate={{ x: phase === 'curtain' ? '101%' : '0%' }}
              transition={CURTAIN}
              onAnimationComplete={() => {
                if (phase === 'curtain') handleRevealed()
              }}
            />
          </motion.div>
        </div>
      )}
    </Ctx.Provider>
  )
}

/**
 * Drop-in replacement for <Link>. Same-page targets just scroll; cross-page
 * targets run the cinematic transition. `scrollTo` is an element id to land on
 * after the new page loads (used for the on-Home sections).
 */
export function TransitionLink({
  to,
  scrollTo,
  onNavigate,
  className,
  children,
  ...rest
}) {
  const { go } = usePageTransition()

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
    e.preventDefault()
    onNavigate?.()
    go(to, scrollTo)
  }

  return (
    <a href={`#${to}`} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
