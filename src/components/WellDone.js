/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable max-len */
import React from 'react'
import { API_URL } from 'utils/urls'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'
import Lottie from 'lottie-react'
import styled from 'styled-components/macro'
import confetti from '../lotties/confetti.json'

export const WellDone = () => {
  const navigate = useNavigate()
  const finishedWorkout = useSelector((store) => store.workouts.list)
  const timestamp = useSelector((store) => store.workouts.createdAt)
  const accessToken = useSelector((store) => store.user.accessToken)
  const loggedInUserId = useSelector((store) => store.user.userId)

  console.log('loggedInUserId', loggedInUserId)
  console.log('accessToken', accessToken)

  const handleSaveWorkout = () => {
    console.log('timestamp', timestamp)
    console.log('finishedWorkout', finishedWorkout)
    fetch(API_URL('favorites'), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        timestamp,
        exercises: finishedWorkout
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        if (json.success) {
          navigate('/favorites')
        } else {
          console.error('Failed to save workout')
        }
      })
      .catch((error) => {
        console.error('Failed to save workout', error)
      })
  }
  return (
    <Main>
      <Header headerTitle="Well done!" />
      <StyledWellDoneContainer>
        <H2>You&apos;re frickin&apos; awesome! </H2>
        <p>Did you enjoy this workout?</p>
        <StartButton buttonText="Save Workout" onClick={handleSaveWorkout} />
      </StyledWellDoneContainer>
      <Lottie
        style={{
          width: '90%',
          height: '90%',
          position: 'absolute',
          top: '50px',
          zIndex: '-1'
        }}
        animationData={confetti}
        loop
      />
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`
const StyledWellDoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  margin: 5%;
  align-items: center;
`

const H2 = styled.h2`
  margin: unset;
  text-align: center;
`

//* This is a page that the user will see after finishing a workout
