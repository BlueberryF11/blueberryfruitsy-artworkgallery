import { motion } from 'framer-motion'
import { useGalleryStore } from '../store/galleryStore'

export default function Sitemap() {
  const { collections } = useGalleryStore()

  const siteStructure = [
    {
      section: 'Main',
      items: [
        { name: 'Home', path: '/', description: 'Hero showcase with featured carousel' },
        { name: 'Gallery', path: '/gallery', description: 'Browse all artworks and collections' },
        { name: 'Sitemap', path: '/sitemap', description: 'Site navigation and structure' },
      ],
    },
    {
      section: 'Collections',
      items: collections.map((col) => ({
        name: col.name,
        path: `/gallery/${col.name.toLowerCase()}`,
        description: col.description,
      })),
    },
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="w-full pt-24 pb-20">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">Sitemap</h1>
          <p className="text-xl text-gray-400">
            Navigate through Blueberry Fruitsy's complete collection
          </p>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {siteStructure.map((section) => (
            <motion.div key={section.section} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500"></div>
                {section.section}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/60 transition-all"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-transparent group-hover:to-purple-500/20 transition-all duration-500" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">
                          →
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-gray-600 text-xs mt-4 font-mono">
                        {item.path}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 pt-16 border-t border-blue-500/20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[{ label: 'Total Pages', value: '3' }, { label: 'Collections', value: String(collections.length || '5') }, { label: 'Artworks', value: '100+' }, { label: 'Last Updated', value: 'Today' }].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-lg bg-blue-500/5 border border-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 pt-16 border-t border-blue-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Quick Navigation</h3>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="/"
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Home
            </motion.a>
            <motion.a
              href="/gallery"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Gallery →
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
