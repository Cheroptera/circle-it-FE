import styled, { css } from 'styled-components';
import React from 'react';

export const StyledButton = styled.button`
border-radius: 16px;
border: none;
background-color: #A53860;
color: white;
font-size: 16px;

font-weight: 700;
padding: 12px 32px;
margin: 10px;
box-sizing: border-box;
align-self: center;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);


${(props) => props.white && css`
border: 2px #A53860 solid;
background-color: white;
color: black;
padding: 6px 28px;
`
}`

export const Button = ({ buttonText, handleClick }) => {
  return (
    <Button type="submit" onClick={handleClick}>{buttonText}</Button>
  )
}