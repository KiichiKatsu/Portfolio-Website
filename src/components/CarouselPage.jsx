import Carousel from './Carousel.jsx'

/**
 * A carousel page: everything is pinned to the viewport below the nav — the
 * heading and all chrome stay fixed — and only the <Carousel> track scrolls.
 * The route lock (html.route-locked, set in App.jsx) stops the page itself
 * from scrolling at all.
 */
export default function CarouselPage({ id, eyebrow, title, items, label }) {
  return (
    <section
      id={id}
      className="fixed inset-x-0 bottom-0 z-0 flex flex-col"
      style={{ top: 'var(--nav-h)' }}
    >
      <div className="mx-auto w-full max-w-5xl shrink-0 px-5 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-8">
        {eyebrow && (
          <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl leading-[1.5] text-ink sm:text-3xl md:text-4xl">
          {/* digital-highlight look: dark grey marker, white text */}
          <span className="box-decoration-clone bg-ink px-0 py-1 text-white">
            {title}
          </span>
        </h2>
      </div>

      <Carousel items={items} label={label} />
    </section>
  )
}
