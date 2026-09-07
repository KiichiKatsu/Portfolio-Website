import { useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { MapPin, Mail, Trash2 } from 'lucide-react'
import LinkedinIcon from './icons/LinkedinIcon.jsx'
import OrcidIcon from './icons/OrcidIcon.jsx'
import logo from '../assets/logo.svg'
import { profile } from '../data/content.js'

const SHELL =
  'relative flex h-[10.3rem] w-[17rem] flex-col overflow-hidden rounded-2xl p-5 text-white ring-1 ring-white/10 sm:h-[11.4rem] sm:w-80 sm:p-6'

const INK_BG =
  'radial-gradient(130% 130% at 0% 0%, #2a2a30 0%, #161618 46%, #0c0c0e 100%)'
const INK_SHADOW =
  '0 30px 60px -18px rgba(0,0,0,0.55), 0 10px 24px -10px rgba(0,0,0,0.45)'

// Two cards: identity + contact.
const CARDS = [
  {
    id: 'profile',
    render: () => (
      <>
        <img
          src={logo}
          alt=""
          className="absolute right-5 top-5 h-5 w-5 opacity-70 brightness-0 invert sm:right-6 sm:top-6"
        />
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
          Business Card
        </p>
        <h3 className="mt-auto font-serif text-[1.6rem] leading-none text-white">
          {profile.name}
        </h3>
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
          {profile.role}
        </p>
        <p className="mt-1 text-xs text-white/70">{profile.affiliation}</p>
      </>
    ),
  },
  {
    id: 'contact',
    render: () => (
      <>
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
          Contact
        </p>
        <ul className="mt-auto space-y-2 text-xs text-white/75">
          <li className="flex items-center gap-2.5">
            <Mail className="h-3.5 w-3.5 shrink-0 text-white/45" />
            <span className="truncate">{profile.links.email}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <LinkedinIcon className="h-3.5 w-3.5 shrink-0 text-white/45" />
            <span className="truncate">in/kiichiro-tatsuzawa</span>
          </li>
          <li className="flex items-center gap-2.5">
            <OrcidIcon className="h-3.5 w-3.5 shrink-0 text-white/45" />
            <span className="truncate">0000-0000-0000-0000</span>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-white/45" />
            <span className="truncate">{profile.location}</span>
          </li>
        </ul>
      </>
    ),
  },
]

function computeBase(index) {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  const h = typeof window !== 'undefined' ? window.innerHeight : 800
  const small = w < 640
  const cw = small ? 272 : 320
  const ch = small ? 165 : 182
  const cx = w / 2 - cw / 2
  const cy = Math.max(84, h * 0.4 - ch / 2)
  // index 0 = front card (on top), nudged down-right; index 1 = behind, up-left
  return index === 0
    ? { x: cx + 15, y: cy + 13, rot: 4, delay: 0.05 }
    : { x: cx - 15, y: cy - 11, rot: -5, delay: 0 }
}

function DraggableCard({
  index,
  data,
  reduced,
  trashRef,
  onActive,
  onArmed,
  onRemove,
}) {
  const base = useRef(computeBase(index)).current

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = reduced
    ? { stiffness: 700, damping: 42, mass: 1 }
    : { stiffness: 330, damping: 30, mass: 1.15 }
  const xs = useSpring(x, spring)
  const ys = useSpring(y, spring)
  const tilt = useTransform(useVelocity(xs), [-1600, 1600], [-11, 11], {
    clamp: true,
  })
  const tiltS = useSpring(tilt, { stiffness: 180, damping: 20 })

  const paintRef = useRef(null)
  const armedRef = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [trashing, setTrashing] = useState(false)

  const overTrash = () => {
    const t = trashRef.current?.getBoundingClientRect()
    const c = paintRef.current?.getBoundingClientRect()
    if (!t || !c) return false
    const px = c.left + c.width / 2
    const py = c.top + c.height / 2
    const pad = 40
    return (
      px >= t.left - pad &&
      px <= t.right + pad &&
      py >= t.top - pad &&
      py <= t.bottom + pad
    )
  }

  const handleStart = () => {
    setDragging(true)
    onActive(1)
  }

  const handleDrag = () => {
    const o = overTrash()
    if (o !== armedRef.current) {
      armedRef.current = o
      onArmed(o)
    }
  }

  const handleEnd = () => {
    setDragging(false)
    onActive(-1)
    if (armedRef.current || overTrash()) {
      armedRef.current = false
      onArmed(false)
      setTrashing(true)
      onActive(1) // keep the bin on screen while the card flies in
      const t = trashRef.current?.getBoundingClientRect()
      const c = paintRef.current?.getBoundingClientRect()
      if (t && c) {
        const opts = { type: 'spring', stiffness: 220, damping: 26 }
        animate(x, x.get() + (t.left + t.width / 2 - (c.left + c.width / 2)), opts)
        animate(y, y.get() + (t.top + t.height / 2 - (c.top + c.height / 2)), opts)
      }
      window.setTimeout(() => {
        onActive(-1)
        onRemove(data.id)
      }, 320)
    }
  }

  const z = dragging || trashing ? 140 : 120 - index

  return (
    <>
      {/* paint layer — spring-lagged, non-interactive */}
      <motion.div
        style={{ x: xs, y: ys, left: base.x, top: base.y, zIndex: z }}
        className="pointer-events-none fixed"
      >
        <motion.div style={{ rotate: tiltS }}>
          <motion.div
            ref={paintRef}
            initial={{ opacity: 0, scale: 0.82, rotate: base.rot, y: -18 }}
            animate={
              trashing
                ? { opacity: 0, scale: 0.05, rotate: base.rot + 35, y: 0 }
                : {
                    opacity: 1,
                    scale: dragging ? 1.04 : 1,
                    rotate: base.rot,
                    y: 0,
                  }
            }
            transition={
              trashing
                ? { duration: 0.3, ease: [0.4, 0, 1, 1] }
                : {
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    delay: base.delay,
                  }
            }
            className={SHELL}
            style={{ backgroundImage: INK_BG, boxShadow: INK_SHADOW }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.07] to-transparent" />
            {data.render()}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* interaction layer — 1:1 with the cursor, invisible */}
      {!trashing && (
        <motion.div
          drag
          dragMomentum
          dragTransition={
            reduced
              ? { power: 0, timeConstant: 0 }
              : {
                  power: 0.3,
                  timeConstant: 360,
                  bounceStiffness: 180,
                  bounceDamping: 22,
                }
          }
          onDragStart={handleStart}
          onDrag={handleDrag}
          onDragEnd={handleEnd}
          style={{
            x,
            y,
            left: base.x,
            top: base.y,
            zIndex: dragging ? 141 : 122 - index,
          }}
          className="pointer-events-auto fixed h-[10.3rem] w-[17rem] cursor-grab touch-none opacity-0 active:cursor-grabbing sm:h-[11.4rem] sm:w-80"
        />
      )}
    </>
  )
}

export default function CardStack({ onEmpty }) {
  const reduced = useReducedMotion()
  const [cards, setCards] = useState(() => CARDS.map((c) => c.id))
  const [active, setActive] = useState(0)
  const [armed, setArmed] = useState(false)
  const trashRef = useRef(null)

  const bumpActive = (d) => setActive((n) => Math.max(0, n + d))

  const removeCard = (id) =>
    setCards((cs) => {
      const next = cs.filter((c) => c !== id)
      if (next.length === 0) onEmpty?.()
      return next
    })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      {cards.map((id) => {
        const index = CARDS.findIndex((c) => c.id === id)
        return (
          <DraggableCard
            key={id}
            index={index}
            data={CARDS[index]}
            reduced={reduced}
            trashRef={trashRef}
            onActive={bumpActive}
            onArmed={setArmed}
            onRemove={removeCard}
          />
        )
      })}

      <AnimatePresence>
        {active > 0 && (
          <motion.div
            key="trash"
            ref={trashRef}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: armed ? 1.18 : 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="fixed bottom-4 left-4 z-[150] flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-white/10 sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
            style={{
              backgroundImage: armed
                ? 'radial-gradient(130% 130% at 0% 0%, #7a1f1f 0%, #3a1212 100%)'
                : INK_BG,
              boxShadow: INK_SHADOW,
            }}
          >
            <Trash2
              className={`h-6 w-6 transition-colors ${
                armed ? 'text-white' : 'text-white/65'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
