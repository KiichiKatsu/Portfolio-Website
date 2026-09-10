import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PageTransitionProvider } from './components/PageTransition.jsx'
import PearlBackground from './components/PearlBackground.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CardStack, { CARD_IDS } from './components/CardStack.jsx'
import UnderConstruction from './components/UnderConstruction.jsx'
import HomePage from './pages/HomePage.jsx'
import HardwarePage from './pages/HardwarePage.jsx'
import DesignPage from './pages/DesignPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'

// Routes whose page is a locked, single-screen vertical carousel.
const CAROUSEL_ROUTES = ['/hardware', '/design', '/experience']

export default function App() {
  const location = useLocation()
  const locked = CAROUSEL_ROUTES.includes(location.pathname)

  // Business-card state lives here so the toggle can repopulate it.
  const [cardsOpen, setCardsOpen] = useState(false)
  const [cardIds, setCardIds] = useState(CARD_IDS)

  const openCards = useCallback(() => {
    setCardIds([...CARD_IDS]) // always spawn the full set
    setCardsOpen(true)
  }, [])
  const toggleCards = useCallback(
    () => (cardsOpen ? setCardsOpen(false) : openCards()),
    [cardsOpen, openCards],
  )
  const removeCard = useCallback(
    (id) => setCardIds((prev) => prev.filter((x) => x !== id)),
    [],
  )

  // close the deck once the last card is trashed
  useEffect(() => {
    if (cardsOpen && cardIds.length === 0) setCardsOpen(false)
  }, [cardsOpen, cardIds])

  // route change: tidy the cards, reset scroll, toggle the page lock
  useEffect(() => {
    setCardsOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('route-locked', locked)
    return () => document.documentElement.classList.remove('route-locked')
  }, [locked])

  return (
    <PageTransitionProvider>
      <div className="relative flex min-h-dvh flex-col">
        <PearlBackground />
        <Nav cardsOpen={cardsOpen} onToggleCards={toggleCards} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!locked && <Footer />}

        <UnderConstruction />

        <AnimatePresence>
          {cardsOpen && (
            <CardStack key="cardstack" ids={cardIds} onRemove={removeCard} />
          )}
        </AnimatePresence>
      </div>
    </PageTransitionProvider>
  )
}
