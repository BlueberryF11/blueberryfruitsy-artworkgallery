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
    set({ loading: true })
    try {
      const response = await fetch('/server-name.txt')
      const serverUrl = (await response.text()).trim()
      set({ serverUrl })
      
      await useGalleryStore.getState().fetchCollections(serverUrl)
    } catch (err) {
      set({ error: err.message })
    } finally {
      set({ loading: false })
    }
  },

  fetchCollections: async (serverUrl) => {
    try {
      const response = await fetch(`${serverUrl}/collections.json`)
      const collections = await response.json()
      set({ collections })
    } catch (err) {
      console.warn('Could not fetch collections:', err)
      set({ collections: [
        {
          name: 'Digital Art',
          description: 'Abstract digital artworks',
          images: []
        },
        {
          name: 'Photography',
          description: 'Photography collection',
          images: []
        },
        {
          name: 'Music Visuals',
          description: 'Visual interpretations of sound',
          images: []
        }
      ]})
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
