import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addWorkout } from 'reducers/exercises'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'
// import { toggleFavorite } from '../reducers/favorites'

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([])
  const [selectedCount, setSelectedCount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
      }
    }
    fetch(API_URL('exercises'), options)
      .then((res) => res.json())
      .then((json) => {
        const exercisesWithSelection = json.map((exercise) => ({
          ...exercise,
          isSelected: false
        }))
        setExerciseList(exercisesWithSelection);
        console.log(exercisesWithSelection)
      })
      .catch((error) => {
        console.error(error)
        navigate('/404')
      })
  }, [navigate, accessToken])

  const handleExerciseSelect = (exerciseId) => {
    /* eslint-disable-next-line max-len */
    setExerciseList((prevExerciseList) => prevExerciseList.map((exercise) => exercise.exerciseId === exerciseId
      ? { ...exercise, isSelected: !exercise.isSelected }
      : exercise));
  };

  useEffect(() => {
    const count = exerciseList.reduce((total, exercise) => {
      if (exercise.isSelected) {
        return total + 1;
      }
      return total;
    }, 0);
    setSelectedCount(count);
  }, [exerciseList]);

  const handleCreateWorkout = () => {
    const selectedExercises = exerciseList.filter((exercise) => exercise.isSelected)
    dispatch(addWorkout(selectedExercises))

    fetch(API_URL('workouts')) // Save the workout
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          navigate('/recent')
        } else {
          navigate('*')
          console.error('Failed to save workout')
        }
      })
      .catch((error) => {
        console.error('Failed to save workout:', error)
        navigate('*')
      });

    navigate('/set-timer')
  };

  return (
    <>
      <Header headerTitle="Choose your exercises" />
      <StyledList>
        {exerciseList.map((singleExercise) => (
          <CardAndLike key={singleExercise.name}>
            <SelectableExerciseCard
              type="button"
              onClick={() => handleExerciseSelect(singleExercise.exerciseId)}
              isSelected={singleExercise.isSelected}>
              <H3>{singleExercise.name}</H3>
            </SelectableExerciseCard>
            {/* <FavoriteCheckbox exerciseId={singleExercise.id} /> */}
          </CardAndLike>
        ))}
      </StyledList>
      <CreateWorkoutButton
        onClick={handleCreateWorkout}
        disabled={selectedCount !== 5}>
          Create Workout
      </CreateWorkoutButton>
    </>
  )
}

const StyledList = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`

const CardAndLike = styled.div`
  display: flex;
`

const H3 = styled.h3`
  margin: 0;
`

const SelectableExerciseCard = styled(ExerciseCard)`
cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#61C9A8' : '#9AFFDF')};

  &:hover {
    background-color: #61C9A8;
    border: #61C9A8;
  }
`

const CreateWorkoutButton = styled.button`
`

// const FavoriteCheckbox = ({ exerciseId }) => {
//   const dispatch = useDispatch()
//   const favorites = useSelector((store) => store.favorites || [])
//  This code checks if the exerciseId is in the user's favorites:
//   const isChecked = favorites.includes(exerciseId)

//   const handleCheckboxChange = () => {
//     dispatch(toggleFavorite(exerciseId))
//   }

//   return (
//     <FavoriteLabel isChecked={isChecked}>
//       <input
//         type="checkbox"
//         checked={isChecked}
//         onChange={handleCheckboxChange} />
//       ❤︎
//     </FavoriteLabel>
//   )
// // }

// const FavoriteLabel = styled.label`
//   font-size: 30px;
//   display: flex;
//   align-self: center;
//   justify-content: center;
//   cursor: pointer;
//   color: ${({ isChecked }) => (isChecked ? '#A53860' : 'inherit')};
//   position: relative;
//   padding-left: 30px;

//   &:hover {
//     color: #A53860;
//   }

//   input[type='checkbox'] {
//     position: absolute;
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   span {
//     position: absolute;
//     top: 0;
//     left: 0;
//   }

//   span:before {
//     content: '❤︎';
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     height: 100%;
//   }

//   input[type='checkbox']:checked + span:before {
//     color: #ffffff;
//     background-color: #A53860;
//   }
// `;

