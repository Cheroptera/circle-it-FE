import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Lottie from 'lottie-react'
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
      <GoToStart>
        <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} to="/">Go to startpage</Link>
      </GoToStart>
    </StyledNF>
  )
}

const GoToStart = styled.div`
width: fit-content;
background-color: #A53860;
color: white;
cursor: pointer;
padding: 10px 18px;
border-radius: 16px;
`