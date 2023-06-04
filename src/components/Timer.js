import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Timer = () => {
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const rounds = useSelector((store) => store.timer.rounds)
  const isRunning = useSelector((store) => store.timer.isRunning)

  // Function to convert time in "mm:ss" format to seconds
  const formatTimeToSeconds = (time = '00:00') => {
    const [minutes, seconds] = time.split(':')
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
    return totalSeconds
  }

  // Length of workout and rest in seconds
  const [isWorkTime, setIsWorkTime] = useState(true)
  const [timeLeft, setTimeLeft] = useState(formatTimeToSeconds(workTime))
  const [isTimerRunning, setIsTimerRunning] = useState(isRunning)
  const [currentRound, setCurrentRound] = useState(1)

  useEffect(() => {
    setIsWorkTime(currentRound !== 1) // Start with restTime for rounds other than 1
    setTimeLeft(formatTimeToSeconds(isWorkTime ? workTime : restTime))
  }, [workTime, restTime, currentRound])

  useEffect(() => {
    let timer = null

    const updateTimer = () => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1
        console.log(isWorkTime)
        if (newTimeLeft <= 0) {
          if (currentRound < rounds) {
            if (isWorkTime) {
              setTimeLeft(formatTimeToSeconds(restTime))
              setIsWorkTime(false)
            } else {
              setTimeLeft(formatTimeToSeconds(workTime))
              setIsWorkTime(true)
              setCurrentRound((prevRound) => prevRound + 1)
            }
          } else {
            setIsTimerRunning(false)
            clearInterval(timer)
          }
        }
        return newTimeLeft
      })
    }
    if (isTimerRunning && !(currentRound === rounds && !isWorkTime)) {
      timer = setInterval(updateTimer, 1000)
    } else {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isTimerRunning, isWorkTime, workTime, restTime, currentRound, rounds])

  const handleStartPause = () => {
    setIsTimerRunning((prevState) => !prevState)
  }

  // Showing the user the value of the time left
  const userText = isWorkTime ? 'Work time' : 'Rest time'

  return (
    <div>
      <p>
        Current round: {currentRound} / {rounds}
      </p>
      <button type="button" onClick={handleStartPause}>
        {userText}: {timeLeft}
      </button>
    </div>
  )
}
