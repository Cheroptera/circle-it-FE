/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { setList, setTimestamp } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
// import { ExerciseCard } from 'lib/ExerciseCard'
import { StartButton } from 'lib/StartButton'
import { Loading } from 'lib/Loading'
import { LogOutButton } from 'lib/LogOutButton'
import { StyledList, Ul, Li, TodaysCard, ExerciseImg, DescriptionDiv, DescriptionBtn } from './TodaysWorkout'

//* This is where the random workout shows
export const RandomWorkout = () => {
  const [loading, setLoading] = useState(true)
  const [randomList, setRandomList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn)

  const handleClickEvent = () => {
    window.location.reload()
  }

  const handleLogInClick = () => {
    navigate('/')
  }

  const handleSetList = () => {
    dispatch(setList(randomList))
    dispatch(setTimestamp()) // Dispatch the setTimestamp action
    navigate('/set-timer')
  }

  useEffect(() => {
    fetch(API_URL('exercises/random'))
      .then((res) => res.json())
      .then((json) => {
        setRandomList(json.response)
        setLoading(false)
      })
  }, [])

  return (

    <Main>
      <Header headerTitle="Today&apos;s Workout" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <StyledList>
            <Ul>
              {randomList &&
                randomList.map((singleRandomExercise) => (
                  <Li key={singleRandomExercise.name}>
                    <TodaysCard>
                      <ExerciseImg src={singleRandomExercise.img} alt="exerciseImg" />
                      <DescriptionDiv>
                        <h3>{singleRandomExercise.name}</h3>
                        <DescriptionBtn type="button"><p>{singleRandomExercise.description}</p><p>...</p></DescriptionBtn>
                      </DescriptionDiv>
                    </TodaysCard>
                  </Li>
                ))}
            </Ul>
          </StyledList>
          <ButtonWrapper>
            <StartButton buttonText="Set timer" handleClick={handleSetList} />
            <StartButton white buttonText="Regenerate" handleClick={handleClickEvent} />
          </ButtonWrapper>
          {!isLoggedIn && (
            <LogInBtn type="button" onClick={handleLogInClick}>
              Log In
            </LogInBtn>
          )}
          {isLoggedIn && (
            <LogOutButton />
          )}
        </>
      )}
    </Main>

  )
}

const Main = styled.div`
@media (min-width: 668px) {
  max-width: 660px;
  margin: auto;
  padding-bottom: 3rem;
  box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
}
`

const ButtonWrapper = styled.div`
      display: flex;
      justify-content: center;
      `

const LogInBtn = styled.button`
      color: white;
      font-size: 20px;
      border: none;
      background-color: unset;
      position: absolute;
      top: 2px;
      right: 5px;
      `
