/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const SetTimer = () => {
  // Length of workout and rest in seconds
  const [workTime, setWorkTime] = useState('00:40')
  const [restTime, setRestTime] = useState('00:20')
  const [rounds, setRounds] = useState(4) // Number of rounds
  const [isRunning, setIsRunning] = useState(false)

  const formatTime = (timeString) => {
    // Remove non-numeric characters
    const numericString = timeString.replace(/\D/g, '')

    // Format the numeric string as mm:ss
    const formattedString = numericString.replace(/(\d{2})(\d{2})/, '$1:$2')
    return formattedString
  }

  const handleStartWorkout = () => {
    setIsRunning(isRunning)
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
            setWorkTime(inputValue)
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
            setRestTime(inputValue)
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
            const inputValue = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
            setRounds(inputValue)
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
