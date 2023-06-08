import React from 'react'
import styled from 'styled-components'
import Lottie from 'lottie-react'
import { GoToStartButton } from 'lib/GoToStartButton'
import { Header } from 'lib/Header'
import notFound from '../lotties/notFound'

const StyledNF = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
//* This is a page that is shown is what the user is looking for is not found
export const NotFound = () => {
  return (
    <StyledNF>
      <Header headerTitle="Ooops, something went wrong..." />
      <Lottie style={{ width: '200px', margin: 'auto' }} animationData={notFound} loop />
      <GoToStartButton />
    </StyledNF>
  )
}
