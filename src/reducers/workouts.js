import { createSlice } from '@reduxjs/toolkit'

export const workouts = createSlice({
  name: 'workout list',
  initialState: {
    list: [],
    createdAt: null, // Add timestamp(createdAt) to the initial state
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setList: (store, action) => {
      store.list = action.payload
    },
    setTimestamp: (store) => {
      store.createdAt = Date.now() // Updates the timestamp(createdAt) when setting the workout
    },
    saveFavorite: (store, action) => {
      store.favorite = action.payload
    }
  }
})

export const { setError, setList, setTimestamp, saveFavorite } = workouts.actions