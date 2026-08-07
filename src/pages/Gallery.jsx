import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useGalleryStore } from '../store/galleryStore'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
  const { collection } = useParams()
  const { collections } = useGalleryStore()

  const selectedCollection = collection
    ? collections.find((c) => c.name.toLowerCase() === collection.toLowerCase())
    : null

  return (
    <div className="w-full pt-24 pb-20">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            {selectedCollection ? selectedCollection.name : 'Full Gallery'}
          </h1>
          <p className="text-xl text-gray-400">
            {selectedCollection
              ? selectedCollection.description
              : 'Explore all collections and artworks'}
          </p>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.a
            href="/gallery"
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              !selectedCollection
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Works
          </motion.a>

          {collections.map((col) => (
            <motion.a
              key={col.name}
              href={`/gallery/${col.name.toLowerCase()}`}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCollection?.name === col.name
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {col.name}
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Gallery images={selectedCollection?.images || []} />
      </section>
    </div>
  )
}
