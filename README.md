# Portfolio Website

Personal website and PhD portfolio for Kiichiro Tatsuzawa.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · React Router 7 (HashRouter) ·
Framer Motion · lucide-react
**Deploy:** GitHub Pages (`gh-pages` branch) at
<https://kiichikatsu.github.io/Portfolio-Website/>

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/Portfolio-Website/
```

> This machine has a user-local Node install at `~/.local/node`. If `npm` is
> not found, add it to your shell:
> `echo 'export PATH="$HOME/.local/node/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc`
> (or install Node your own way — nvm, Homebrew, the official pkg).

## Build & deploy

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
npm run deploy     # builds, then pushes dist/ to the gh-pages branch
```

`predeploy` runs the build automatically before `deploy`.

## Project structure

```
index.html            Vite entry
vite.config.js         base path (/Portfolio-Website/) + React + Tailwind plugins
src/
  main.jsx             React root + <HashRouter>
  index.css            Tailwind import + design tokens (@theme)
  App.jsx              layout shell + <Routes>
  data/content.js      all editable copy: profile, research, hardware, awards
  pages/               HomePage, HardwarePage, DesignPage, ExperiencePage
  components/
    PageTransition.jsx  <PageTransitionProvider> + <TransitionLink> (wipe/curtain)
    Nav, Hero, Research, Hardware, DesignPortfolio, Experience, Awards,
    Section, Carousel, CarouselCard, CardStack, PearlBackground, Footer
  assets/              images, logos, SVGs (imported by components)
public/                favicon, Resume.pdf, logos, robots.txt (copied as-is)
```

## Routing & page transitions

Routes: `/` (Home — hero, quote, Research, Awards), `/hardware`, `/design`,
`/experience`. `HashRouter` keeps deep links working on GitHub Pages without a
`404.html` redirect.

Nav links use `<TransitionLink>` (in `components/PageTransition.jsx`). Cross-page
clicks run a two-phase cinematic transition: an ink-black sheet wipes in from the
right, the route swaps underneath while covered, then the sheet splits down the
middle and opens like curtains. Same-page targets (Research / Awards on Home)
just smooth-scroll. Tune timing via `WIPE`, `CURTAIN`, `HOLD_MS` at the top of
that file.

## Editing content

Copy lives in [`src/data/content.js`](src/data/content.js) — update the
`profile`, `research`, `hardware`, and `awards` exports there. Replace the
"Photo" / "Image" placeholder blocks in the components with real assets from
`src/assets/`.
