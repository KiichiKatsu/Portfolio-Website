import { useLayoutEffect, useRef, useState } from 'react'
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   PRESS / RELEASE — the site's light ▸ dark ▸ light transition, themed on a
   fingertip touching the screen. Wrap a light section in <PressPin>:

   mode="press"   (light ▸ dark, the section *before* a dark one)
     When the section's bottom reaches the bottom of the screen it pins, and an
     ink circle swells out of the floating menu — from the item named by
     `origin`, or the whole bar — pressure ripples running ahead of it, until it
     fills the viewport. Only then does the page move on, so
     the dark section below arrives under a screen that is already dark.

   mode="release" (dark ▸ light, the section *after* a dark one)
     The exact reverse. The section arrives fully covered in ink (seamless with
     the dark section above), pins at the top of the screen, and the circle
     shrinks back down and is absorbed into the menu item — the finger lifting
     off — revealing it.

   The circle starts and ends exactly the size of its menu item and sits behind
   the (fixed, higher) menu, so the item itself seems to swell and swallow.

   BISTABLE both ways, like the buttons: the circle never sits halfway. Going
   down, scrolling past ON commits it and it snaps all the way on its own
   spring; going back up, it snaps back once you've reversed past 1 - ON.
   Safety ramps at both ends of the pin keep any section edge from showing. A safety ramp forces full
   coverage over the pin's last stretch, so a fast flick can't outrun it.
   Writes go straight to the DOM — no re-render per scroll tick.
   ═══════════════════════════════════════════════════════════════════════════ */

const ON = 0.15 //    going down: progress through the pin that commits the swell
//                    going up: it snaps back once you've reversed this far from
//                    the end (i.e. below 1 - ON) — thresholds both ways
// a slower, still decisive commit (~0.9s), critically damped so it lands without bouncing
const SNAP = { type: 'spring', stiffness: 85, damping: 19, mass: 1, restDelta: 0.0005 }
const FORCE_FROM = 0.85 // past this, coverage is forced regardless of the spring
// a release tucked under a dark section commits later, once that section has
// mostly slid out of the way — so the circle visibly shrinks in the open
const TUCK_ON = 0.45
const smooth = (t) => t * t * (3 - 2 * t)
const clamp01 = (t) => Math.min(1, Math.max(0, t))

// Where the circle grows from: 'corner' (bottom-right of the screen, from
// nothing), a bottom-bar item (data-nav), else the bar.
function originOf(name) {
  if (name === 'corner') return { x: window.innerWidth, y: window.innerHeight, r0: 0 }
  const el =
    (name && document.querySelector(`[data-nav="${name}"]`)) || document.querySelector('[data-nav-bar]')
  const r = el?.getBoundingClientRect()
  if (!r || !r.width) return { x: window.innerWidth / 2, y: window.innerHeight, r0: 0 }
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, r0: Math.max(r.width, r.height) / 2 }
}

// length: how many screens of scrolling the pin holds for (longer = slower build)
// z: stacking of the pinned section
// tuck: pull this pin one screen up under the section before (the Projects release
//       under the statements), so it begins the moment that section ends
export function PressPin({ mode = 'press', origin, length = 1, z = 1, tuck = false, children }) {
  const press = mode === 'press'
  const wrap = useRef(null)
  const pin = useRef(null)
  const fill = useRef(null)
  const rings = useRef([])
  const [top, setTop] = useState(0)
  const reduce = useReducedMotion()

  // press: stick when the section's bottom meets the screen's bottom
  // release: stick when the section's top meets the screen's top
  useLayoutEffect(() => {
    const el = pin.current
    if (!el) return
    const update = () => setTop(press ? window.innerHeight - el.offsetHeight : 0)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [press])

  // raw progress across the one screen of scrolling the pin holds for:
  // 0 when the pin engages, 1 when it lets go
  const raw = useMotionValue(0)
  const snapped = useMotionValue(0) // 0 → 1, driven by the commit, not by scroll
  const committed = useRef(false)
  const snap = useRef(null) // the running snap animation
  const onT = tuck ? TUCK_ON : ON
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', () => {
    if (!wrap.current) return
    const wrapTop = wrap.current.getBoundingClientRect().top
    const prev = raw.get()
    const t = clamp01((top - wrapTop) / (window.innerHeight * length))
    raw.set(t)

    if (Math.abs(t - prev) > 0.5) {
      // a jump (e.g. a menu link under the curtain): set the state outright
      snap.current?.stop()
      committed.current = t > onT
      snapped.jump(committed.current ? 1 : 0)
      return
    }

    // bistable both ways: going down it commits past onT; going back up it
    // snaps back once you've reversed past 1 - onT. Between, it holds.
    let want = committed.current
    if (!committed.current && t > prev && t > onT) want = true
    if (committed.current && t < prev && t < 1 - onT) want = false
    if (want !== committed.current) {
      committed.current = want
      snap.current?.stop()
      snap.current = animate(snapped, want ? 1 : 0, SNAP)
    }
  })

  const draw = () => {
    const W = window.innerWidth
    const H = window.innerHeight
    const o = originOf(origin)
    // far enough to reach the furthest corner from the origin
    const R = Math.max(Math.hypot(o.x, o.y), Math.hypot(W - o.x, o.y), Math.hypot(o.x, H - o.y), Math.hypot(W - o.x, H - o.y)) * 1.02
    // the committed snap, bounded by two safety ramps so a fast scroll can never
    // expose an edge: forced to finish over the pin's last stretch, and forced
    // back to its start over the first stretch (for a release, fully ink again
    // just as the dark section above returns)
    const t = raw.get()
    const ramp = 1 - FORCE_FROM
    const e = clamp01(Math.min(Math.max(snapped.get(), (t - FORCE_FROM) / ramp), t / ramp))
    const cover = press ? e : 1 - e // 1 = screen fully ink
    // begins/ends as a disc the size of the menu item, hidden behind it
    const r = cover > 0.001 ? o.r0 + cover * (R - o.r0) : 0
    if (fill.current) fill.current.style.clipPath = `circle(${r}px at ${o.x}px ${o.y}px)`
    rings.current.forEach((el, i) => {
      if (!el) return
      const rr = r + (i + 1) * 46 * (1 - cover) + 8
      el.style.left = `${o.x}px`
      el.style.top = `${o.y}px`
      el.style.width = el.style.height = `${rr * 2}px`
      // ripples ease in over the first stretch instead of appearing at full strength
      const fadeIn = smooth(clamp01(cover / 0.18))
      el.style.opacity = String(cover > 0.001 && cover < 0.999 ? fadeIn * (1 - cover) * (0.5 / (i + 1)) : 0)
    })
  }
  useMotionValueEvent(snapped, 'change', draw)
  useMotionValueEvent(raw, 'change', draw)

  if (reduce) return children

  return (
    // data-pin-release: lets in-page links land *after* a release has played
    // (its first screen is fully ink until then) — see PageTransition.jsx
    <div
      ref={wrap}
      className="relative"
      data-pin-release={press ? undefined : length}
      style={tuck ? { marginTop: '-100svh' } : undefined}
    >
      <div ref={pin} className="sticky" style={{ top, zIndex: z }}>
        {children}
        {/* one viewport tall: the press covers the section's last screen, the
            release uncovers its first */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 z-10 h-[100svh] overflow-hidden ${
            press ? 'bottom-0' : 'top-0'
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => (rings.current[i] = el)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink"
              style={{ opacity: 0 }}
            />
          ))}
          <div
            ref={fill}
            className="absolute inset-0 bg-ink"
            // release starts fully covered so it meets the dark section seamlessly
            style={{ clipPath: press ? 'circle(0px at 50% 100%)' : 'circle(300vmax at 50% 100%)' }}
          />
        </div>
      </div>
      {/* the screen of scrolling the pin holds for */}
      <div aria-hidden="true" style={{ height: `${length * 100}svh` }} />
    </div>
  )
}
