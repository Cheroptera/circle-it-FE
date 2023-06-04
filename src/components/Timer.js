/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState, useEffect } from 'react'

const Timer = (rounds, restTime, setRounds) => {
  // Length of workout and rest in seconds
  const [timeLeft, setTimeLeft] = useState(null) // Time left in current interval
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer = null

    // Updates the timer, decrement by 1 second
    const updateTimer = () => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1

        // Check if the current interval is completed
        if (newTimeLeft === 0) {
          // Check if all rounds are completed
          if (rounds === 0) {
            // Timer completed, stop the timer
            setIsRunning(false)
            return 0
          }

          // Start the rest interval
          setTimeLeft(restTime)
          setRounds((prevRounds) => prevRounds - 1)
        }

        return newTimeLeft
      })
    }

    // Start or stop the timer based on the running state
    if (isRunning) {
      timer = setInterval(updateTimer, 1000)
    } else {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isRunning, restTime, rounds, setIsRunning, setRounds])

  // Function to start or pause the timer
  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState)
  }

  return (
    <div>
      <button type="button" onClick={handleStartPause}>
        {timeLeft}
      </button>
    </div>
  )
}

export default Timer
