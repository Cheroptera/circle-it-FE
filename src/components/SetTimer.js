/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  setWorkTime,
  setRestTime,
  setRounds,
  setIsRunning
} from 'reducers/timer'

export const SetTimer = () => {
  // Length of workout and rest in seconds
  const dispatch = useDispatch()
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const rounds = useSelector((store) => store.timer.rounds)

  const formatTime = (timeString) => {
    // Remove non-numeric characters
    const numericString = timeString.replace(/\D/g, '')
    // Format the numeric string as mm:ss
    const formattedString = numericString.replace(/(\d{2})(\d{2})/, '$1:$2')
    return formattedString
  }

  const handleStartWorkout = () => {
    dispatch(setIsRunning(true))
  }

  return (
    <div>
      <label htmlFor="workout-time">
        Workout Time:
        <input
          id="workout-time"
          type="text"
          value={workTime}
          onChange={(e) => {
            const inputValue = formatTime(e.target.value)
            dispatch(setWorkTime(inputValue))
          }}
        />
      </label>
      <label htmlFor="rest-time">
        Rest Time:
        <input
          id="rest-time"
          type="text"
          value={restTime}
          onChange={(e) => {
            const inputValue = formatTime(e.target.value)
            dispatch(setRestTime(inputValue))
          }}
        />
      </label>
      <label htmlFor="rounds">
        Rounds:
        <input
          id="rounds"
          type="text"
          value={rounds}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, '')
            dispatch(setRounds(inputValue))
          }}
        />
      </label>
      <Link to="/exercise">
        <button type="button" onClick={handleStartWorkout}>
          Lets go!
        </button>
      </Link>
    </div>
  )
}
