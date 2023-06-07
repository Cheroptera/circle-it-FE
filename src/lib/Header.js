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
`

const StyledHeaderTitle = styled.h2`
  font-family: 'Poppins', 'Sans-Serif';
  font-size: 40px;
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

const StyledheaderBackText = styled.p`
  font-family: 'Poppins', 'Sans-Serif';
  color: white;
  font-size: 10px;
  margin-right: 0;
  margin-top: 0;
`

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

export const Header = ({
  headerTitle,
  className,
  headerBackText,
  currentRoundText,
  currentRepText,
  headerSubheading,
  headerNextUp
}) => {
  return (
    <>
      <GoBackBtn />
      <StyledHeader className={className}>
        {headerBackText && (
          <StyledheaderBackText>{headerBackText}</StyledheaderBackText>
        )}
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
