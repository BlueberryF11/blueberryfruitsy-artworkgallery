import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useGalleryStore } from './store/galleryStore'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Sitemap from './pages/Sitemap'
import './index.css'

function App() {
  const { isDarkMode, initServer } = useGalleryStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    initServer().then(() => setIsReady(true))
  }, [])

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Router>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark">
          {isReady ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery/:collection?" element={<Gallery />} />
              <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
        </main>
      </Router>
    </div>
  )
}

export default App
