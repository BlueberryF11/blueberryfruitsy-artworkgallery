import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Gallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const displayImages = images.length > 0 ? images : [
    { id: 1, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', title: 'Sonic Waves' },
    { id: 2, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop', title: 'Digital Rhythm' },
    { id: 3, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', title: 'Abstract Motion' },
    { id: 4, url: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=400&h=400&fit=crop', title: 'Light & Sound' },
    { id: 5, url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop', title: 'Visual Synth' },
    { id: 6, url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop', title: 'Geometric Forms' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayImages.map((image) => (
          <motion.div
            key={image.id}
            className="group cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            <div
              className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-500/60 transition-all"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-white">{image.title}</h3>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-transparent group-hover:to-purple-500/20 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-dark/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full rounded-xl"
            />
            <motion.h2 className="text-white text-2xl font-bold mt-4">
              {selectedImage.title}
            </motion.h2>
            
            <motion.button
              className="absolute top-4 right-4 text-white text-3xl bg-dark/50 hover:bg-dark/80 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
