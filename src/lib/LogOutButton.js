import React from 'react'
import styled from 'styled-components'
import { welcome } from 'reducers/welcome'
import { user } from 'reducers/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogOutIconImg from '../images/logOut.png'

export const LogOutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setUserId(null))
    dispatch(user.actions.setError(null))
    dispatch(welcome.actions.setItems([]))
    navigate('/')
  }
  return (
    <StyledLogoutBtn type="button" onClick={onLogoutButtonClick}>
      <LogOutIcon src={LogOutIconImg} />
    </StyledLogoutBtn>
  )
}

const StyledLogoutBtn = styled.button`
  border: none;
  background: none;
  grid-row-start: 1;
  grid-column-start: 3;
  justify-self: end;
  cursor: pointer;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`

const LogOutIcon = styled.img`
  height: 30px;
`
