import { motion } from 'framer-motion'
import Carousel from '../components/Carousel'
import Gallery from '../components/Gallery'
import { useGalleryStore } from '../store/galleryStore'

export default function Home() {
  const collections = useGalleryStore((state) => state.collections)
  const loading = useGalleryStore((state) => state.loading)

  const artwork = collections.flatMap((collection) =>
    (collection.images || []).map((image) => ({
      ...image,
      collection: collection.name,
    }))
  )

  const featured = artwork
    .filter((image) => image.featured === true)
    .slice(0, 6)

  const galleryPreview = artwork.slice(0, 8)

  const totalArtworks = artwork.length
  const totalCollections = collections.length

  const floatingShapes = [
    { id: 1, size: 200, duration: 8, delay: 0, x: -100, y: -100 },
    { id: 2, size: 300, duration: 10, delay: 2, x: 100, y: 50 },
    { id: 3, size: 150, duration: 12, delay: 4, x: -50, y: 200 },
    { id: 4, size: 250, duration: 9, delay: 1, x: 150, y: -50 },
  ]

  return (
    <div className="w-full pt-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape) => (
          <motion.div key={shape.id} className="absolute rounded-full blur-3xl opacity-10" style={{ width: shape.size, height: shape.size, background: shape.id % 2 === 0 ? 'radial-gradient(circle, #3b82f6, transparent)' : 'radial-gradient(circle, #a855f7, transparent)', left: `${shape.x}px`, top: `${shape.y}px` }} animate={{ x: [shape.x, shape.x + 50, shape.x], y: [shape.y, shape.y + 50, shape.y] }} transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} /></div>
        <motion.div className="relative text-center max-w-4xl mx-auto z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block mb-8" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}><div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold backdrop-blur-sm">Digital Art & Music</div></motion.div>
          <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Blueberry Fruitsy</motion.h1>
          <motion.p className="text-xl sm:text-2xl text-gray-300 mb-2 font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>Where Sound Meets Vision</motion.p>
          <motion.div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8 rounded-full" initial={{ width: 0 }} animate={{ width: 128 }} transition={{ delay: 0.6, duration: 0.8 }} />
          <motion.p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>My artwork, visual experiments, and the things I make to go along with my music.</motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <motion.a href="/gallery" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Explore Gallery</motion.a>
            <motion.a href="/sitemap" className="px-8 py-3 border border-blue-500/50 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>View Sitemap</motion.a>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-4">Featured Art</h2>
          <p className="text-gray-400 mb-12">Artwork I've chosen to feature.</p>
          {loading ? <div className="min-h-96 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400">Loading artwork...</div> : <Carousel images={featured} />}
        </motion.div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-4">Latest Artwork</h2>
          <p className="text-gray-400 mb-12">The artwork currently in my archive.</p>
          <Gallery images={galleryPreview} />
        </motion.div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto"><motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, staggerChildren: 0.2 }} viewport={{ once: true }}>
          {[{ number: totalArtworks, label: 'Artworks' }, { number: totalCollections, label: 'Collections' }, { number: '∞', label: 'Ideas' }].map((stat, idx) => (
            <motion.div key={idx} className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">{stat.number}</div><div className="text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div></div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-blue-500/5 to-transparent"><div className="max-w-4xl mx-auto text-center"><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}><h2 className="text-4xl font-bold text-white mb-6">Want to see everything?</h2><p className="text-gray-400 mb-8 text-lg">Browse the complete archive and explore each collection.</p><motion.a href="/gallery" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Open Full Gallery →</motion.a></motion.div></div></section>
    </div>
  )
}
