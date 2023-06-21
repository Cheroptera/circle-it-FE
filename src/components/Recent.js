import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { setList } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { StartButton } from 'lib/StartButton'
import { GoToStartButton } from 'lib/GoToStartButton'
import { Header } from 'lib/Header'
import { ExerciseCard } from '../lib/ExerciseCard'

export const Recent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [recentWorkouts, setRecentWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken)

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
    fetch(API_URL('/recent'), options)
      .then((res) => res.json())
      .then((json) => {
        setRecentWorkouts(json.response)
        console.log(json)
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
    <RecentPage>
      <Header headerTitle="Your recent workouts" />
      {recentWorkouts.length > 0 ? (
        recentWorkouts.map((singleWorkout) => (
          <ExerciseCardWrapper key={singleWorkout.timestamp}>
            <ExerciseCard
              onClick={() => handleSelectedWorkout(singleWorkout)}
              isSelected={selectedWorkout === singleWorkout}>
              <H3>{new Date(singleWorkout.timestamp).toLocaleDateString()}</H3>
            </ExerciseCard>
          </ExerciseCardWrapper>
        ))
      ) : (
        <p>No recent workouts</p>
      )}
      <StartButton buttonText="Show exercises" onClick={handleSetList} />
      <GoToStartButton />
    </RecentPage>
  )
}

const RecentPage = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  height: 100vh;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
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
