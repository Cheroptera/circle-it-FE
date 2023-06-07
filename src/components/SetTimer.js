/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
  const workTime = useSelector((store) => store.timer.workTime)
  const restTime = useSelector((store) => store.timer.restTime)
  const rounds = useSelector((store) => store.timer.rounds)

  const handleStartWorkout = () => {
    dispatch(setIsRunning(true))
  }

  return (
    <Main>
      <Header headerTitle="What do you want to do today?" />
      <FormWrapper>
        <h3>Set your curcuit</h3>
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
          Work seconds
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
          Rest seconds
        </label>
        <Link to="/workout">
          <StartButton
            type="button"
            buttonText="Lets go!"
            handleClickEvent={handleStartWorkout}
          />
        </Link>
      </FormWrapper>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FormWrapper = styled.div`
  width: 242px;
  display: flex;
  flex-direction: column;
  margin: 8px;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`

const Input = styled.input`
width: 40px;
height: 35px;
background-color: #F0F0F0;
margin: 6px;
border-radius: 8px;
text-align: center;

:focus {
  outline: none;
  border: 3px solid #61C9A8;
`
