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
import { LogOutButton } from 'lib/LogOutButton'

//* This is where the logged in user can choose to go to recent, favorites, customize
//* workout and random.
export const Welcome = () => {
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
        // Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY

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

  // const onLogoutButtonClick = () => {
  //   dispatch(user.actions.setAccessToken(null))
  //   dispatch(user.actions.setUsername(null))
  //   dispatch(user.actions.setUserId(null))
  //   dispatch(user.actions.setError(null))
  //   dispatch(welcome.actions.setItems([]))
  //   navigate('/')
  // }
  return (
    <>
      <Header headerTitle="Welcome back! What do you want to do today?" />
      <PageContent>
        <StyledBtnGroup>
          <SquareButton buttonText="Recent" />
          <SquareButton buttonText="Favorite Workouts" />
          <SquareButton buttonText="Surprise Me" />
          <SquareButton buttonText="Custom Workout" />
        </StyledBtnGroup>
        {/* <StyledLogoutBtn type="button" onClick={onLogoutButtonClick}>Log Out</StyledLogoutBtn> */}
        <LogOutButton />
      </PageContent>
    </>
  )
}

// const StyledLogoutBtn = styled.button`
// border: 2px solid #A53860;
// background:white;
// justify-content:center;
// align-self: center;
// width: 30%;
// border-radius: 10px;
// padding: 20px;
// margin-top: 200px;
// `

const StyledBtnGroup = styled.div`
display: flex; 
flex-flow: wrap;
gap: 20px; 
justify-content: center; 
margin-top: 1rem; 
`
const PageContent = styled.div`
display: flex; 
flex-direction: column; 
`