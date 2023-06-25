/* eslint-disable max-len */
import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { welcome } from 'reducers/welcome'
import { API_URL } from 'utils/urls'
// import { user } from 'reducers/user'
import { Header } from 'lib/Header'
import { SquareButton } from 'lib/SquareButton'

//* This is where the logged in user can choose to go to recent, favorites, customize
//* workout and random.
export const Welcome = () => {
  const userName = useSelector((store) => store.user.username)
  const isNewUser = useSelector((store) => store.user.isNewUser)
  // const welcomeItems = useSelector((store) => store.welcome.items)
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  // const username = useSelector((store) => store.user.username)
  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
        // 'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      }
    }
    fetch(API_URL('welcome'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(welcome.actions.setError(null))
          dispatch(welcome.actions.setItems(data.response))
        } else {
          dispatch(welcome.actions.setError(data.response))
          dispatch(welcome.actions.setItems([]))
        }
      })
  })

  const renderWelcomeMessage = () => {
    if (isNewUser) {
      return `Welcome, ${userName}!`
    } else {
      return `Welcome back, ${userName}!`
    }
  }
  return (
    <Main>
      <Header headerTitle={renderWelcomeMessage()} />
      <PageContent>
        <StyledBtnGroup>
          <SquareButton buttonText="Recent" />
          <SquareButton buttonText="Favorite Workouts" />
          <SquareButton buttonText="Surprise Me" />
          <SquareButton buttonText="Custom Workout" />
        </StyledBtnGroup>
      </PageContent>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    padding: 0 20px 60px 20px;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

const StyledBtnGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  gap: 20px;
  justify-content: center;
  margin-top: 1rem;

  @media (min-width: 668px) {
    gap: 50px;
  }
`
const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`
