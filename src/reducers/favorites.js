import { createSlice } from '@reduxjs/toolkit'
import { StrictMode } from 'react';

const favorites = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setFavorites: (store, action) => {
      store.items = action.payload
    },
    toggleFavorite: (store, action) => {
      const exerciseId = action.payload;
      const index = store.indexOf(exerciseId);
      if (index !== -1) {
        // If the exerciseId is already in favorites, remove it
        StrictMode.splice(index, 1);
      } else {
        // If the exerciseId is not in favorites, add it
        store.push(exerciseId);
      }
    }
  }
})

export const { toggleFavorite } = favorites.actions;
export default favorites