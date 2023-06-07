/* eslint-disable operator-linebreak */
import { createSlice } from '@reduxjs/toolkit'

export const timer = createSlice({
  name: 'timer',
  initialState: {
    workTime: '7',
    restTime: '4',
    repetitions: 5,
    rounds: 4,
    roundsRestTime: '60',
    isRunning: true
  },
  reducers: {
    setWorkTime: (store, action) => {
      store.workTime = action.payload
    },
    setRestTime: (store, action) => {
      store.restTime = action.payload
    },
    setRepetitions: (store, action) => {
      store.repetitions = action.payload
    },
    setRounds: (store, action) => {
      store.rounds = action.payload
    },
    setIsRunning: (store, action) => {
      store.isRunning = action.payload
    }
  }
})

export const {
  setWorkTime,
  setRestTime,
  setRepetitions,
  setRounds,
  setRoundsRestTime,
  setIsRunning
} =
  timer.actions

export default timer.reducer
