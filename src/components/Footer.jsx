import logo from '../assets/logo.svg'
import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-center sm:px-6 sm:py-12">
        <img src={logo} alt="" className="h-7 w-7 opacity-80" />
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite &
          Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
