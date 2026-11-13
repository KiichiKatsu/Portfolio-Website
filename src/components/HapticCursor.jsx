import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   PSEUDO-HAPTIC CURSOR — tuning
   A web page can't drive a trackpad's motor, but it can fake force through
   vision: by changing how far the drawn cursor moves per unit of real hand
   movement (the control–display ratio), people *feel* pull and resistance.
   ═══════════════════════════════════════════════════════════════════════════ */
const H = {
  captureDist: 12, //   px outside a button's edge where it starts pulling you in
  escapeDist: 56, //    px you must drag past the edge before it lets go (the "fight")
  switchBias: 26, //    bistable hand-over between neighbours: another button only
  //                    takes the cursor once you're this many px closer to it than
  //                    to the one holding it — like one bubble swallowing another
  insideGain: 0.35, //  cursor travel per px of hand travel while over the button
  outsideGain: 0.12, // …and while straining past its edge (lower = heavier)
  pullMax: 12, //       px the button leans toward you as you pull away — while
  //                    held, this lean is the only visible sign of the strain
  // data-haptic-axis="x" targets (menus): full stickiness side to side, a
  // lighter version up and down
  escapeDistY: 24, //   px past the top/bottom edge before an x-axis button lets go
  pullMaxY: 4, //       px it leans up/down after you meanwhile
  followFree: 0.32, //  cursor easing when free (1 = glued to the pointer)
  followHeld: 0.16, //  cursor easing when captured — slower feels heavier
}

/* The highlight: ONE ring shared by every button. On a hand-over it doesn't
   fade out here and in there — it flows across: the edge on the side you're
   heading leads, the far edge trails, so the ring stretches over both buttons
   and then contracts onto the new one, absorbing the old highlight. */
const RING = {
  gap: 3, //            px between the button and its ring
  lead: 0.3, //         easing of the leading edge (higher = reaches out faster)
  trail: 0.13, //       easing of the trailing edge (lower = stretchier merge)
}

const SIZE = 12 // the dot never changes size
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/**
 * Replaces the native cursor (fine pointers only, motion allowed) with a dot
 * that is sucked into anything marked `data-haptic` and has to be dragged back
 * out. While held, the dot fades into the button and the shared ring outlines
 * it (`data-haptic="plain"` targets, like carousel items, use their own
 * highlight via `data-haptic-active` instead). Neighbours hand the cursor over
 * bistably: it stays with one until you're clearly closer to the next, then
 * jumps in one go and the ring flows across. While a button holds the cursor,
 * a click anywhere activates *it*, so what you see is always what you click.
 *
 * `data-haptic-axis="x"` (menus and link rows) keeps the full pull side to side
 * and a lighter one up and down: a small lean and a short hold before it lets go.
 */
export default function HapticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dot = dotRef.current
    const ring = ringRef.current
    if (!fine || reduce || !dot || !ring) return

    document.documentElement.classList.add('haptic-cursor')

    const P = { x: -200, y: -200 } // real pointer
    const C = { x: -200, y: -200 } // drawn cursor
    const pull = { x: 0, y: 0 }
    const G = { l: 0, t: 0, r: 0, b: 0, rad: 0 } // the ring's current box
    let ringOn = false
    let ringRadius = 0
    let held = null
    let shown = false
    // a press that didn't start on a held button is a drag (e.g. the contact
    // cards): no capturing until it's over, so nothing grabs the cursor mid-drag
    // and letting go can't click a button you happened to pass over
    let dragging = false
    let raf = 0

    // the button's resting box (its rect minus the lean we've applied)
    const box = (el) => {
      const r = el.getBoundingClientRect()
      const left = r.left - (el === held ? pull.x : 0)
      const top = r.top - (el === held ? pull.y : 0)
      return { cx: left + r.width / 2, cy: top + r.height / 2, hw: r.width / 2, hh: r.height / 2 }
    }
    // distance from the pointer to the box's edge (0 when inside)
    const edgeDist = (b) =>
      Math.hypot(Math.max(0, Math.abs(P.x - b.cx) - b.hw), Math.max(0, Math.abs(P.y - b.cy) - b.hh))

    const capture = (el) => {
      held = el
      el.dataset.hapticActive = ''
      el.style.transition = 'scale 0.15s ease-out'
      const cs = getComputedStyle(el)
      ring.style.borderColor = cs.getPropertyValue('--haptic-ring').trim() || cs.color
      ringRadius = (parseFloat(cs.borderTopLeftRadius) || 0) + RING.gap
      navigator.vibrate?.(6) // a real tick on phones/tablets that support it
    }
    // handOver: another button is taking the cursor — this one settles quickly
    // while the ring flows on to the next
    const release = (handOver = false) => {
      if (!held) return
      const el = held
      held = null
      pull.x = pull.y = 0
      delete el.dataset.hapticActive
      el.style.transition = handOver
        ? 'translate 0.16s ease-out, scale 0.16s ease-out'
        : 'translate 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), scale 0.2s ease-out'
      el.style.translate = '0px 0px'
      el.style.scale = '1'
      // the dot simply reappears where your hand is and fades in
      if (!handOver) {
        C.x = P.x
        C.y = P.y
      }
    }

    const drawRing = () => {
      const wants = held && held.dataset.haptic !== 'plain'
      if (wants) {
        const r = held.getBoundingClientRect() // includes the lean, so the ring leans too
        const T = { l: r.left - RING.gap, t: r.top - RING.gap, r: r.right + RING.gap, b: r.bottom + RING.gap }
        if (!ringOn) {
          // appearing from nothing: sit on the button and fade in, no travel
          Object.assign(G, T, { rad: ringRadius })
          ringOn = true
        } else {
          // flow towards the target: leading edges fast, trailing edges slow
          const dx = (T.l + T.r - G.l - G.r) / 2
          const dy = (T.t + T.b - G.t - G.b) / 2
          const kL = dx < -0.5 ? RING.lead : dx > 0.5 ? RING.trail : RING.lead
          const kR = dx > 0.5 ? RING.lead : dx < -0.5 ? RING.trail : RING.lead
          const kT = dy < -0.5 ? RING.lead : dy > 0.5 ? RING.trail : RING.lead
          const kB = dy > 0.5 ? RING.lead : dy < -0.5 ? RING.trail : RING.lead
          G.l += (T.l - G.l) * kL
          G.r += (T.r - G.r) * kR
          G.t += (T.t - G.t) * kT
          G.b += (T.b - G.b) * kB
          G.rad += (ringRadius - G.rad) * 0.25
        }
      } else {
        ringOn = false // stays where it was and just fades out
      }
      ring.style.transform = `translate3d(${G.l}px, ${G.t}px, 0)`
      ring.style.width = `${Math.max(0, G.r - G.l)}px`
      ring.style.height = `${Math.max(0, G.b - G.t)}px`
      ring.style.borderRadius = `${G.rad}px`
      ring.style.opacity = wants ? '1' : '0'
    }

    const tick = () => {
      if (dragging) {
        release()
        C.x = P.x
        C.y = P.y
        dot.style.transform = `translate3d(${C.x - SIZE / 2}px, ${C.y - SIZE / 2}px, 0)`
        dot.style.opacity = shown ? '1' : '0'
        drawRing()
        raf = requestAnimationFrame(tick)
        return
      }
      // nearest visible candidate other than the one holding the cursor
      let near = null
      let nearD = Infinity
      for (const el of document.querySelectorAll('[data-haptic]')) {
        if (el === held) continue
        const b = box(el)
        if (!b.hw || !b.hh) continue // display:none / collapsed
        if (el.closest('[data-haptic-off]')) continue // e.g. the hidden bottom bar
        const d = edgeDist(b)
        if (d < nearD) {
          near = el
          nearD = d
        }
      }

      if (held) {
        // gone, or hidden away (e.g. the bottom bar sliding out): let go
        const heldD = held.isConnected && !held.closest('[data-haptic-off]') ? edgeDist(box(held)) : Infinity
        // x-axis targets: the full fight sideways, a short sticky hold vertically
        let escaped = heldD > H.escapeDist
        if (held.isConnected && held.dataset.hapticAxis === 'x') {
          const b = box(held)
          const outX = Math.max(0, Math.abs(P.x - b.cx) - b.hw)
          const outY = Math.max(0, Math.abs(P.y - b.cy) - b.hh)
          escaped = outX > H.escapeDist || outY > H.escapeDistY
        }
        if (near && nearD < H.captureDist && nearD + H.switchBias < heldD) {
          // bistable switch: the neighbour has clearly won — hand over in one step
          release(true)
          capture(near)
        } else if (escaped) {
          release()
        }
      }
      if (!held && near && nearD < H.captureDist) capture(near)

      let tx = P.x
      let ty = P.y
      let ease = H.followFree
      if (held) {
        const b = box(held)
        const dx = P.x - b.cx
        const dy = P.y - b.cy
        const inX = clamp(dx, -b.hw, b.hw)
        const inY = clamp(dy, -b.hh, b.hh)
        // reduced control–display gain: the hand moves, the cursor barely does
        tx = b.cx + inX * H.insideGain + (dx - inX) * H.outsideGain
        ty = b.cy + inY * H.insideGain + (dy - inY) * H.outsideGain
        ease = H.followHeld
        // the button leans after you, harder the further you strain
        pull.x = clamp(inX * 0.06 + (dx - inX) * 0.22, -H.pullMax, H.pullMax)
        const maxY = held.dataset.hapticAxis === 'x' ? H.pullMaxY : H.pullMax
        pull.y = clamp(inY * 0.06 + (dy - inY) * 0.22, -maxY, maxY)
        held.style.translate = `${pull.x}px ${pull.y}px`
      }

      C.x += (tx - C.x) * ease
      C.y += (ty - C.y) * ease
      dot.style.transform = `translate3d(${C.x - SIZE / 2}px, ${C.y - SIZE / 2}px, 0)`
      // held: fade out into the button (opacity is transitioned in CSS)
      dot.style.opacity = shown && !held ? '1' : '0'
      drawRing()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      P.x = e.clientX
      P.y = e.clientY
      if (!shown) {
        C.x = P.x
        C.y = P.y
        shown = true
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget) {
        shown = false
        release()
      }
    }
    const onDown = () => {
      if (held) held.style.scale = '0.93'
      else dragging = true
    }
    const onUp = () => {
      if (held) held.style.scale = '1'
      dragging = false
    }
    // what you see is what you click: route clicks to the button holding the cursor
    const onClick = (e) => {
      if (held && !held.contains(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        held.click()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.addEventListener('click', onClick, true)

    return () => {
      cancelAnimationFrame(raf)
      release()
      document.documentElement.classList.remove('haptic-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] border-[1.5px] border-ink opacity-0 transition-[opacity,border-color] duration-200"
        style={{ width: 0, height: 0 }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1000] rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-200"
        style={{ width: SIZE, height: SIZE }}
      />
    </>
  )
}
