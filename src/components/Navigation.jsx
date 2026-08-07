import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGalleryStore } from '../store/galleryStore'

export default function Navigation() {
  const { isDarkMode, toggleDarkMode } = useGalleryStore()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Sitemap', href: '/sitemap' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-md border-b border-blue-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🍓 Blueberry Fruitsy
          </motion.a>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>

            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
            </motion.button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
