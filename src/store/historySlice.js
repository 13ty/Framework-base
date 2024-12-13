import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
  name: 'history',
  initialState: {
    searches: [],
    favorites: []
  },
  reducers: {
    addSearchToHistory: (state, action) => {
      const { query } = action.payload
      // Prevent duplicates
      if (!state.searches.some(search => search.query === query)) {
        state.searches.unshift({ 
          query, 
          timestamp: new Date().toISOString() 
        })
        
        // Limit history to last 10 searches
        if (state.searches.length > 10) {
          state.searches.pop()
        }
      }
    },
    addToFavorites: (state, action) => {
      const { concept } = action.payload
      state.favorites.push({
        ...concept,
        savedAt: new Date().toISOString()
      })
    },
    removeFromFavorites: (state, action) => {
      const { id } = action.payload
      state.favorites = state.favorites.filter(fav => fav.id !== id)
    }
  }
})

export const { 
  addSearchToHistory, 
  addToFavorites, 
  removeFromFavorites 
} = historySlice.actions
export default historySlice.reducer
