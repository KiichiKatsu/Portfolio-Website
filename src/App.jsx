import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PageTransitionProvider } from './components/PageTransition.jsx'
import ShaderBackground from './components/ShaderBackground.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import FloatMenu from './components/FloatMenu.jsx'
import HapticCursor from './components/HapticCursor.jsx'
import CardStack, { CARD_IDS } from './components/CardStack.jsx'
import UnderConstruction from './components/UnderConstruction.jsx'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  const location = useLocation()

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

  // route change: tidy the cards, reset scroll
  useEffect(() => {
    setCardsOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <PageTransitionProvider>
      <div
        className="relative flex min-h-dvh flex-col"
        style={{ paddingBottom: 'var(--float-h)' }}
      >
        <ShaderBackground />
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />

        <FloatMenu cardsOpen={cardsOpen} onToggleCards={toggleCards} />

        <UnderConstruction />

        <HapticCursor />

        <AnimatePresence>
          {cardsOpen && (
            <CardStack key="cardstack" ids={cardIds} onRemove={removeCard} />
          )}
        </AnimatePresence>
      </div>
    </PageTransitionProvider>
  )
}
