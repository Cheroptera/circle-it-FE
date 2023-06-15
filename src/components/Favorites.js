/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { StartButton } from 'lib/StartButton'
import { GoToStartButton } from 'lib/GoToStartButton'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'

// * This is a list of all the favorites of a logged in user
export const Favorites = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    }
    fetch(API_URL('/favorites'), options)
      .then((res) => res.json())
      .then((json) => {
        setFavoriteWorkouts(json.response)
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  }, [accessToken])

  const handleSelectedWorkout = (workout) => {
    setSelectedWorkout(workout)
    console.log('set', workout)
  }

  const handleSetList = () => {
    if (selectedWorkout) {
      dispatch(setList(selectedWorkout.exercises))
      navigate('/todays')
    }
  }

  return (
    <Main>
      <MainWrapper>
        <Header headerTitle="Favorite workouts" />
        {favoriteWorkouts &&
          favoriteWorkouts.map((singleWorkout) => (
            <ExerciseCardWrapper key={singleWorkout.timestamp}>
              <ExerciseCard
                onClick={() => handleSelectedWorkout(singleWorkout)}
                isSelected={selectedWorkout === singleWorkout}>
                <H3>
                  {new Date(singleWorkout.timestamp).toLocaleDateString()}
                </H3>
              </ExerciseCard>
            </ExerciseCardWrapper>
          ))}
        <StartButton buttonText="Show exercises" onClick={handleSetList} />
        <GoToStartButton />
      </MainWrapper>
    </Main>
  )
}

const Main = styled.div`
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    padding-bottom: 3rem;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

const ExerciseCardWrapper = styled.div`
  display: flex;
  align-self: center;
`

const H3 = styled.h3`
  margin: 0;
`
