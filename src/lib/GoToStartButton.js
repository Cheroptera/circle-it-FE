import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const GoToStartButton = () => {
  return (
    <GoToStart>
      <Link style={{ color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: '700' }} to="/welcome">Go to startpage</Link>
    </GoToStart>
  )
}

const GoToStart = styled.div`
font-size: 16px;
font-weight: 700;
width: fit-content;
background-color: #b0ebbd;
cursor: pointer;
padding: 10px 18px;
border-radius: 16px;
align-self: center;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
`