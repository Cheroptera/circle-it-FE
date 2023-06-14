import styled, { css } from 'styled-components/macro';

export const ExerciseCard = styled.button`
  background: #9affdf;
  border: none;
  border-radius: 16px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
  width: 250px;
  padding: 16px;
  display: flex;
  margin: 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  font-weight: bold;

  &:hover{
    background: #61C9A8;
  }

  ${({ isSelected }) => isSelected
    && css`
      background: #61C9A8;
    `}
`;
