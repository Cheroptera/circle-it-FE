import React from 'react'
import styled from 'styled-components/macro'

const StyledSquareButton = styled.button`
background-color: #9AFFDF;
padding: 30px 30px; 
width: 150px;
height: 150px; 
border-radius: 10px; 
border:none; 
font-weight: bold;
font-family: 'Poppins', 'Sans-Serif';
font-size: 18px;
margin-top: 1rem;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

`

export const SquareButton = ({ buttonText, handleClick }) => {
  return (
    <StyledSquareButton type="button" onClick={handleClick}>{buttonText}</StyledSquareButton>
  )
}