// Standardized carousel card, shared by every carousel.
//  - body: 16:9 placeholder, rounded-2xl, gradient fill, soft drop shadow
//  - top-right: minimalist pill filter tags on frosted glass
//  - below: detached subtitle / title / description block
export default function CarouselCard({ title, subtitle, blurb, tags = [] }) {
  return (
    <article
      data-card
      className="w-[85%] shrink-0 sm:w-[340px] md:w-[380px] lg:w-[400px]"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-[#e9e7f3] via-[#eef1f6] to-[#e6f2ea] shadow-[0_1px_2px_rgba(30,30,40,0.04),0_16px_36px_-16px_rgba(30,30,40,0.18)]">
        <div className="flex h-full w-full select-none items-center justify-center text-[11px] uppercase tracking-[0.25em] text-ink/25">
          Image
        </div>

        {tags.length > 0 && (
          <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/70 ring-1 ring-white/60 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        {subtitle && (
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            {subtitle}
          </p>
        )}
        <h3 className="mt-1 font-serif text-lg text-ink">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{blurb}</p>
      </div>
    </article>
  )
}
