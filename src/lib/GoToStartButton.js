import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
background-color: #A53860;
color: white;
cursor: pointer;
padding: 10px 18px;
border-radius: 16px;
`