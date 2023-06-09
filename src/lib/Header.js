/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { css } from 'styled-components'
import { LogOutButton } from 'lib/LogOutButton'
import { GoBackBtn } from './GoBackBtn'
import LogInImg from '../images/profile.png'

export const Header = ({
  headerTitle,
  className,
  currentRoundText,
  currentRepText,
  headerNextUp,
  restColor
}) => {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn)
  const navigate = useNavigate()
  const handleLogInClick = () => {
    navigate('/')
  }
  return (
    <HeaderWrapper>
      <Blob1 />
      <Blob2 />
      <StyledHeader className={className} restColor={restColor}>
        <GoBackBtn />
        {!isLoggedIn && (
          <LogInBtn type="button" onClick={handleLogInClick}>
            <LogInImage src={LogInImg} />
          </LogInBtn>
        )}
        {isLoggedIn && <LogOutButton />}
        {currentRoundText && (
          <StyledCurrentRoundText>{currentRoundText}</StyledCurrentRoundText>
        )}
        {currentRepText && (
          <StyledCurrentRepText>{currentRepText}</StyledCurrentRepText>
        )}
        {headerTitle && <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>}
        {headerNextUp && (
          <StyledHeaderNextUp>{headerNextUp}</StyledHeaderNextUp>
        )}
      </StyledHeader>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
`

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 2fr 2fr 2fr 1fr;
  gap: 0px;
  height: 250px;
  border-radius: 0px 0px 17rem 17rem;
  background-color: ${(props) => (props.restColor ? '#62c6ae' : '#CDB0EE')};
  width: 100%;
`
const LogInBtn = styled.button`
  color: white;
  grid-row-start: 1;
  grid-column-start: 3;
  justify-self: end;
  font-size: 20px;
  border: none;
  background-color: unset;
`
const LogInImage = styled.img`
  width: 35px;
`

const StyledCurrentRoundText = styled.h3`
  grid-row-start: 1;
  grid-column-start: 2;
  color: white;
  font-size: 14px;
  text-align: center;
`
const StyledCurrentRepText = styled.h3`
  grid-row-start: 2;
  grid-column-start: 2;
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 0;
`
const StyledHeaderTitle = styled.h2`
  font-family: 'Poppins', 'Sans-Serif';
  grid-row-start: 3;
  grid-column-start: 2;
  font-size: 28px;
  color: white;
  text-align: center;
  text-shadow: 6px 0px 5px rgba(0, 0, 0, 0.21);
  z-index: 1;
  filter: drop-shadow(0px 5px 4px rgba(0 0 0 0.32));

  @media (min-width: 700px) {
    font-size: 38px;
    margin: 0 20%;
  }

  ${(props) =>
    props.margin &&
    css`
      margin: 80px 30px 80px 30px;
    `}
`

const StyledHeaderNextUp = styled.h3`
  grid-row-start: 4;
  grid-column-start: 2;
  font-weight: 700;
  color: white;
  font-size: 22px;
  text-align: center;
  margin-top: 0;
`

const Blob1 = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffb3ba;
  position: absolute;
  top: calc(12%);
  left: calc(20%);
  position: absolute;
  z-index: 0;
  filter: drop-shadow(-6px 12px 4px rgba(0, 0, 0, 0.25));


  @media (min-width: 800px) {
    width: 70px;
    height: 70px;
    top: calc(10%);
    left: calc(25%);
  }

  @media (min-width: 1024px) {
    left: calc(33%);
  }

  @media (min-width: 1480px) {
    left: calc(40%);
    top: calc(7%);
  }
`

const Blob2 = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #b0ebbd;
  position: absolute;
  top: calc(2%);
  right: calc(20%);
  z-index: 0;
  filter: drop-shadow(-6px 12px 4px rgba(0, 0, 0, 0.25));


  @media (min-width: 700px) {
    width: 60px;
    height: 60px;
    right: calc(20%);
  }

  @media (min-width: 1024px) {
    width: 70px;
    height: 70px;
    right: calc(32%);
  }

  @media (min-width: 1480px) {
    right: calc(39%);
  }
`
