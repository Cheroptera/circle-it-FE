import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Lottie from 'lottie-react'
import notFound from '../lotties/notFound'

const StyledNF = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 20px;

`
//* This is a page that is shown is what the user is looking for is not found
export const NotFound = () => {
  return (
    <StyledNF>
      <p>Ooops, something went wrong...</p>
      <Lottie style={{ width: '200px', margin: 'auto' }} animationData={notFound} loop />
      <p>
        <Link to="/">Go to startpage</Link>
      </p>
    </StyledNF>
  )
}