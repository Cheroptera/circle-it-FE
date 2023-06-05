import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'
import { Favorites } from './Favorites'

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API_URL('exercises'))
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
  }, [navigate])

  const handleExerciseSelect = (exerciseId) => {
    setExerciseList((prevExerciseList) =>
      prevExerciseList.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, isSelected: !exercise.isSelected }
          : exercise));
    console.log(exerciseList)
  };

  return (
    <>
      <Header headerTitle="Choose your exercises" />
      <StyledList>
        {exerciseList.map((singleExercise) => (
          <CardAndLike key={singleExercise.id}>
            <SelectableExerciseCard
              type="button"
              onClick={() => handleExerciseSelect(singleExercise.id)}
              isSelected={singleExercise.isSelected}>
              <H3>{singleExercise.name}</H3>
            </SelectableExerciseCard>
            <FavoriteCheckbox exerciseId={singleExercise.id} />
          </CardAndLike>
        ))}
      </StyledList>
      <Favorites />
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

const FavoriteCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
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

