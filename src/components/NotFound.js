import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledNF = styled.div`
border: 2px solid purple;
`
//* This is a page that is shown is what the user is looking for is not found
export const NotFound = () => {
  return (
    <StyledNF>
      <p>
        <Link to="/login">GO TO LOGIN</Link>
      </p>
      <p>Sorry, nothing here...</p>
    </StyledNF>
  )
}