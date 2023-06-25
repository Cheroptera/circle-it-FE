import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { setList } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
import { ExerciseCard } from '../lib/ExerciseCard'
// import InfoIcon from '../images/info.svg'

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
    fetch(API_URL('recent'), options)
      .then((res) => res.json())
      .then((json) => {
        setRecentWorkouts(json.response)
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  }, [accessToken])

  const handleSelectedWorkout = (workout) => {
    setSelectedWorkout(workout)
  }

  const handleSetList = (workout) => {
    dispatch(setList(workout.exercises))
    navigate('/todays')
  }

  const handleCardClick = (workout) => {
    handleSelectedWorkout(workout)
    handleSetList(workout)
  }

  return (
    <RecentPage>
      <Header headerTitle="Your recent workouts" />
      {recentWorkouts.length > 0 ? (
        recentWorkouts.map((singleWorkout) => (
          <ExerciseCardWrapper key={singleWorkout.timestamp}>
            <ExerciseCard
              isSelected={selectedWorkout === singleWorkout}
              onClick={() => handleCardClick(singleWorkout)}>
              <H3>{new Date(singleWorkout.timestamp).toLocaleDateString()}</H3>
            </ExerciseCard>
            <div>
              {/* <InfoImg src={InfoIcon} alt="info" /> */}
            </div>
          </ExerciseCardWrapper>
        ))
      ) : (
        <Text>Nothing here! Finish a workout to make it show up!</Text>
      )}
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
  align-items: center;
  justify-content: center;
`

const H3 = styled.h3`
  margin: 0;
`

// const InfoImg = styled.img`
//   width: 30px;
// `

const Text = styled.p`
  text-align: center;
`
