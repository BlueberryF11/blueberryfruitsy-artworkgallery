import { create } from 'zustand'

export const useGalleryStore = create((set) => ({
  serverUrl: null,
  artworks: [],
  collections: [],
  currentCollection: null,
  isDarkMode: true,
  loading: false,
  error: null,

  initServer: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/server-name.txt', { cache: 'no-store' })
      if (!response.ok) throw new Error('Could not find the image server configuration.')

      const serverUrl = (await response.text()).trim().replace(/\/$/, '')
      if (!serverUrl) throw new Error('The image server URL is empty.')

      set({ serverUrl })
      await useGalleryStore.getState().fetchCollections(serverUrl)
    } catch (err) {
      set({ error: err.message, collections: [] })
    } finally {
      set({ loading: false })
    }
  },

  fetchCollections: async (serverUrl) => {
    try {
      const response = await fetch(`${serverUrl}/collections.json`, { cache: 'no-store' })
      if (!response.ok) throw new Error(`Image server returned ${response.status}.`)

      const data = await response.json()
      if (!Array.isArray(data)) throw new Error('The image server returned invalid collection data.')

      const collections = data.map((collection) => ({
        ...collection,
        images: Array.isArray(collection.images)
          ? collection.images.map((image) => ({
              ...image,
              url: image.url?.startsWith('http')
                ? image.url
                : `${serverUrl}/${String(image.url || '').replace(/^\//, '')}`,
            }))
          : [],
      }))

      set({ collections, error: null })
    } catch (err) {
      console.warn('Could not fetch collections:', err)
      set({ collections: [], error: err.message })
    }
  },

  loadCollection: (collectionName) => {
    const collection = useGalleryStore.getState().collections.find(
      (c) => c.name === collectionName
    )
    set({ currentCollection: collection })
  },

  toggleDarkMode: () => {
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    }))
  },

  addArtwork: (artwork) => {
    set((state) => ({
      artworks: [...state.artworks, artwork],
    }))
  },

  clearError: () => {
    set({ error: null })
  },
}))
