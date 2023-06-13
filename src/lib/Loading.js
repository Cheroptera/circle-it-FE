import React from 'react'
import styled from 'styled-components/macro'
import Lottie from 'lottie-react'
import Runner from '../lotties/runner'

export const Loading = () => {
  return (
    <LoadingDiv>
      <h3>Hang in there..</h3>
      <Lottie style={{ width: '200px' }} animationData={Runner} loop />
    </LoadingDiv>
  )
}

const LoadingDiv = styled.div`
display:flex;
flex-direction: column;
height: 100vw;
align-items: center;
margin: 30px;

h3{
  color: #61C9A8;
  margin: unset;
}
`