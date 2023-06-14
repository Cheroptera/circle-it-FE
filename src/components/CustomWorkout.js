/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setList, setTimestamp } from 'reducers/workouts'
import { LogOutButton } from 'lib/LogOutButton'
import { StartButton } from 'lib/StartButton'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'

export const CustomWorkout = () => {
  const [exerciseList, setExerciseList] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const filteredList = useSelector((store) => store.filtered.filteredList)

  useEffect(() => {
    // Populate the exercise list when filteredList changes
    const updatedList = filteredList.map((exercise, index) => ({
      ...exercise,
      isSelected: false,
      number: null,
      index
    }));
    setExerciseList(updatedList);
  }, [filteredList]);

  const handleExerciseSelection = (index) => {
    const selectedCount = exerciseList.filter((exercise) => exercise.isSelected).length;
    const exerciseToUpdate = exerciseList.find((exercise) => exercise.index === index);

    if (exerciseToUpdate.isSelected) {
      // If the exercise is already selected, unselect it and update the numbers
      const deselectedNumber = exerciseToUpdate.number;
      exerciseToUpdate.isSelected = false;
      exerciseToUpdate.number = null;

      // Update the numbers of the remaining selected exercises
      exerciseList.forEach((exercise) => {
        if (exercise.isSelected && exercise.number > deselectedNumber) {
          exercise.number -= 1;
        }
      });
    } else if (selectedCount < 5) {
      // If the exercise is not selected and the maximum selection limit is not reached, select it and assign a number
      exerciseToUpdate.isSelected = true;
      exerciseToUpdate.number = selectedCount + 1;
    }

    setExerciseList([...exerciseList]);
  };

  const handleCreateWorkout = () => {
    const selectedExercises = exerciseList
      .filter((exercise) => exercise.isSelected)
      .map(({ isSelected, number, index, ...rest }) => ({
        ...rest,
        isSelected: false,
        number: null
      }));
    dispatch(setList(selectedExercises));
    dispatch(setTimestamp());
    navigate('/set-timer');
  };

  const selectedExerciseCount = exerciseList.filter((exercise) => exercise.isSelected).length;
  const isCreateWorkoutButtonDisabled = selectedExerciseCount !== 5;

  return (
    <>
      <Header headerTitle="Choose five exercises" />
      <Main>
        <ExerciseDiv>
          <StyledList>
            {exerciseList.map(({ name, isSelected, number, index }) => (
              <ExerciseCardWrapper key={index}>
                <ExerciseCard onClick={() => handleExerciseSelection(index)} isSelected={isSelected}>
                  <H3>{name}</H3>
                  {isSelected && <NumberWrapper>{number}</NumberWrapper>}
                </ExerciseCard>
              </ExerciseCardWrapper>
            ))}
          </StyledList>
          <StartButton buttonText="Create Workout" onClick={handleCreateWorkout} disabled={isCreateWorkoutButtonDisabled} />
        </ExerciseDiv>
        <LogOutButton />
      </Main>
    </>
  );
};

const Main = styled.div``;

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
