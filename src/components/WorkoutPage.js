import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Header } from '../lib/Header'

export const WorkoutPage = () => {
  const randomList = useSelector((store) => store.exercises.list)
  const workTime = useSelector((store) => store.timer.workTime);
  const restTime = useSelector((store) => store.timer.restTime)
  const repetitions = useSelector((store) => store.timer.repetitions);
  const rounds = useSelector((store) => store.timer.rounds)
  const roundsRestTime = useSelector((store) => store.timer.roundsRestTime);

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
      return randomList[currentRepetition];
    }
    return null;
  };

  const handleTimerComplete = () => {
    if (isWorkTime) {
      setIsWorkTime(false);
      setIsRestTime(true);
    } else if (isRestTime) {
      setIsWorkTime(true);
      setIsRestTime(false);
      setCurrentRepetition((prevRepetition) => prevRepetition + 1);
    } else if (isRoundRest) {
      setIsRoundRest(false);
      setIsWorkTime(true);
      setCurrentRepetition(1);
      setCurrentRound((prevRound) => prevRound + 1);
    }
    if (currentRepetition === randomList.length) {
      setIsRestTime(false);
      setIsWorkTime(false);
      setIsRoundRest(true);
    }
  };
  return (
    <div>
      <Header headerTitle="Workout page" />
      <p>Current round: {currentRound} / {rounds}</p>
      <p>Current rep: {currentRepetition} / {repetitions}</p>
      {isWorkTime && (
        <>
          <h2>{getCurrentExercise().name}</h2>
          <img src={getCurrentExercise().image} alt="Exercise" />
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
          <h2>{getNextExercise().name}</h2>
          <img src={getNextExercise().image} alt="Exercise" />
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
        <>
          <h2>Rest</h2>
          <CountdownCircleTimer
            key={`round-rest-${currentRound}`}
            isPlaying
            duration={roundsRestTime}
            colors={['#9AFFDF']}
            onComplete={handleTimerComplete}>
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </>
      )}
    </div>
  );
};
