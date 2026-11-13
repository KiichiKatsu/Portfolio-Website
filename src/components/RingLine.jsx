import { motion, useReducedMotion } from 'framer-motion'

// A hairline that "rings down" when it scrolls into view: it starts as a
// damped oscillation and a lightly damped spring settles it flat, overshooting
// a few times on the way — like an actuator after a tap. The site's divider
// motif (hero, every section header, contact).
const wave = (amp) => {
  let d = ''
  for (let x = 0; x <= 1000; x += 10) {
    const y = 8 + amp * Math.exp(-x / 220) * Math.sin((x / 1000) * Math.PI * 2 * 16)
    d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(2)} `
  }
  return d.trim()
}
const RINGING = wave(7)
const FLAT = wave(0)

export default function RingLine({ className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 16"
      preserveAspectRatio="none"
      className={`block h-4 w-full overflow-visible ${className}`}
    >
      <motion.path
        d={FLAT}
        initial={reduce ? false : { d: RINGING, opacity: 0 }}
        whileInView={{ d: FLAT, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          d: { type: 'spring', stiffness: 140, damping: 5, mass: 1, delay },
          opacity: { duration: 0.3, delay },
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
