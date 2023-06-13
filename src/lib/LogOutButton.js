import React from 'react'
import styled from 'styled-components'
import { welcome } from 'reducers/welcome'
import { user } from 'reducers/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
    <StyledLogoutBtn type="button" onClick={onLogoutButtonClick}>Log out</StyledLogoutBtn>
  )
}

const StyledLogoutBtn = styled.button`
border: none;
background: none;
align-self: center;
cursor: pointer;
color: #A53860;
font-size: 14px;
position: absolute;
right: 10px;
top: 10px;

@media (min-width: 1024px) {
  font-size: 20px;
  }
`