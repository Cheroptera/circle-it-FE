/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react'
import { API_URL } from 'utils/urls'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { StartButton } from 'lib/StartButton'
import { Header } from '../lib/Header'

export const WorkoutPage = () => {
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  const randomList = useSelector((store) => store.workouts.list)
  const timestamp = useSelector((store) => store.workouts.createdAt)
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const repetitions = useSelector((store) => store.timer.repetitions)
  const rounds = useSelector((store) => store.timer.rounds)

  const [isRunning, setIsRunning] = useState(true)
  const [isWorkTime, setIsWorkTime] = useState(true)
  const [isRestTime, setIsRestTime] = useState(false)
  const [currentRepetition, setCurrentRepetition] = useState(1)
  const [currentRound, setCurrentRound] = useState(1)
  const [isRoundRest, setIsRoundRest] = useState(false)

  const getCurrentExercise = () => {
    if (randomList.length > 0) {
      return randomList[currentRepetition - 1]
    }
    return null
  }

  const getNextExercise = () => {
    if (randomList.length > currentRepetition) {
      return randomList[currentRepetition]
    }
    return null
  }

  const handlePauseClick = () => {
    setIsRunning((current) => !current)
  }

  // Function that saves workout to recent workouts
  const workoutDone = () => {
    fetch(API_URL('recent'), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        timestamp,
        exercises: randomList
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.success) {
          console.log('success')
        } else {
          console.error('Failed to save workout')
        }
      })
      .catch((error) => {
        console.error('Failed to save workout', error)
      })
    navigate('/well-done')
  }

  const handleTimerComplete = () => {
    if (isWorkTime) {
      setIsWorkTime(false)
      if (currentRepetition === repetitions && currentRound === rounds) {
        workoutDone()
      } else if (currentRepetition === repetitions && currentRound !== rounds) {
        setIsRoundRest(true)
      } else {
        setIsRestTime(true)
      }
    } else if (isRestTime) {
      setIsRestTime(false)

      if (currentRepetition === repetitions && currentRound === rounds) {
        workoutDone()
      } else if (currentRepetition === repetitions && currentRound !== rounds) {
        setIsRoundRest(true)
      } else {
        setCurrentRepetition((prevRepetition) => prevRepetition + 1)
        setIsWorkTime(true)
      }
    } else if (isRoundRest) {
      setIsRoundRest(false)
      if (currentRound === rounds) {
        setIsWorkTime(false)
        setIsRestTime(false)
        workoutDone()
      } else {
        setCurrentRound((prevRound) => prevRound + 1)
        setCurrentRepetition(1)
        setIsWorkTime(true)
      }
    }
  }

  return (
    <MainWrapper>
      {isWorkTime && (
        <>
          <Header
            headerTitle={getCurrentExercise().name}
            currentRoundText={`Round: ${currentRound} / ${rounds}`}
            currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
          />
          <WorkoutWrapper>
            <Img src={getCurrentExercise().img} alt="Exercise" />
            <CountdownCircleTimer
              key={`work-${currentRepetition}-${currentRound}`}
              isPlaying={isRunning}
              duration={workTime}
              colors={['#A53860']}
              onComplete={handleTimerComplete}>
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </WorkoutWrapper>
        </>
      )}
      {isRestTime && (
        <>
          <Header
            headerTitle="Rest"
            headerNextUp={`Next up: ${getNextExercise().name}`}
            currentRoundText={`Round: ${currentRound} / ${rounds}`}
            currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
          />
          <WorkoutWrapper>
            <Img src={getNextExercise().img} alt="Exercise" />
            <CountdownCircleTimer
              key={`rest-${currentRepetition}-${currentRound}`}
              isPlaying={isRunning}
              duration={restTime}
              colors={['#3DA5D9']}
              onComplete={handleTimerComplete}>
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </WorkoutWrapper>
        </>
      )}
      {isRoundRest && (
        <>
          <Header headerTitle="Rest" />
          <WorkoutWrapper>
            <CountdownCircleTimer
              key={`round-rest-${currentRound}`}
              isPlaying={isRunning}
              duration={4}
              colors={['#9AFFDF']}
              onComplete={handleTimerComplete}>
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </WorkoutWrapper>
        </>
      )}
      <StartButton
        buttonText="Pause"
        handleClick={handlePauseClick}
        white={!isRunning}
      />
    </MainWrapper>
  )
}
const Img = styled.img`
  width: 200px;
  padding: 10px;
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 2rem;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`
const WorkoutWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  align-self: center;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`
