import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const GoToStartButton = () => {
  return (
    <GoToStart>
      <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }} to="/">Go to startpage</Link>
    </GoToStart>
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