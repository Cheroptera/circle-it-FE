import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { StartButton } from 'lib/StartButton'
import { LogOutButton } from 'lib/LogOutButton'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'

// * This is a list of all the favorites of a logged in user
export const Favorites = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken)
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState([]);

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
        console.log(json)
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  }, [])

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
    <>
      <Header headerTitle="Favorite workouts" />
      <Main>
        {favoriteWorkouts && favoriteWorkouts.map((singleWorkout) => (
          <ExerciseCardWrapper key={singleWorkout.timestamp}>
            <ExerciseCard
              onClick={() => handleSelectedWorkout(singleWorkout)}
              isSelected={selectedWorkout === singleWorkout}>
              <H3>{new Date(singleWorkout.timestamp).toLocaleDateString()}</H3>
            </ExerciseCard>
          </ExerciseCardWrapper>
        ))}
        <StartButton buttonText="Show exercises" onClick={handleSetList} />
        <LogOutButton />
      </Main>
    </>
  )
}

const Main = styled.div``;

const ExerciseCardWrapper = styled.div`
  display: flex;
`

const H3 = styled.h3`
  margin: 0;
`