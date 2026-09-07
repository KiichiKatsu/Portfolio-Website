import { motion, useScroll, useTransform } from 'framer-motion'

/* ┌──────────────────────────────────────────────────────────────────────┐
   │  PEARLESCENT BACKDROP — tune here                                     │
   │                                                                      │
   │  PEARL_GRADIENT    muted iridescent palette                          │
   │  PEARL_STRENGTH    opacity of that gradient over the paper (0–1).    │
   │                    lower = softer / more washed-out                  │
   │  SHEEN_BLOBS       gentle iridescent light, blurred + soft-light     │
   │  SHEEN_OPACITY     how present that sheen is (0–1)                    │
   │  FROST_VEIL        all-over milky "frosted glass" amount (0–0.3ish)   │
   │  FROST_TOP         frost opacity at the very top edge — the gradient  │
   │                    spans the whole viewport and fades completely to   │
   │                    nothing by the bottom.                             │
   └──────────────────────────────────────────────────────────────────────┘ */
const PEARL_GRADIENT =
  'linear-gradient(135deg, #F6E6CF 0%, #E7DCD8 26%, #D4BBD0 52%, #AA96A2 78%, #9189A1 100%)'
const PEARL_STRENGTH = 0.1

const SHEEN_BLOBS =
  'radial-gradient(40% 52% at 18% 12%, rgba(212,187,208,0.35), transparent 72%),' +
  'radial-gradient(44% 48% at 82% 20%, rgba(246,230,207,0.30), transparent 72%),' +
  'radial-gradient(50% 56% at 66% 88%, rgba(145,137,161,0.28), transparent 72%),' +
  'radial-gradient(40% 45% at 30% 74%, rgba(170,150,162,0.26), transparent 72%)'
const SHEEN_OPACITY = 0.7

const FROST_VEIL = 0.1
const FROST_TOP = 0.5

/**
 * Fixed, full-viewport iridescent backdrop. The muted palette drifts as the
 * page scrolls; a blurred sheen sits under a milky frosted-glass veil, plus a
 * top-down gradient that starts frosted behind the nav and fades completely to
 * nothing by the bottom of the viewport.
 * `isolate` keeps the blend modes compositing within this layer only.
 */
export default function PearlBackground() {
  const { scrollYProgress } = useScroll()
  const basePos = useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%'])

  const a = (n) => Number(n.toFixed(3))
  const frostLayers = {
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${FROST_TOP}) 0%, rgba(255,255,255,${a(
      FROST_TOP * 0.6,
    )}) 14%, rgba(255,255,255,${a(FROST_TOP * 0.34)}) 32%, rgba(255,255,255,${a(
      FROST_TOP * 0.16,
    )}) 52%, rgba(255,255,255,${a(FROST_TOP * 0.05)}) 76%, rgba(255,255,255,0) 100%)`,
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 isolate overflow-hidden"
    >
      {/* opaque paper base so the muted gradient stays light and blends composite */}
      <div className="absolute inset-0 bg-paper" />

      {/* Muted iridescent gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: PEARL_GRADIENT,
          backgroundSize: '230% 230%',
          backgroundPosition: basePos,
          opacity: PEARL_STRENGTH,
        }}
      />

      {/* Iridescent sheen, blurred into the glass. Oversized so the blur's
          soft edges fall outside the viewport. */}
      <div
        className="absolute -inset-32 mix-blend-soft-light"
        style={{
          backgroundImage: SHEEN_BLOBS,
          filter: 'blur(64px)',
          opacity: SHEEN_OPACITY,
        }}
      />

      {/* Frosted-glass matte — all over */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(255,255,255,${FROST_VEIL})` }}
      />

      {/* Frost gradient — frosted behind the nav, gone by the bottom */}
      <div className="absolute inset-0" style={frostLayers} />
    </div>
  )
}
