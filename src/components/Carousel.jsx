import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import CarouselCard from './CarouselCard.jsx'

const SPEED = 0.5 // px per animation frame
const IDLE_MS = 1500 // resume autoscroll this long after the last interaction

/**
 * Visual break between the last and first card. Doubles as a button: pressing
 * it snaps the track back to the start and re-arms the autoscroll.
 */
function LoopMarker({ onReset }) {
  return (
    <div className="relative flex w-16 shrink-0 items-center justify-center self-stretch sm:w-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent"
      />
      <button
        type="button"
        onClick={onReset}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Restart carousel from the beginning"
        title="Restart"
        className="relative flex items-center gap-1 rounded-full border border-line bg-white/70 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-muted backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
      >
        <RotateCcw className="h-3 w-3" />
        Loop
      </button>
    </div>
  )
}

/**
 * Full-bleed horizontal carousel with seamless infinite looping and inactivity
 * autoscroll (no buttons — drag, wheel, or touch to move it). The item list is
 * rendered twice, each copy capped with a LoopMarker; when scroll drifts a full
 * copy-width past centre it snaps back by exactly that width, landing on
 * identical pixels, so the loop is invisible except for the marker passing by.
 *
 * Autoscroll state is a single timestamp (`lastInteraction`) plus live DOM
 * checks — there are no interaction booleans that can wedge, so it always
 * resumes ~IDLE_MS after you stop touching it.
 */
export default function Carousel({ items, label }) {
  const scroller = useRef(null)
  const reduceMotion = useReducedMotion()

  const st = useRef({
    lastInteraction: 0,
    dragStartX: 0,
    dragStartLeft: 0,
    dragMoved: false,
    block: 0, // width of one [items + marker] copy
    inView: true,
    raf: 0,
  })

  const measure = useCallback(() => {
    const el = scroller.current
    if (el) st.current.block = el.scrollWidth / 2
  }, [])

  // Keep scrollLeft within (0.5·block, 1.5·block); every wrap is exactly one
  // block, which is a no-op visually.
  const normalize = useCallback(() => {
    const el = scroller.current
    const b = st.current.block
    if (!el || !b) return
    if (el.scrollLeft >= b * 1.5) el.scrollLeft -= b
    else if (el.scrollLeft <= b * 0.5) el.scrollLeft += b
  }, [])

  const bump = useCallback(() => {
    st.current.lastInteraction = performance.now()
  }, [])

  const resetLoop = useCallback(() => {
    const el = scroller.current
    if (!el) return
    st.current.lastInteraction = 0 // re-arm autoscroll immediately
    el.scrollTo({ left: st.current.block || 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    measure()
    el.scrollLeft = st.current.block || 1

    const ro = new ResizeObserver(() => {
      measure()
      const b = st.current.block
      if (b && (el.scrollLeft < 1 || el.scrollLeft > b * 2)) el.scrollLeft = b
    })
    ro.observe(el)

    const io = new IntersectionObserver(
      ([entry]) => {
        st.current.inView = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(el)

    const onScroll = () => normalize()
    const onKeyDown = (e) => {
      if (
        ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(
          e.key,
        )
      )
        bump()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('wheel', bump, { passive: true })
    el.addEventListener('touchstart', bump, { passive: true })
    el.addEventListener('touchmove', bump, { passive: true })
    el.addEventListener('keydown', onKeyDown)

    const tick = () => {
      const s = st.current
      const now = performance.now()
      const idle = now - s.lastInteraction > IDLE_MS
      const canScroll = el.scrollWidth - el.clientWidth > 8

      if (
        !reduceMotion &&
        canScroll &&
        idle &&
        s.inView &&
        !document.hidden
      ) {
        el.scrollLeft += SPEED
        normalize()
      }
      s.raf = requestAnimationFrame(tick)
    }
    st.current.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(st.current.raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('wheel', bump)
      el.removeEventListener('touchstart', bump)
      el.removeEventListener('touchmove', bump)
      el.removeEventListener('keydown', onKeyDown)
    }
  }, [measure, normalize, bump, reduceMotion])

  // --- desktop drag-to-scroll. "Am I dragging?" is answered by pointer
  //     capture + a live button check, so no flag can get stuck. ---
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return
    const el = scroller.current
    st.current.dragStartX = e.clientX
    st.current.dragStartLeft = el.scrollLeft
    st.current.dragMoved = false
    bump()
    el.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    const el = scroller.current
    if (!el || e.pointerType === 'touch') return
    if (!el.hasPointerCapture?.(e.pointerId)) return
    if (!(e.buttons & 1)) {
      // button released without a pointerup reaching us — end the drag
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
      return
    }
    const dx = e.clientX - st.current.dragStartX
    if (Math.abs(dx) > 3) st.current.dragMoved = true
    el.scrollLeft = st.current.dragStartLeft - dx
    bump()
  }
  const endDrag = (e) => {
    bump()
    try {
      scroller.current?.releasePointerCapture?.(e.pointerId)
    } catch {
      /* already released */
    }
  }
  const onClickCapture = (e) => {
    if (st.current.dragMoved) {
      e.preventDefault()
      e.stopPropagation()
      st.current.dragMoved = false
    }
  }

  const loop = [
    ...items.map((it) => ({ ...it, _k: `a-${it.title}` })),
    { _marker: true, _k: 'a-marker' },
    ...items.map((it) => ({ ...it, _k: `b-${it.title}` })),
    { _marker: true, _k: 'b-marker' },
  ]

  return (
    // break out of the page's max-width to span the whole viewport
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        ref={scroller}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar edge-fade flex cursor-grab gap-5 overflow-x-auto py-1 pl-[clamp(1.25rem,14vw,32rem)] pr-[clamp(1.25rem,14vw,32rem)] active:cursor-grabbing sm:gap-6"
      >
        {loop.map((entry) =>
          entry._marker ? (
            <LoopMarker key={entry._k} onReset={resetLoop} />
          ) : (
            <CarouselCard key={entry._k} {...entry} />
          ),
        )}
      </div>
    </div>
  )
}
