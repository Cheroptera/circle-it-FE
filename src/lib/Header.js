import React from 'react'
import styled from 'styled-components/macro'
import { css } from 'styled-components';
import { GoBackBtn } from './GoBackBtn';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  border-radius: 0px 0px 17rem 17rem;
  background-color: #61c9a8;
  width: 100vw;
`

const StyledHeaderTitle = styled.h2`
  font-family: 'Poppins', 'Sans-Serif';
  font-size: 28px;
  align-self: center;
  color: white;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 48px;
    margin: 0 20%;
  }

  ${(props) => props.margin && css`
  margin: 80px 30px 80px 30px;
  `}`

const StyledSubHeading = styled.h3`
  font-weight: 700;
  align-self: center;
  color: white;
  font-size: 19px;
  text-align: center;
  margin-top: 0;
`
const StyledHeaderNextUp = styled.h3`
  font-weight: 700;
  align-self: center;
  color: white;
  font-size: 22px;
  text-align: center;
  margin-top: 0;
`

const StyledCurrentRoundText = styled.h3`
  align-self: center;
  color: white;
  font-size: 12px;
  text-align: center;
  margin-top: 0;
`

const Blob1 = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
background-color: #9AFFDF;
position: absolute;
top: calc(7%);
left: calc(8%)
`
const Blob2 = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
background-color: #9AFFDF;
position: absolute;
top: calc(22%);
right: calc(23%);

@media (min-width: 1024px) {
  top: calc(20%);
  right: calc(20%);
  }
`

export const Header = ({
  headerTitle,
  className,
  currentRoundText,
  currentRepText,
  headerSubheading,
  headerNextUp
}) => {
  return (
    <>
      <GoBackBtn />
      <Blob1 />
      <Blob2 />
      <StyledHeader className={className}>
        {currentRoundText && (
          <StyledCurrentRoundText>{currentRoundText}</StyledCurrentRoundText>
        )}
        {currentRepText && (
          <StyledCurrentRoundText>{currentRepText}</StyledCurrentRoundText>
        )}
        {headerTitle && <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>}
        {headerSubheading && (
          <StyledSubHeading>{headerSubheading}</StyledSubHeading>
        )}
        {headerNextUp && (
          <StyledHeaderNextUp>{headerNextUp}</StyledHeaderNextUp>)}
      </StyledHeader>
    </>
  )
}
