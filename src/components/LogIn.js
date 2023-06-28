/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { user } from 'reducers/user'
import { API_URL } from 'utils/urls'
import styled from 'styled-components/macro'
import { StartButton } from 'lib/StartButton'
import headerImg from '../images/background3.svg'

// This is the page where the user can choose to either start a workout without
// logging in, sign up or log in.
export const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const error = useSelector((store) => store.user.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  const [alertMessage, setAlertMessage] = useState('')

  let buttonText

  if (mode === 'signup') {
    buttonText = 'Sign up'
  } else if (mode === 'login') {
    buttonText = 'Log in'
  }

  const handleRandomWorkoutClick = () => {
    navigate('/random')
  }
  useEffect(() => {
    if (accessToken) {
      navigate('/welcome')
    }
  }, [accessToken, navigate, dispatch])

  useEffect(() => {
    if (error) {
      if (error === 'User already exists') {
        setAlertMessage(
          'User already exists. Please choose a different username.'
        )
      } else if (error === 'Username and password do not match') {
        setAlertMessage('Username and password do not match. Please try again.')
      } else {
        setAlertMessage('An error occurred. Please try again later.')
      }
    }
  }, [error])

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
          dispatch(user.actions.setLoggedIn(true))

          const isNewUser = mode === 'signup'
          dispatch(user.actions.setNewUser(isNewUser))
          navigate('/welcome')
        } else {
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          if (
            mode === 'login' &&
            data.response === 'Credentials do not match'
          ) {
            setAlertMessage(
              'Username and password do not match. Please try again.'
            )
          } else if (
            mode === 'signup' &&
            data.response === 'User already exists'
          ) {
            setAlertMessage(
              'User already exists. Please choose a different username.'
            )
          } else {
            setAlertMessage('An error occurred. Please try again.')
          }
        }
      })
  }
  return (
    <Main>
      <MainWrapper>
        <LoginPageTop>
          <HeaderText>Circ(le) it!</HeaderText>
          <HeaderSubText> Circuit training made simple </HeaderSubText>
        </LoginPageTop>
        <LoginPageBottom>
          <StartDiv>
            <StartText>Get going right away!</StartText>
            <StartButton
              buttonText="Start a workout"
              onClick={handleRandomWorkoutClick}
            />
          </StartDiv>
          <LoginText>
            Sign up or log in to unlock more features.
          </LoginText>
          <RadioDiv>
            <RadioDivSmall>
              <label htmlFor="signup">Sign up</label>
              <input
                type="radio"
                id="signup"
                checked={mode === 'signup'}
                onChange={() => setMode('signup')}
              />
            </RadioDivSmall>
            <RadioDivSmall>
              <label htmlFor="login">Log in</label>
              <input
                type="radio"
                id="login"
                checked={mode === 'login'}
                onChange={() => setMode('login')}
              />
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
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormDiv>
            <StartButton buttonText={buttonText} handleClick={onFormSubmit} />
            {alertMessage && <AlertMessage message={alertMessage} />}
          </SubmitForm>
        </LoginPageBottom>
      </MainWrapper>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
  gap: 16px;
  display: flex;
  flex-direction: column;
`

const MainWrapper = styled.div`
  @media (min-width: 668px) {
    max-width: 660px;
    margin: 0 auto;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

const LoginPageTop = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  background-image: url(${headerImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 1024px) {
    flex-basis: 20%;
  }
`

const HeaderText = styled.h1`
  color: white;
  font-size: 45px;
  margin: 0;
  text-shadow: 6px 0px 5px rgba(0, 0, 0, 0.21);
  @media (min-width: 668px) {
    font-size: 48px;
  }
`

const HeaderSubText = styled.p`
  color: white;
  font-size: 16px;
  margin: 0;
  padding-bottom: 5rem;
  text-shadow: 6px 0px 5px rgba(0, 0, 0, 0.21);
  @media (min-width: 668px) {
    font-size: 24px;
  }
`

const LoginPageBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  align-self: center;
  padding-bottom: 2rem;

  @media (min-width: 668px) {
    justify-content: center;
    width: 660px;
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

const AlertMessage = ({ message }) => {
  const [showAlert, setShowAlert] = useState(false)

  const handleCloseAlert = () => {
    setShowAlert(true)
    window.location.reload()
  }
  if (!showAlert) {
    return (
      <Overlay>
        <AlertWindow>
          <TopBorder>
            <Xbutton type="button" onClick={handleCloseAlert}>
              X
            </Xbutton>
          </TopBorder>
          <MessageArea>
            <h2>Oooops!</h2>
            <p>{message}</p>
          </MessageArea>
        </AlertWindow>
      </Overlay>
    )
  } else {
    return null
  }
}

const Overlay = styled.section`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(49, 49, 49, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const AlertWindow = styled.div`
  width: 300px;
  border: 3px #BAE1FF solid;
  border-radius: 10px 10px 5px 5px;
  position: absolute;
  background-color: white;
`

const TopBorder = styled.div`
  width: 100%;
  background-color: #BAE1FF;
  display: flex;
  justify-content: flex-end;
`
const Xbutton = styled.button`
  margin: 3px;
  cursor: pointer;
`
const MessageArea = styled.div`
  padding: 0px 20px;
`
