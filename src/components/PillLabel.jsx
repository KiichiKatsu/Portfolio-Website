// A menu label plus the full stop that appears when it's highlighted
// ("Awards."). The stop is the font's real period, enlarged, so it reads as
// punctuation — sitting on the baseline right after the word. The label and
// stop are one inline run: the links are flex boxes, and as separate flex
// items the stop would be centred vertically instead of on the baseline.
// `hidden` renders the stop invisibly on the real link so its width is always
// reserved and labels never shift when the highlight arrives.
export default function PillLabel({ label, hidden = false }) {
  return (
    <span>
      {label}
      <span aria-hidden="true" className={`text-[1.45em] leading-[0] ${hidden ? 'opacity-0' : ''}`}>
        .
      </span>
    </span>
  )
}
