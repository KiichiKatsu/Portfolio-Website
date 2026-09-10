import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { UI_CONFIG } from '../ui-config.js'

const INK = '#0b0b0d'
const W = UI_CONFIG.wipe
const C = UI_CONFIG.curtain
const CURTAIN = { duration: C.durationMs / 1000, ease: C.ease }

// Phase 1: build the heavy-but-flowing wipe from the tuning config.
// x (translateX of the sheet) runs 100% → 0% (covering) as:
//   100 --burst--> (s1 - overshoot) --spring--> s1 --drift--> s1+d
//       --haul--> (s2 - overshoot) --spring--> s2 --drift--> s2+d --flow--> 0
// where sN = 100 - stopN. The overshoot + spring-back is the bounce.
function buildWipe() {
  const s1 = 100 - W.stop1Pct
  const s2 = 100 - W.stop2Pct
  const o = W.overshootPct
  const d = W.settleDriftPct

  const segMs = [
    W.burstMs,
    W.bounceMs,
    W.pause1Ms,
    W.dragMs,
    W.bounceMs,
    W.pause2Ms,
    W.finalMs,
  ]
  const total = segMs.reduce((a, b) => a + b, 0)
  const times = [0]
  let acc = 0
  for (const ms of segMs) {
    acc += ms
    times.push(acc / total)
  }

  return {
    keyframes: [
      '100%',
      `${s1 - o}%`,
      `${s1}%`,
      `${s1 + d}%`,
      `${s2 - o}%`,
      `${s2}%`,
      `${s2 + d}%`,
      '0%',
    ],
    transition: {
      duration: total / 1000,
      times,
      ease: [
        W.easeBurst,
        W.easeBounce,
        W.easeRelax,
        W.easeDrag,
        W.easeBounce,
        W.easeRelax,
        W.easeFinal,
      ],
    },
  }
}
const WIPE = buildWipe()

const Ctx = createContext(null)
export const usePageTransition = () => useContext(Ctx)

/**
 * Drives a two-phase page transition:
 *   1. WIPE    — one ink-black sheet is dragged in from the right with visible
 *                effort (bursts, stalls, hauls, stalls, pulls home).
 *   2. CURTAIN — once covered (route swapped underneath), it splits at the
 *                exact centre and opens out to both edges.
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
        document
          .getElementById(next.scrollTo)
          ?.scrollIntoView({ behavior: 'auto' })
      } else {
        window.scrollTo(0, 0)
      }
      setPhase('curtain')
    }, C.holdMs)
  }

  const handleRevealed = () => setPhase('idle')

  return (
    <Ctx.Provider value={{ go, transitioning: phase !== 'idle' }}>
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
            animate={{ x: WIPE.keyframes }}
            transition={WIPE.transition}
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
