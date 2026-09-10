import CarouselCard from './CarouselCard.jsx'

/**
 * Vertical carousel — the ONLY scrolling element on a carousel page.
 * Pure native CSS scroll-snap (no JS scroll hijack), so on macOS/Safari the
 * trackpad's LRA fires its snap haptic automatically.
 *
 *   - scroll-snap-type: y mandatory   → always lands on a card
 *   - scroll-snap-align: center        → card centres in the viewport
 *   - scroll-snap-stop: always         → one deliberate flick = one card
 *   - --snap-gap (index.css)           → scroll distance between cards = "weight"
 */
export default function Carousel({ items, label }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
      style={{
        scrollSnapType: 'y mandatory',
        scrollPadding: 'var(--snap-scroll-padding)',
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="flex min-h-full items-center justify-center px-5 sm:px-6"
          style={{
            scrollSnapAlign: 'center',
            scrollSnapStop: 'always',
            paddingTop: 'var(--snap-gap)',
            paddingBottom: 'var(--snap-gap)',
          }}
        >
          <CarouselCard {...item} />
        </div>
      ))}
    </div>
  )
}
