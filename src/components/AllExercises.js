/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setList, setTimestamp } from 'reducers/workouts'
import { LogOutButton } from 'lib/LogOutButton'
import { Loading } from 'lib/Loading'
import { StartButton } from 'lib/StartButton'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'

export const AllExercises = () => {
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    fetch(API_URL('exercises'), options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        // Add isSelected property to each exercise object
        const exercisesWithSelection = json.map((exercise) => ({
          ...exercise,
          isSelected: false
        }))
        setExerciseList(exercisesWithSelection)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        navigate('/404')
      })
  }, [navigate, accessToken])

  const handleExerciseSelection = (exerciseName) => {
    const selectedCount = exerciseList.filter((exercise) => exercise.isSelected).length
    const exerciseToUpdate = exerciseList.find((exercise) => exercise.name === exerciseName)

    if (exerciseToUpdate.isSelected) {
      // If the exercise is already selected, unselect it and update the numbers
      const deselectedNumber = exerciseToUpdate.number
      exerciseToUpdate.isSelected = false
      exerciseToUpdate.number = null

      // Update the numbers of the remaining selected exercises
      const updatedExerciseList = exerciseList.map((exercise) => {
        if (exercise.isSelected && exercise.number > deselectedNumber) {
          exercise.number -= 1
        }
        return exercise
      });

      setExerciseList(updatedExerciseList)
    } else if (selectedCount < 5) {
      // If the exercise is not selected and the maximum selection limit is not reached, select it and assign a number
      const isSelected = true;
      const number = selectedCount + 1

      exerciseToUpdate.isSelected = isSelected
      exerciseToUpdate.number = number

      setExerciseList([...exerciseList])
    }
  }

  const handleCreateWorkout = () => {
    const selectedExercises = exerciseList
      .filter((exercise) => exercise.isSelected)
      .map((exercise) => ({
        ...exercise,
        isSelected: false,
        number: null
      }))
    dispatch(setList(selectedExercises))
    dispatch(setTimestamp())
    navigate('/set-timer')
  }

  const selectedExerciseCount = exerciseList.filter((exercise) => exercise.isSelected).length
  const isCreateWorkoutButtonDisabled = selectedExerciseCount !== 5

  return (
    <>
      <Header headerTitle="Choose five exercises" />
      {loading ? (
        <Loading />
      ) : (
        <Main>
          <ExerciseDiv>
            <StyledList>
              {exerciseList.map((singleExercise) => (
                <ExerciseCardWrapper key={singleExercise.name}>
                  <ExerciseCard
                    onClick={() => handleExerciseSelection(singleExercise.name)}
                    isSelected={singleExercise.isSelected}>
                    <H3>{singleExercise.name}</H3>
                    <NumberWrapper>
                      <H3>{singleExercise.number}</H3>
                    </NumberWrapper>
                  </ExerciseCard>
                </ExerciseCardWrapper>
              ))}
            </StyledList>
            <StartButton buttonText="Create Workout" onClick={handleCreateWorkout} disabled={isCreateWorkoutButtonDisabled} />
          </ExerciseDiv>
          <LogOutButton />
        </Main>
      )}
    </>
  )
}

const Main = styled.div`
`

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  overflow-y: scroll;
  margin: 20px;
  `

const ExerciseDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ExerciseCardWrapper = styled.div`
  display: flex;
`

const H3 = styled.h3`
  margin: 0;
`

const NumberWrapper = styled.div`
color: #A53860;
font-size: 16px;
display: flex;
align-self: flex-end;
position:absolute;
right: calc(4%);
top: calc(-7px);
`
