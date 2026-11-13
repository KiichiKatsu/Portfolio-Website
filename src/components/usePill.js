import { useEffect } from 'react'

// Pill motion — the same lead/trail stretch as the cursor's highlight ring:
// the edge on the side it's heading leads, the far edge trails behind.
const LEAD = 0.3
const TRAIL = 0.13

/**
 * One sliding highlight for a row of tiles (both menu bars).
 *
 *   rowRef  — the row: its direct children marked `data-tile="<key>"` are the
 *             real controls; it also contains the twin layer
 *   twinRef — an absolutely positioned copy of the row with the pill colours
 *             (inverted text), clipped here to the pill's shape so labels
 *             invert exactly where the pill covers them, mid-slide included.
 *             Give it `-inset-4 p-4` (bleed, more than the 12px max lean):
 *             its box must be bigger than the row, or a leaning pill gets
 *             sliced flat at the row's edge
 *   current — ref holding the key of the tile the pill rests on, or null for
 *             "only show while hovered / holding the cursor"
 *
 * The pill goes to the tile holding the haptic cursor, else the hovered one
 * (when the haptic cursor isn't running), else `current`. With nowhere to be
 * it fades out in place, and next time fades in on its target (no travel).
 * Each twin copy mirrors its tile's haptic lean so the layers never drift.
 */
export default function usePill({ rowRef, twinRef, current, hovered, radius = 6 }) {
  useEffect(() => {
    const row = rowRef.current
    const twin = twinRef.current
    if (!row || !twin) return
    const snap = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const G = { l: 0, t: 0, r: 0, b: 0 }
    let placed = false
    let raf = 0

    const tick = () => {
      const tiles = [...row.querySelectorAll(':scope > [data-tile]')]
      const twins = [...twin.children]

      tiles.forEach((el, i) => {
        const t = twins[i]
        if (!t) return
        t.style.translate = el.style.translate
        t.style.scale = el.style.scale
        t.style.transition = el.style.transition
      })

      const visible = (el) => el && el.offsetWidth > 0
      const hapticOn = document.documentElement.classList.contains('haptic-cursor')
      const held = tiles.find((el) => el.hasAttribute('data-haptic-active'))
      const resting = current?.current ? tiles.find((el) => el.dataset.tile === current.current) : null
      const target = [held, !hapticOn && hovered?.current, resting].find(visible) || null

      if (target) {
        // measure against the twin's (bled) box, not the row's
        const rr = twin.getBoundingClientRect()
        const r = target.getBoundingClientRect() // includes the lean
        const T = { l: r.left - rr.left, t: r.top - rr.top, r: r.right - rr.left, b: r.bottom - rr.top }
        if (!placed || snap) {
          Object.assign(G, T)
          placed = true
        } else {
          const dx = (T.l + T.r - G.l - G.r) / 2
          const dy = (T.t + T.b - G.t - G.b) / 2
          G.l += (T.l - G.l) * (dx > 0.5 ? TRAIL : LEAD)
          G.r += (T.r - G.r) * (dx < -0.5 ? TRAIL : LEAD)
          G.t += (T.t - G.t) * (dy > 0.5 ? TRAIL : LEAD)
          G.b += (T.b - G.b) * (dy < -0.5 ? TRAIL : LEAD)
        }
        const W = twin.offsetWidth
        const H = twin.offsetHeight
        twin.style.clipPath = `inset(${G.t}px ${W - G.r}px ${H - G.b}px ${G.l}px round ${radius}px)`
        twin.style.opacity = '1'
      } else {
        placed = false // fade out where it is; reappear on the next target
        twin.style.opacity = '0'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [rowRef, twinRef, current, hovered, radius])
}
