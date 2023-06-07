/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Header } from '../lib/Header'

export const WorkoutPage = () => {
  const randomList = useSelector((store) => store.exercises.list)
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const repetitions = useSelector((store) => store.timer.repetitions)
  const rounds = useSelector((store) => store.timer.rounds)
  const roundsRestTime = useSelector((store) => store.timer.roundsRestTime)

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

  const handleTimerComplete = () => {
    if (isWorkTime) {
      setIsWorkTime(false)
      setIsRestTime(true)
    } else if (isRestTime) {
      setIsWorkTime(true)
      setIsRestTime(false)
      setCurrentRepetition((prevRepetition) => prevRepetition + 1)
    } else if (isRoundRest) {
      setIsRoundRest(false)
      setIsWorkTime(true)
      setCurrentRepetition(1)
      setCurrentRound((prevRound) => prevRound + 1)
    }
    if (currentRepetition === randomList.length) {
      setIsRestTime(false)
      setIsWorkTime(false)
      setIsRoundRest(true)
    }
  }
  return (
    <>
      {isWorkTime && (
        <Header
          headerTitle={getCurrentExercise().name}
          headerBackText="< Todays workout"
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      {isRestTime && (
        <Header
          headerTitle="Rest"
          headerBackText="< Todays workout"
          headerNextUp={`Next up: ${getNextExercise().name}`}
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      {isRoundRest && (
        <Header
          headerTitle="Rest"
          headerBackText="< Todays workout"
          headerNextUp={`Next up: ${getNextExercise().name}`}
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      <Main>
        <WorkoutWrapper>
          {isWorkTime && (
            <>
              <Img src={getCurrentExercise().img} alt="Exercise" />
              <CountdownCircleTimer
                key={`work-${currentRepetition}-${currentRound}`}
                isPlaying
                duration={workTime}
                colors={['#A53860']}
                onComplete={handleTimerComplete}>
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </>
          )}

          {isRestTime && (
            <>
              <Img src={getNextExercise().img} alt="Exercise" />
              <CountdownCircleTimer
                key={`rest-${currentRepetition}-${currentRound}`}
                isPlaying
                duration={restTime}
                colors={['#3DA5D9']}
                onComplete={handleTimerComplete}>
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </>
          )}

          {isRoundRest && (
            <CountdownCircleTimer
              key={`round-rest-${currentRound}`}
              isPlaying
              duration={roundsRestTime}
              colors={['#9AFFDF']}
              onComplete={handleTimerComplete}>
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          )}
        </WorkoutWrapper>
      </Main>
    </>
  )
}

const Img = styled.img`
  width: 200px;
  padding: 10px;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
