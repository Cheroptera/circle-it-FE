import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { ExerciseCard } from 'lib/ExerciseCard'
import { Header } from '../lib/Header'
import { Favorites } from './Favorites'

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API_URL('exercises'))
      .then((res) => res.json())
      .then((json) => {
        setExerciseList(json);
      })
      .catch((error) => {
        console.error(error)
        navigate('/404')
      })
  }, [navigate])

  return (
    <>
      <Header headerTitle="Choose your exercises" />
      <StyledList>
        {exerciseList && exerciseList.map((singleExercise) => (
          <CardAndLike key={singleExercise.name}>
            <ExerciseCard>
              <H3>{singleExercise.name}</H3>
            </ExerciseCard>
            <FavoriteCheckbox exerciseId={singleExercise.id} />
          </CardAndLike>
        ))}
      </StyledList>
      <Favorites exerciseList={exerciseList} />
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

const FavoriteCheckbox = ({ exerciseId }) => {
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

