import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledNF = styled.div`
border: 2px solid purple;
`

export const NotFound = () => {
  return (
    <StyledNF>
      <p>
        <Link to="/login">GO TO LOGIN</Link>
      </p>
      <p>
        <Link to="/">GO TO MAIN</Link>
      </p>
      <p>Sorry, nothing here...</p>
    </StyledNF>
  )
}