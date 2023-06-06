/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  setWorkTime,
  setRestTime,
  setRounds,
  setRoundsRestTime,
  setIsRunning
} from 'reducers/timer'

//* This is where the user sets the timer
export const SetTimer = () => {
  // Length of workout and rest in seconds
  const dispatch = useDispatch()
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const rounds = useSelector((store) => store.timer.rounds)
  const roundsRestTime = useSelector((store) => store.timer.roundsRestTime)

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
            const inputValue = e.target.value
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
            const inputValue = e.target.value
            dispatch(setRestTime(inputValue))
          }}
        />
      </label>
      <label htmlFor="repetitions">
        Rounds:
        <input
          id="repetitions"
          type="text"
          value={rounds}
          onChange={(e) => {
            const inputValue = e.target.value
            dispatch(setRounds(inputValue))
          }}
        />
      </label>
      <label htmlFor="round-rest-time">
        Rest between rounds:
        <input
          id="rounds-rest-time"
          type="text"
          value={roundsRestTime}
          onChange={(e) => {
            const inputValue = e.target.value
            dispatch(setRoundsRestTime(inputValue))
          }}
        />
      </label>
      <Link to="/workout">
        <button type="button" onClick={handleStartWorkout}>
          Lets go!
        </button>
      </Link>
    </div>
  )
}
