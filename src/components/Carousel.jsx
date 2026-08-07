import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const displayImages = images.length > 0 ? images : [
    { id: 1, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=600&fit=crop', title: 'Abstract Sound' },
    { id: 2, url: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=1200&h=600&fit=crop', title: 'Visual Waves' },
    { id: 3, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop', title: 'Digital Canvas' },
  ]

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, displayImages.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % displayImages.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + displayImages.length) % displayImages.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
      <div className="relative w-full h-full">
        {displayImages.map((image, idx) => (
          <motion.div
            key={image.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === current ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onClick={() => setAutoPlay(false)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
            
            <motion.div
              className="absolute bottom-8 left-8 right-8"
              initial={{ opacity: 0, y: 20 }}
              animate={idx === current ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{image.title}</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-blue-500/20 hover:bg-blue-500/40 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        ← 
      </motion.button>

      <motion.button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-blue-500/20 hover:bg-blue-500/40 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        →
      </motion.button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {displayImages.map((_, idx) => (
          <motion.button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? 'bg-blue-400 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 text-sm text-blue-400 bg-dark/40 backdrop-blur-sm px-3 py-1 rounded-full">
        {autoPlay ? '▶ Auto' : '⏸ Paused'}
      </div>
    </div>
  )
}
