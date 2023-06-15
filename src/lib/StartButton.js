import styled, { css } from 'styled-components';
import React from 'react';

export const StyledStartButton = styled.button`
  border-radius: 16px;
  border: ${(props) => (props.white ? '3px solid #A53860' : 'none')};
  background-color: ${(props) => (props.white ? 'white' : '#A53860')};
  color: ${(props) => (props.white ? 'black' : 'white')};
  font-size: 16px;
  font-weight: 700;
  padding: 12px 32px;
  margin: 10px;
  box-sizing: border-box;
  align-self: center;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  ${(props) => props.disabled && css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

export const StartButton = ({ buttonText, handleClick, onClick, disabled, white }) => {
  const handleClickEvent = onClick || handleClick
  return (
    <StyledStartButton
      onClick={handleClickEvent}
      disabled={disabled}
      white={white}>
      {buttonText}
    </StyledStartButton>
  )
}