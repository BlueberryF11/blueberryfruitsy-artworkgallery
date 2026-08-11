import { motion } from 'framer-motion'
import { useGalleryStore } from '../store/galleryStore'

export default function Sitemap() {
  const { collections } = useGalleryStore()
  const artworks = collections.flatMap((collection) =>
    (collection.images || []).map((image) => ({ ...image, collection: collection.name }))
  )

  const pages = [
    { name: 'Home', path: '/', description: 'The main page.' },
    { name: 'Gallery', path: '/gallery', description: 'All of the artwork.' },
    { name: 'Sitemap', path: '/sitemap', description: 'Every page and image link.' },
    ...collections.map((collection) => ({
      name: collection.name,
      path: `/gallery/${encodeURIComponent(collection.name.toLowerCase())}`,
      description: collection.description || `${collection.images?.length || 0} images`,
    })),
  ]

  return (
    <div className="w-full pt-24 pb-20">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold text-white mb-4">Sitemap</h1>
          <p className="text-xl text-gray-400">Pages, collections, and direct links to every image.</p>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((item) => (
            <a key={item.path} href={item.path} className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <span className="text-gray-500">↗</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">{item.description}</p>
              <p className="text-xs text-gray-600 mt-3 font-mono">{item.path}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Artwork links</h2>
            <p className="text-gray-400 mt-2">{artworks.length} image{artworks.length === 1 ? '' : 's'} currently in the archive.</p>
          </div>
          <a href="/gallery" className="text-blue-400 hover:text-blue-300">Open gallery →</a>
        </div>

        <div className="space-y-3">
          {artworks.map((image) => (
            <div key={image.id || image.url} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <img src={image.url} alt="" className="w-20 h-20 rounded-lg object-cover bg-black/20" loading="lazy" />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium truncate">{image.title || image.filename}</h3>
                <p className="text-sm text-gray-500">{image.collection}</p>
                <p className="text-xs text-gray-600 font-mono truncate mt-1">{image.url}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href={image.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-sm">Preview</a>
                <a href={image.url} download={image.filename || 'artwork'} className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 text-sm">Download</a>
              </div>
            </div>
          ))}
          {artworks.length === 0 && <div className="p-10 rounded-xl border border-dashed border-white/10 text-center text-gray-500">No artwork has been uploaded yet.</div>}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 pt-10 border-t border-white/10">
        <div className="flex flex-wrap gap-3">
          <a href="/" className="px-5 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20">← Home</a>
          <a href="/gallery" className="px-5 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-400">Gallery →</a>
        </div>
      </section>
    </div>
  )
}
