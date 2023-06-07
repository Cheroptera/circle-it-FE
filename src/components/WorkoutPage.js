/* eslint-disable max-len */
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
    if (currentRepetition >= 1 && currentRepetition <= repetitions) {
      return randomList[currentRepetition - 1];
    } else if (currentRepetition > repetitions && currentRound < rounds) {
      return randomList[0];
    }
    return null;
  };

  const getNextExercise = () => {
    if (currentRepetition >= 1 && currentRepetition <= repetitions) {
      return randomList[currentRepetition];
    } else if (currentRepetition > repetitions && currentRound < rounds) {
      return randomList[0];
    }
    return null;
  };

  const handleTimerComplete = () => {
    if (isRoundRest) {
      setIsRoundRest(false);
      setCurrentRepetition((prevRepetition) => prevRepetition + 1);
      setCurrentRound((prevRound) => prevRound + 1);
      setIsWorkTime(true);
    } else if (isWorkTime) {
      setIsWorkTime(false);
      setIsRestTime(true);
    } else if (isRestTime) {
      setIsWorkTime(true);
      setIsRestTime(false);
      setCurrentRepetition((prevRepetition) => prevRepetition + 1);
      if (currentRepetition === repetitions) {
        setCurrentRound((prevRound) => prevRound + 1);
        setIsRoundRest(true);
      }
    }
  };

  return (
    <>
      {isWorkTime && getCurrentExercise() && currentRepetition >= 1 && currentRepetition <= repetitions && (
        <Header
          headerTitle={getCurrentExercise().name}
          headerBackText="< Todays workout"
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      {isRestTime && getNextExercise() && currentRepetition >= 1 && currentRepetition <= repetitions && (
        <Header
          headerTitle="Rest"
          headerBackText="< Todays workout"
          headerNextUp={`Next up: ${getNextExercise().name}`}
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      {isRoundRest && currentRepetition >= 1 && currentRepetition <= repetitions && (
        <Header
          headerTitle="Rest"
          headerBackText="< Todays workout"
          currentRoundText={`Round: ${currentRound} / ${rounds}`}
          currentRepText={`Rep: ${currentRepetition} / ${repetitions}`}
        />
      )}
      <Main>
        <WorkoutWrapper>
          {isWorkTime && getCurrentExercise() && getCurrentExercise().img && (
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

          {isRestTime && getNextExercise() && getNextExercise().img && (
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
