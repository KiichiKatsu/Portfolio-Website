import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import LinkedinIcon from './icons/LinkedinIcon.jsx'
import OrcidIcon from './icons/OrcidIcon.jsx'
import { profile } from '../data/content.js'

const socials = [
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon, external: true },
  { href: profile.links.orcid, label: 'ORCID', Icon: OrcidIcon, external: true },
  { href: `mailto:${profile.links.email}`, label: 'Email', Icon: Mail, external: false },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-5xl px-5 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 md:pb-24 md:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid gap-8 sm:gap-10 md:grid-cols-[200px_1fr] md:gap-14"
      >
        {/* Portrait placeholder */}
        <div className="mx-auto w-28 sm:w-36 md:mx-0 md:w-full">
          <div className="aspect-square w-full overflow-hidden rounded-full border border-white/60 bg-white/50 shadow-[0_18px_40px_-20px_rgba(30,30,40,0.25)] backdrop-blur-sm">
            <div className="flex h-full w-full select-none items-center justify-center text-[10px] uppercase tracking-widest text-ink/30 sm:text-xs">
              Photo
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
            {profile.role}
          </p>
          <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {profile.affiliation} · {profile.location}
          </p>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:mt-6 sm:text-base">
            {profile.summary}
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
            {socials.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-2 text-[13px] text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper sm:px-4 sm:text-sm"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
