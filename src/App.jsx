import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PageTransitionProvider } from './components/PageTransition.jsx'
import PearlBackground from './components/PearlBackground.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CardStack from './components/CardStack.jsx'
import HomePage from './pages/HomePage.jsx'
import HardwarePage from './pages/HardwarePage.jsx'
import DesignPage from './pages/DesignPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'

export default function App() {
  const [cardsOpen, setCardsOpen] = useState(false)
  const location = useLocation()

  // on any route change: close the business cards and reset scroll
  // (the cinematic transition does its own scroll while covered; this only
  //  matters for browser back/forward)
  useEffect(() => {
    setCardsOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <PageTransitionProvider>
      <div className="relative flex min-h-dvh flex-col">
        <PearlBackground />
        <Nav
          cardsOpen={cardsOpen}
          onToggleCards={() => setCardsOpen((v) => !v)}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hardware" element={<HardwarePage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />

        <AnimatePresence>
          {cardsOpen && (
            <CardStack key="cardstack" onEmpty={() => setCardsOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </PageTransitionProvider>
  )
}
