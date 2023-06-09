import React from 'react'
import { Header } from 'lib/Header'
import Lottie from 'lottie-react'
import styled from 'styled-components/macro'
import confetti from '../lotties/confetti.json'

export const WellDone = () => {
  return (
    <>
      <Header
        headerTitle="Well done!" />
      <StyledWellDoneContainer>
        <H2>You&apos;re frickin&apos; awesome! </H2>
      </StyledWellDoneContainer>
      <Lottie style={{ width: '90%', height: '90%', position: 'absolute', top: '50px' }} animationData={confetti} loop />
      <p>Did you enjoy this workout?</p>
      <button type="button">Save workout</button>
    </>
  )
}

const StyledWellDoneContainer = styled.div`
display: flex; 
justify-content: center; 
font-size: 32px; 
text-align: center;
margin: 5%;
`

const H2 = styled.h2`
margin: unset;
`

//* This is a page that the user will see after finishing a workout