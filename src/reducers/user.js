import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    name: null,
    username: null,
    userId: null,
    accessToken: null,
    error: null,
    isLoading: false,
    isNewUser: false
  },
  reducers: {
    setLoading: (store, action) => {
      store.isLoading = action.payload
    },
    setName: (store, action) => {
      store.name = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    setNewUser: (store, action) => {
      store.isNewUser = action.payload
    }
  }
})

