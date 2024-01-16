/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setWorkTime,
  setRestTime,
  setRounds,
  setIsRunning
} from 'reducers/timer'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'
import styled from 'styled-components/macro'

//* This is where the user sets the timer
export const SetTimer = () => {
  // Length of workout and rest in seconds
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const rounds = useSelector((store) => store.timer.rounds)
  const [countdown, setCountdown] = useState(0)

  const handleStartWorkout = () => {
    dispatch(setIsRunning(true))
    setCountdown(5)

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(countdownInterval)
      navigate('/workout')
    }, 5000)
  }

  return (
    <Main>
      <Header headerTitle="Timer Options" />
      <FormWrapper>
        <h3>Set your circuit</h3>
        <label htmlFor="rounds">
          <Input
            id="rounds"
            type="text"
            value={rounds}
            onChange={(e) => {
              const inputValue = e.target.value
              dispatch(setRounds(inputValue))
            }}
          />{' '}
          Rounds
        </label>
        <label htmlFor="workout-time">
          <Input
            id="workout-time"
            type="text"
            value={workTime}
            onChange={(e) => {
              const inputValue = e.target.value
              dispatch(setWorkTime(inputValue))
            }}
          />{' '}
          Working time (s)
        </label>
        <label htmlFor="rest-time">
          <Input
            id="rest-time"
            type="text"
            value={restTime}
            onChange={(e) => {
              const inputValue = e.target.value
              dispatch(setRestTime(inputValue))
            }}
          />{' '}
          Rest time (s)
        </label>
        <StartButton
          buttonText="I'm ready!"
          handleClick={handleStartWorkout}
          disabled={countdown}
        />
      </FormWrapper>
      <P>
        {countdown > 0 ? `Workout starting in ${countdown} seconds...` : ''}
      </P>
    </Main>
  )
}

const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`
const FormWrapper = styled.div`
  width: 242px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  align-self: center;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`

const Input = styled.input`
  width: 40px;
  height: 35px;
  background-color: #f0f0f0;
  margin: 6px;
  border-radius: 8px;
  text-align: center;

  :focus {
    outline: none;
    border: 3px solid #61c9a8;
  }
`

const P = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
`
