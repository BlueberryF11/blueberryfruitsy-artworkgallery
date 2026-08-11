import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Gallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64 rounded-xl border border-blue-500/20 bg-blue-500/5 text-gray-400">
        Nothing here yet.
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {images.map((image) => (
          <motion.article
            key={image.id || image.url}
            className="group"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
          >
            <button
              type="button"
              className="block w-full text-left cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64 rounded-xl overflow-hidden bg-black/20 border border-white/10 hover:border-blue-500/50 transition-all">
                <img
                  src={image.url}
                  alt={image.title || image.filename || 'Artwork'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-12">
                  <h3 className="text-lg font-semibold text-white">
                    {image.title || image.filename || 'Artwork'}
                  </h3>
                </div>
              </div>
            </button>

            <div className="flex gap-2 mt-2">
              <a
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={(event) => event.stopPropagation()}
              >
                Open
              </a>
              <a
                href={image.url}
                download={image.filename || 'artwork'}
                className="text-xs text-gray-400 hover:text-white"
                onClick={(event) => event.stopPropagation()}
              >
                Download
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh]"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title || selectedImage.filename || 'Artwork'}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-white text-2xl font-bold">
                {selectedImage.title || selectedImage.filename || 'Artwork'}
              </h2>
              <div className="flex gap-3">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  Open original
                </a>
                <a
                  href={selectedImage.url}
                  download={selectedImage.filename || 'artwork'}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400"
                >
                  Download
                </a>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
