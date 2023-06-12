import { createSlice } from '@reduxjs/toolkit'

export const workouts = createSlice({
  name: 'workout list',
  initialState: {
    list: [],
    timestamp: null, // Add timestamp to the initial state
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
      store.timestamp = Date.now() // Update the timestamp when setting the workout
    }
  }
})

export const { serError, setList, setTimestamp } = workouts.actions