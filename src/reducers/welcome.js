import { createSlice } from '@reduxjs/toolkit'

//! Behövs denna reducern ens???
export const welcome = createSlice({
  name: 'welcome',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setItems: (store, action) => {
      store.items = action.payload
    }
  }
})