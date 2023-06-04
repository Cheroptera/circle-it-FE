import React from 'react'
import Timer from './Timer'

export const ExercisePage = ({ workTime, restTime, rounds }) => {
  return (
    <div>
      I am a workout page
      <Timer workTime={workTime} restTime={restTime} rounds={rounds} />
    </div>
  )
}
