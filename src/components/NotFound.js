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

const MainWrapper = styled.div`
@media (min-width: 668px) {
  max-width: 660px;
  margin: auto;
  padding-bottom: 3rem;
  box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  height: 100vh;
}
`

//* This is a page that is shown is what the user is looking for is not found
export const NotFound = () => {
  return (
    <MainWrapper>
      <StyledNF>
        <Header headerTitle="Ooops, something went wrong..." />
        <Lottie style={{ width: '200px', margin: 'auto' }} animationData={notFound} loop />
        <GoToStartButton />
      </StyledNF>
    </MainWrapper>
  )
}
