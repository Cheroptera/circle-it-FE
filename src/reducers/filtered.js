import { createSlice } from '@reduxjs/toolkit'

export const filtered = createSlice({
  name: 'filtered list',
  initialState: {
    filteredList: []
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setFilteredList: (store, action) => {
      store.filteredList = action.payload
    }
  }
})

export const { setFilteredList } = filtered.actions