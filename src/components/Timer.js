import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CountdownTimer } from 'lib/CountdownTimer'

//* This is a timer component

export const Timer = () => {
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const repetitions = useSelector((store) => store.timer.repetitions)
  const rounds = useSelector((store) => store.timer.rounds)
  const roundsRestTime = useSelector((store) => store.timer.roundsRestTime)
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
  const [currentRepetition, setCurrentRepetition] = useState(1)
  const [currentRound, setCurrentRound] = useState(1)

  useEffect(() => {
    setIsWorkTime(true)
    setTimeLeft(formatTimeToSeconds(workTime))
  }, [workTime, restTime])

  useEffect(() => {
    let timer = null
    const updateTimer = () => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1
        if (newTimeLeft <= 0) {
          if (isWorkTime) {
            if (currentRepetition < repetitions) {
              setTimeLeft(formatTimeToSeconds(restTime))
              setIsWorkTime(false)
              setCurrentRepetition((prevRepetition) => prevRepetition + 1)
            } else {
              setTimeLeft(formatTimeToSeconds(roundsRestTime))
              setIsWorkTime(false)
              setCurrentRepetition(1) // Reset the current repetition to 1
            }
          } else if (currentRepetition === 1) {
            if (currentRound < rounds) {
              setCurrentRound((prevRound) => prevRound + 1) // Increment the number of rounds
              setTimeLeft(formatTimeToSeconds(workTime))
              setIsWorkTime(true)
            } else {
              setIsTimerRunning(false)
              clearInterval(timer)
            }
          } else {
            setTimeLeft(formatTimeToSeconds(workTime))
            setIsWorkTime(true)
          }
        }
        return newTimeLeft
      })
    }
    // eslint-disable-next-line max-len
    if (isTimerRunning && !(currentRepetition === repetitions && currentRound === repetitions && !isWorkTime)) {
      timer = setInterval(updateTimer, 1000)
    } else {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [isTimerRunning,
    workTime,
    restTime,
    repetitions,
    currentRepetition,
    rounds,
    currentRound,
    roundsRestTime,
    isWorkTime])

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
      {userText}: {timeLeft}
      <CountdownTimer
        onClick={handleStartPause}
        seconds={timeLeft} // Pass the timeLeft value as seconds
        size={200} // Customize the size as needed
        strokeBgColor="black" // Customize the stroke background color
        strokeColor="lightgreen" // Customize the stroke color
        strokeWidth={12} />
    </div>
  )
}