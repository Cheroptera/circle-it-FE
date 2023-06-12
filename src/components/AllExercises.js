import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { API_URL } from 'utils/urls';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setList, setTimestamp } from 'reducers/workouts';
import { ExerciseCard } from '../lib/ExerciseCard';
import { Header } from '../lib/Header';

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    };
    fetch(API_URL('exercises'), options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        // Add isSelected property to each exercise object
        const exercisesWithSelection = json.map((exercise) => ({
          ...exercise,
          isSelected: false
        }));
        setExerciseList(exercisesWithSelection);
      })
      .catch((error) => {
        console.error(error);
        navigate('/404');
      });
  }, [navigate, accessToken]);

  const handleExerciseSelection = (exerciseName) => {
    setExerciseList((prevList) => prevList.map((exercise) => {
      if (exercise.name === exerciseName) {
        return {
          ...exercise,
          isSelected: !exercise.isSelected // Toggle isSelected value
        };
      }
      return exercise;
    }));
  };

  const handleCreateWorkout = () => {
    const selectedExercises = exerciseList.filter((exercise) => exercise.isSelected);
    dispatch(setList(selectedExercises)); // Dispatch the setList action
    dispatch(setTimestamp()); // Dispatch the setTimestamp action

    // Save the workout
    fetch(API_URL('workouts'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
      },
      body: JSON.stringify({ exercises: selectedExercises })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('hallå', json)
        if (json.success) {
          navigate(`/set-timer?workoutId=${json.workoutId}`);
        } else {
          console.error('Failed to save workout');
        }
      })
      .catch((error) => {
        console.error('Failed to save workout:', error);
      });

    navigate('/set-timer');
  };

  const selectedExeciseCount = exerciseList.filter((exercise) => exercise.isSelected).length
  const isCreateWorkoutButtonDisabled = selectedExeciseCount !== 5

  return (
    <>
      <Header headerTitle="Choose your exercises" />
      <StyledList>
        {exerciseList.map((singleExercise) => (
          <ExerciseCardWrapper key={singleExercise.name}>
            <ExerciseCard
              onClick={() => handleExerciseSelection(singleExercise.name)}
              isSelected={singleExercise.isSelected}>
              <H3>{singleExercise.name}</H3>
            </ExerciseCard>
          </ExerciseCardWrapper>
        ))}
      </StyledList>
      <CreateWorkoutButton onClick={handleCreateWorkout} disabled={isCreateWorkoutButtonDisabled}>
        Create Workout
      </CreateWorkoutButton>
    </>
  );
};

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExerciseCardWrapper = styled.div`
  display: flex;
`;

const H3 = styled.h3`
  margin: 0;
`;

const CreateWorkoutButton = styled.button``;
