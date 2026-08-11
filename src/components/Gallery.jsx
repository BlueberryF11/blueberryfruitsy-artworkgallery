import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Gallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

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

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64 rounded-xl border border-blue-500/20 bg-blue-500/5 text-gray-400">
        No artwork has been uploaded to this collection yet.
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image) => (
          <motion.div
            key={image.id || image.url}
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
                alt={image.title || image.filename || 'Artwork'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {image.title || image.filename || 'Artwork'}
                </h3>
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
              alt={selectedImage.title || selectedImage.filename || 'Artwork'}
              className="w-full rounded-xl"
            />
            <motion.h2 className="text-white text-2xl font-bold mt-4">
              {selectedImage.title || selectedImage.filename || 'Artwork'}
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
