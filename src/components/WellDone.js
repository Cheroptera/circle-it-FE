/* eslint-disable max-len */
import React from 'react'
import { API_URL } from 'utils/urls'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Header } from 'lib/Header'
import { LogOutButton } from 'lib/LogOutButton'
// import Lottie from 'lottie-react'
import styled from 'styled-components/macro'
// import confetti from '../lotties/confetti.json'

export const WellDone = () => {
  const navigate = useNavigate()
  const finishedWorkout = useSelector((store) => store.workouts.list)
  const timestamp = useSelector((store) => store.workouts.createdAt)
  const accessToken = useSelector((store) => store.user.accessToken)

  const handleSomething = () => {
    console.log('handle this 🌮')
  }

  // Save the workout
  const handleSaveWorkout = () => {
    console.log('timestamp', timestamp)
    console.log('finishedWorkout', finishedWorkout)
    fetch(API_URL('workouts'), {
      method: 'POST',
      mode: 'no-cors',
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
        console.log('hallå', json)
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
    <>
      <Header
        headerTitle="Well done!" />
      <StyledWellDoneContainer>
        <H2>You&apos;re frickin&apos; awesome! </H2>
        <p>Did you enjoy this workout?</p>
        <button type="button" onClick={handleSaveWorkout}>Save workout</button>
        <button type="button" onClick={handleSomething}>Another</button>
      </StyledWellDoneContainer>
      {/* <Lottie style={{ width: '90%', height: '90%', position: 'absolute', top: '50px' }} animationData={confetti} loop /> */}
      <LogOutButton />
    </>
  )
}

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
`

//* This is a page that the user will see after finishing a workout
