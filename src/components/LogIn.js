/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { user } from 'reducers/user'
import { API_URL } from 'utils/urls'
import styled from 'styled-components/macro'
import { StartButton } from 'lib/StartButton'
import headerImg from '../images/Background.svg'

export const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate, dispatch])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken))
          dispatch(user.actions.setUsername(data.response.username))
          dispatch(user.actions.setUserId(data.response.id))
          dispatch(user.actions.setError(null))
        } else {
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setError(data.response))
        }
      })
  }
  return (
  // TODO CHANGE NAME ON BUTTON WHEN SIGNUP IS CHECKED
    <Main>
      <LoginPageTop>
        <HeaderText>Circ(le) it!</HeaderText>
        <HeaderImg src={headerImg} alt="headerImg" />
      </LoginPageTop>
      <LoginPageBottom>
        <StartDiv>
          <StartText>Get going right away!</StartText>
          <StartButton type="submit" t>Start a workout</StartButton>
        </StartDiv>
        <LoginText>Want to be able to save workouts? Sign up here.</LoginText>
        <RadioDiv>
          <RadioDivSmall>
            <label htmlFor="signup">Sign up</label>
            <input
              type="radio"
              id="signup"
              checked={mode === 'signup'}
              onChange={() => setMode('signup')} />
          </RadioDivSmall>
          <RadioDivSmall>
            <label htmlFor="login">Log in</label>
            <input
              type="radio"
              id="login"
              checked={mode === 'login'}
              onChange={() => setMode('login')} />
          </RadioDivSmall>
        </RadioDiv>
        <SubmitForm onSubmit={onFormSubmit}>
          <FormDiv>
            <label htmlFor="username" />
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormDiv>
          <StartButton handleClick={onFormSubmit}>
            Log in
          </StartButton>
        </SubmitForm>
      </LoginPageBottom>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
  gap: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    max-width: 100vw;
    max-height: 100vh;
  }
`
const LoginPageTop = styled.div`
  @media (min-width: 1024px) {
    flex-basis: 20%;
  }
`
const HeaderImg = styled.img`
  display: flex;
  width: 100vw;
  object-fit: cover;
  object-position: center;

  @media (min-width: 1024px) {
    height: 30vh;
  }
`

const HeaderText = styled.h1`
  color: white;
  font-size: 45px;
  position: absolute;
  top: calc(10%);
  left: calc(10%);

  @media (min-width: 1024px) {
    font-size: 82px;
    top: calc(10%);
  }
`
const LoginPageBottom = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  align-self: center;

  @media (min-width: 1024px) {
    justify-content: center;
  }
`

const StartDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`

const StartText = styled.p`
  font-size: 24px;
`

const LoginText = styled.p`
  font-size: 12px;
  margin-top: 3em;
  margin-bottom: 0;
`

const RadioDiv = styled.div`
  display: flex;
  gap: 16px;
`

const RadioDivSmall = styled.div`
  align-items: center;
`

const FormDiv = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;
`

const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;

  input {
    border-radius: 10px;
    padding: 10px;
    border: none;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
  }
`
