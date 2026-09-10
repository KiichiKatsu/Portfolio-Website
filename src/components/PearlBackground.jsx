import { motion, useScroll, useTransform } from 'framer-motion'

/* Backdrop palette / structure. The *intensity* knobs (opacity, blend, paper
   grain) live in src/index.css :root — search "UI TUNING". */
const PEARL_GRADIENT =
  'linear-gradient(135deg, #F6E6CF 0%, #E7DCD8 26%, #D4BBD0 52%, #AA96A2 78%, #9189A1 100%)'

const SHEEN_BLOBS =
  'radial-gradient(40% 52% at 18% 12%, rgba(212,187,208,0.35), transparent 72%),' +
  'radial-gradient(44% 48% at 82% 20%, rgba(246,230,207,0.30), transparent 72%),' +
  'radial-gradient(50% 56% at 66% 88%, rgba(145,137,161,0.28), transparent 72%),' +
  'radial-gradient(40% 45% at 30% 74%, rgba(170,150,162,0.26), transparent 72%)'

// Top-down frost: dense behind the nav, gone by the bottom of the viewport.
// Alpha stops scale off --bg-frost-top so one variable drives the whole ramp.
const FROST_GRADIENT =
  'linear-gradient(to bottom,' +
  ' rgba(255,255,255, var(--bg-frost-top)) 0%,' +
  ' rgba(255,255,255, calc(var(--bg-frost-top) * 0.60)) 14%,' +
  ' rgba(255,255,255, calc(var(--bg-frost-top) * 0.34)) 32%,' +
  ' rgba(255,255,255, calc(var(--bg-frost-top) * 0.16)) 52%,' +
  ' rgba(255,255,255, calc(var(--bg-frost-top) * 0.05)) 76%,' +
  ' rgba(255,255,255, 0) 100%)'

// Dormant crumpled-paper grain (opacity driven by --paper-opacity, default 0).
const svgDataUri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`
const CRUMPLE = svgDataUri(
  `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'>
     <filter id='c'>
       <feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='4' seed='7' stitchTiles='stitch' result='n'/>
       <feColorMatrix in='n' type='saturate' values='0' result='d'/>
       <feComponentTransfer in='d'>
         <feFuncR type='gamma' amplitude='1' exponent='1.6'/>
         <feFuncG type='gamma' amplitude='1' exponent='1.6'/>
         <feFuncB type='gamma' amplitude='1' exponent='1.6'/>
       </feComponentTransfer>
     </filter>
     <rect width='100%' height='100%' filter='url(#c)'/>
   </svg>`,
)

/**
 * Fixed, full-viewport iridescent backdrop. The muted palette drifts as the
 * page scrolls; a blurred sheen sits under a milky frosted-glass veil, plus a
 * top-down frost cap. `isolate` keeps the blend modes compositing within this
 * layer only.
 */
export default function PearlBackground() {
  const { scrollYProgress } = useScroll()
  const basePos = useTransform(scrollYProgress, [0, 1], ['0% 0%', '100% 100%'])

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
          opacity: 'var(--bg-pearl-strength)',
        }}
      />

      {/* Iridescent sheen, blurred into the glass. Oversized so the blur's
          soft edges fall outside the viewport. */}
      <div
        className="absolute -inset-32 mix-blend-soft-light"
        style={{
          backgroundImage: SHEEN_BLOBS,
          filter: 'blur(64px)',
          opacity: 'var(--bg-sheen-opacity)',
        }}
      />

      {/* Frosted-glass matte — all over */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(255,255,255, var(--bg-frost-veil))' }}
      />

      {/* Frost gradient — frosted behind the nav, gone by the bottom */}
      <div className="absolute inset-0" style={{ backgroundImage: FROST_GRADIENT }} />

      {/* Crumpled-paper grain — dormant unless --paper-opacity is raised */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${CRUMPLE}")`,
          backgroundSize: 'cover',
          opacity: 'var(--paper-opacity)',
          mixBlendMode: 'var(--paper-blend)',
        }}
      />
    </div>
  )
}
