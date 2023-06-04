/* eslint-disable operator-linebreak */
import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
  name: 'timer',
  initialState: {
    workTime: '00:07',
    restTime: '00:04',
    rounds: 4,
    isRunning: true
  },
  reducers: {
    setWorkTime: (store, action) => {
      store.workTime = action.payload
    },
    setRestTime: (store, action) => {
      store.restTime = action.payload
    },
    setRounds: (store, action) => {
      store.rounds = action.payload
    },
    setIsRunning: (store, action) => {
      store.isRunning = action.payload
    }
  }
})

export const { setWorkTime, setRestTime, setRounds, setIsRunning } =
  timer.actions

export default timer.reducer
