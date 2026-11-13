import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// How long each item stays active before auto-advancing (ms).
const DWELL_MS = 6000
const EASE = [0.22, 1, 0.36, 1]

/**
 * "Reads between the tabs" carousel (after diabrowser.com):
 *   - left:  numbered list; only the active item expands to show its blurb,
 *            with a thin progress line that fills, then advances to the next.
 *   - right: one large media panel that crossfades to the active item.
 * Click / focus an item to jump to it. Hovering the section pauses the timer
 * (the progress line freezes in place). Arrow keys move between items.
 * Autoplay is off when the user prefers reduced motion.
 */
export default function Carousel({ items, label, dark = false }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const tabRefs = useRef([])
  const panelId = useId() // unique per carousel — there are two on the Projects page

  const count = items.length
  const go = useCallback((i) => setActive(((i % count) + count) % count), [count])

  // Reset when the item set changes (route change between carousel pages).
  useEffect(() => setActive(0), [items])

  const onKeyDown = (e) => {
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? active + 1
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? active - 1
      : e.key === 'Home' ? 0
      : e.key === 'End' ? count - 1
      : null
    if (next === null) return
    e.preventDefault()
    const i = ((next % count) + count) % count
    go(i)
    tabRefs.current[i]?.focus()
  }

  const current = items[active]
  const autoplay = !reduceMotion && count > 1

  return (
    <div
      className="grid items-center gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
        {/* ── Media panel ─────────────────────────────────────────────── */}
        <div className="md:order-2">
          <div
            id={panelId}
            role="tabpanel"
            aria-label={current.title}
            className={`relative aspect-[4/3] overflow-hidden rounded-[10px] border ${dark ? 'border-white/10' : 'border-white/60'} bg-gradient-to-br from-[#e9e7f3] via-[#eef1f6] to-[#e6f2ea] shadow-[0_1px_2px_rgba(30,30,40,0.04),0_28px_60px_-24px_rgba(30,30,40,0.28)]`}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
              >
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full select-none items-center justify-center text-[11px] uppercase tracking-[0.25em] text-ink/25">
                    Image
                  </div>
                )}

                {current.tags?.length > 0 && (
                  <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5 sm:right-4 sm:top-4">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[4px] bg-white/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/70 ring-1 ring-white/60 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Numbered list ───────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="md:order-1"
        >
          {items.map((item, i) => {
            const isActive = i === active
            return (
              <div key={item.title}>
                <button
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(i)}
                  // sucks the cursor in like the buttons; "plain" = no ring, the
                  // title's marker is its highlight (see .carousel-title in index.css)
                  data-haptic="plain"
                  className={`group flex w-full items-baseline gap-4 py-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 ${dark ? 'focus-visible:ring-white/40' : 'focus-visible:ring-ink/30'} ${
                    isActive
                      ? dark ? 'text-white' : 'text-ink'
                      : dark ? 'text-white/35' : 'text-ink/35'
                  }`}
                >
                  <span className="w-6 shrink-0 font-mono text-xs tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg leading-snug sm:text-xl">
                    {/* digital-highlight marker: black when current, grey when hovered/held */}
                    <span className={`carousel-title ${dark ? 'carousel-title--dark' : ''}`}>{item.title}</span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-10">
                        {item.subtitle && (
                          <p className={`text-[11px] font-medium uppercase tracking-[0.18em] ${dark ? 'text-white/50' : 'text-muted'}`}>
                            {item.subtitle}
                          </p>
                        )}
                        <p className={`mt-1.5 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>
                          {item.blurb}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* progress line — its animationend drives auto-advance */}
                <div className={`relative h-px overflow-hidden ${dark ? 'bg-white/15' : 'bg-line'}`}>
                  {isActive && autoplay && (
                    <span
                      key={active}
                      className={`carousel-progress absolute inset-0 origin-left ${dark ? 'bg-white' : 'bg-ink'}`}
                      style={{
                        animationDuration: `${DWELL_MS}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}
