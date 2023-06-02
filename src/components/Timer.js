import React, { useState, useEffect } from 'react'

const Timer = () => {
  // Length of workout and rest in seconds
  const [workTime, setWorkTime] = useState(40)
  const [restTime, setRestTime] = useState(20)
  const [rounds, setRounds] = useState(4) // Number of rounds
  const [timeLeft, setTimeLeft] = useState(workTime) // Time left in current interval
  const [isRunning, setIsRunning] = useState(false) // Timer running state

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
  }, [isRunning, restTime, rounds])

  // Function to start or pause the timer
  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState)
  }

  // Reset the timer
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(workTime)
    setRounds(1)
  }

  return (
    <div>
      <div>{timeLeft}</div> {/* Display time left */}
      <button type="button" onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  )
}

export default Timer
