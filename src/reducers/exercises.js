import { createSlice } from '@reduxjs/toolkit'

export const exercises = createSlice({
  name: 'exercise list',
  initialState: {
    list: [],
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setList: (store, action) => {
      store.list = action.payload
    }
  }
})

export const { setList } = exercises.actions

export const workouts = createSlice({
  name: 'workout list',
  initialState: [],
  reducers: {
    addWorkout: (state, action) => {
      const newWorkout = {
        id: Date.now(), // Generates a unique ID
        exercises: action.payload
      }
      state.push(newWorkout)
    }
  }
})

export const { addWorkout } = workouts.actions