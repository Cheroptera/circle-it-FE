import { createSlice } from '@reduxjs/toolkit'

export const filteredWorkout = createSlice({
  name: 'filtered workout',
  initialState: {
    list: [],
    error: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setFilteredMuscleList: (store, action) => {
      store.list = action.payload
    },
    setFilteredEquipmentList: (store, action) => {
      store.list = action.payload
    }
  }
})

export const { setFilteredMuscleList, setFilteredEquipmentList } = filteredWorkout.actions