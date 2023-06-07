import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'
import { toggleFavorite } from '../reducers/favorites'

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([])
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL('exercises', options))
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
    setExerciseList((prevExerciseList) => prevExerciseList.map((exercise) => {
      return exercise.id === exerciseId
        ? { ...exercise, isSelected: !exercise.isSelected }
        : exercise;
    }));
    console.log(exerciseList);
  };

  return (
    <>
      <Header headerTitle="Choose your exercises" />
      <StyledList>
        {exerciseList.map((singleExercise) => (
          <CardAndLike key={singleExercise.exerciseId}>
            <SelectableExerciseCard
              type="button"
              onClick={() => handleExerciseSelect(singleExercise.exerciseId)}
              isSelected={singleExercise.isSelected}>
              <H3>{singleExercise.name}</H3>
            </SelectableExerciseCard>
            <FavoriteCheckbox exerciseId={singleExercise.id} />
          </CardAndLike>
        ))}
      </StyledList>
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

const FavoriteCheckbox = ({ exerciseId }) => {
  const dispatch = useDispatch()
  const favorites = useSelector((store) => store.favorites || [])
  // This code checks if the exerciseId is in the user's favorites:
  const isChecked = favorites.includes(exerciseId)

  const handleCheckboxChange = () => {
    dispatch(toggleFavorite(exerciseId))
  }

  return (
    <FavoriteLabel isChecked={isChecked}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange} />
      ❤︎
    </FavoriteLabel>
  )
}
const FavoriteLabel = styled.label`
  font-size: 30px;
  display: flex;
  align-self: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ isChecked }) => (isChecked ? '#A53860' : 'inherit')};
  position: relative;
  padding-left: 30px;

  &:hover {
    color: #A53860;
  }

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
  }

  span:before {
    content: '❤︎';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  input[type='checkbox']:checked + span:before {
    color: #ffffff;
    background-color: #A53860;
  }
`;

