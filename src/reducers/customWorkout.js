import { createSlice } from '@reduxjs/toolkit'

export const custom = createSlice({
  name: 'custom workout',
  initialState: {
    list: [],
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setCustomList: (store, action) => {
      store.list = action.payload
    }
  }
})

export const { setCustomList } = custom.actions