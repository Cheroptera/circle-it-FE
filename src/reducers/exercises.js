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