import { useLayoutEffect, useRef } from 'react'
import { animate, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { statements } from '../data/content.js'

/* ═══════════════════════════════════════════════════════════════════════════
   STATEMENTS — tuning
   Each PASSAGE is BISTABLE, like the buttons and the press circle: scroll past
   its ON threshold and the whole statement commits — its lines then light up
   one after another on their own clock, each left to right at a reading pace.
   Scroll back below the (lower) OFF threshold and it dims again. Where you
   stop scrolling never leaves a passage half-lit.
   ═══════════════════════════════════════════════════════════════════════════ */
const READ_S = 1.1 //        seconds for one line to light up, left to right
const NEXT_AT = 0.85 //      a line starts once the one before is this far lit (overlap)
const DIM_S = 0.6 //         seconds to dim a passage again (all lines together)
const ON = 0.06 //           slot progress that commits a passage
const OFF = 0.01 //          …and that it must fall back below to dim
const DIM = 0.14 //          opacity of a letter that hasn't lit yet

/* DETENTS (gentle) — each statement has a rest point where it's fully lit.
   When scrolling stops within CAPTURE of one, the page glides onto it; stop
   anywhere else and it stays exactly where you left it. Scrolling is never
   intercepted — a glide is cancelled the instant you scroll again. */
const SLOT = 1 //            screens of scrolling per statement (bigger = more to overcome)
const HOLD = 0.68 //         where in its slot each statement rests
// The section is tucked under the end of the hero's press (and the Projects
// release under its end): the first statement rests exactly where the press
// finishes, and the exit starts the moment you leave the last one. Between
// rest points there's one SLOT of scrolling; nothing dead before or after.
const CAPTURE = 0.3 //       stop within this much of a slot from a statement and it pulls you onto it
// the glide back/forward onto a rest point: springy, settles without bouncing past
const SETTLE = { type: 'spring', stiffness: 70, damping: 17, mass: 1 }

/**
 * Pinned manifesto: a dark section several screens tall whose inner frame
 * sticks to the viewport while the statements play through one at a time.
 *
 * Lines are measured from the real layout (and re-measured on resize), each
 * letter's opacity reads its line's CSS variable (--l0, --l1, …), and one rAF
 * loop ramps those variables — so nothing re-renders.
 */
export default function Statements() {
  const ref = useRef(null)
  const items = useRef([])
  const ticks = useRef([])
  const lines = useRef([]) // per statement: [{ v }] — each line's lit amount
  const lit = useRef([]) // per statement: committed?
  const reduce = useReducedMotion()
  const n = statements.length

  // measure each statement's visual lines and wire its letters to them
  useLayoutEffect(() => {
    if (reduce) return
    const measure = () => {
      items.current.forEach((p, k) => {
        if (!p) return
        const spans = [...p.querySelectorAll('[data-c]')]
        const rows = []
        let lastTop = null
        for (const s of spans) {
          const top = Math.round(s.offsetTop)
          if (lastTop === null || Math.abs(top - lastTop) > 4) rows.push([])
          rows[rows.length - 1].push(s)
          lastTop = top
        }
        rows.forEach((row, j) => {
          row.forEach((s, i) => {
            // letters stagger across the line as its variable runs 0 → 1
            const at = (i / row.length).toFixed(3)
            s.style.opacity = `clamp(${DIM}, calc((var(--l${j}, 0) * 1.25 - ${at}) * 6), 1)`
          })
        })
        const prev = lines.current[k] || []
        lines.current[k] = rows.map((_, j) => ({ v: prev[j]?.v ?? 0 }))
      })
    }
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [reduce])

  // one loop ramps every line toward its committed state at reading pace
  useLayoutEffect(() => {
    if (reduce) return
    let raf = 0
    let last = performance.now()
    const step = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      lines.current.forEach((ls, k) => {
        const p = items.current[k]
        if (!p || !ls) return
        const on = lit.current[k]
        ls.forEach((line, j) => {
          // lighting: in sequence — a line waits for the one before it
          // dimming: every line together, a little quicker
          const ready = !on || j === 0 || ls[j - 1].v >= NEXT_AT
          const target = on && ready ? 1 : on ? line.v : 0
          if (line.v === target) return
          const d = dt / (on ? READ_S : DIM_S)
          line.v = target > line.v ? Math.min(target, line.v + d) : Math.max(target, line.v - d)
          p.style.setProperty(`--l${j}`, line.v.toFixed(4))
        })
      })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  // the detents
  useLayoutEffect(() => {
    if (reduce) return
    let timer = 0
    let glide = null // the running settle animation, if any
    const stop = () => {
      glide?.stop()
      glide = null
    }
    const restPoints = () => {
      const sec = ref.current
      const top = sec.getBoundingClientRect().top + window.scrollY
      const range = sec.offsetHeight - window.innerHeight
      return statements.map((_, k) => top + (n > 1 ? (k / (n - 1)) * range : 0))
    }
    const onEnd = () => {
      if (!ref.current || document.querySelector('.z-\\[200\\]')) return // curtain jump running
      const pts = restPoints()
      const y = window.scrollY
      // gentle: only a statement you stopped NEAR pulls you in (within CAPTURE
      // of a slot); stop anywhere else and the page stays where you left it.
      // Up past the first statement is always free.
      const slot = window.innerHeight * SLOT
      if (y < pts[0] - 2) return
      let k = 0
      pts.forEach((pt, i) => {
        if (Math.abs(pt - y) < Math.abs(pts[k] - y)) k = i
      })
      const d = Math.abs(pts[k] - y)
      if (d <= 2 || d > slot * CAPTURE) return
      // spring onto the rest point (our own animation: native smooth scrolling
      // is inconsistent, and this one can be cancelled the instant you scroll)
      stop()
      glide = animate(y, pts[k], {
        ...SETTLE,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: 'instant' }),
        onComplete: () => (glide = null),
      })
    }
    const onScroll = () => {
      if (glide) return // our own glide — don't re-trigger
      clearTimeout(timer)
      timer = setTimeout(onEnd, 140)
    }
    // any input from you cancels a glide immediately
    const interrupt = () => {
      if (!glide) return
      stop()
      clearTimeout(timer)
      timer = setTimeout(onEnd, 140)
    }
    const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    window.addEventListener('scroll', onScroll, { passive: true })
    inputs.forEach((ev) => window.addEventListener(ev, interrupt, { passive: true }))
    return () => {
      stop()
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      inputs.forEach((ev) => window.removeEventListener(ev, interrupt))
    }
  }, [reduce, n])

  // Everything below runs off the PAGE scroll position. (Section-relative
  // progress reads 0 both before the section arrives and on arrival, so it
  // can't tell "hidden under the hero" from "just revealed".)
  const { scrollY } = useScroll()
  const prevP = useRef(0)
  const shown = useRef(false)

  const resetAll = () => {
    items.current.forEach((el, k) => {
      lit.current[k] = false
      ;(lines.current[k] || []).forEach((line, j) => {
        line.v = 0
        el?.style.setProperty(`--l${j}`, '0')
      })
    })
  }

  useMotionValueEvent(scrollY, 'change', () => {
    const sec = ref.current
    if (!sec) return
    const rect = sec.getBoundingClientRect()

    // only shown once it has reached the top (the press has covered the
    // screen); hidden again above that — and reset, so arriving always plays
    // the first statement from the start
    const visible = rect.top <= 1
    if (visible !== shown.current) {
      shown.current = visible
      sec.style.visibility = visible ? 'visible' : 'hidden'
      if (!visible) resetAll()
    }
    if (!visible) return

    const range = Math.max(1, sec.offsetHeight - window.innerHeight)
    const p = Math.min(1, Math.max(0, -rect.top / range))
    const jumped = Math.abs(p - prevP.current) > 0.3 // e.g. a menu link under the curtain
    prevP.current = p

    items.current.forEach((el, k) => {
      if (!el) return
      // this statement's local progress across its slot; = HOLD at its rest point
      const lp = (n > 1 ? p * (n - 1) : 0) + HOLD - k
      const lastSlot = k === n - 1
      const fadeIn = Math.min(1, Math.max(0, (lp + 0.08) * 12))
      const fadeOut = lastSlot ? 1 : Math.min(1, Math.max(0, (1 - lp) * 8))
      el.style.opacity = String(Math.min(fadeIn, fadeOut))
      el.style.transform = `translateY(${(1 - fadeIn) * 24 - (1 - fadeOut) * 24}px)`
      // fully out of view (either direction): reset, so coming back to this
      // passage replays its line-by-line highlight from the start
      const gone = lp <= -0.08 || (!lastSlot && lp >= 1)
      if (gone) {
        lit.current[k] = false
        ;(lines.current[k] || []).forEach((line, j) => {
          if (line.v !== 0) {
            line.v = 0
            el.style.setProperty(`--l${j}`, '0')
          }
        })
        return
      }
      // one threshold per passage (with hysteresis)
      lit.current[k] = lit.current[k] ? lp > OFF : lp > ON
      if (jumped) {
        ;(lines.current[k] || []).forEach((line, j) => {
          line.v = lit.current[k] ? 1 : 0
          el.style.setProperty(`--l${j}`, String(line.v))
        })
      }
    })
    const current = Math.min(n - 1, Math.max(0, Math.round(n > 1 ? p * (n - 1) : 0)))
    ticks.current.forEach((el, k) => {
      if (el) el.style.opacity = k === current ? '1' : '0.25'
    })
  })

  if (reduce) {
    return (
      <section className="bg-ink px-5 py-32 text-white sm:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {statements.map((s) => (
            <p key={s} className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">{s}</p>
          ))}
        </div>
      </section>
    )
  }

  return (
    // tucked one screen up under the hero's press (marginTop) and stacked above
    // the Projects release that's tucked under its end (z-[2]); hidden until it
    // reaches the top, so it can't darken the hero's transparent backdrop early
    <section
      ref={ref}
      className="relative z-[2] bg-ink text-white"
      style={{ height: `${((n - 1) * SLOT + 1) * 100}svh`, marginTop: '-100svh', visibility: 'hidden' }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8">
        {/* slot indicator: which statement you're on */}
        <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:left-8 md:flex">
          {statements.map((s, k) => (
            <span
              key={s}
              ref={(el) => (ticks.current[k] = el)}
              className="h-6 w-px bg-white transition-opacity duration-300"
              style={{ opacity: k === 0 ? 1 : 0.25 }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-4xl">
          {statements.map((text, k) => (
            <p
              key={text}
              ref={(el) => (items.current[k] = el)}
              aria-label={text}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif text-[clamp(1.75rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              style={{ opacity: k === 0 ? 1 : 0 }}
            >
              {[...text].map((c, i) => (
                <span key={i} data-c aria-hidden="true" style={{ opacity: DIM }}>
                  {c}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
