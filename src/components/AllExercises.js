import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'
import { ExerciseCard } from 'lib/ExerciseCard'
import { Header } from '../lib/Header'

// * This is a list of all exercises
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
      <Header headerTitle="This is a list of all exercises" />
      <StyledList>
        {exerciseList && exerciseList.map((singleExercise) => (
          <div>
            <StyledExerciseTitle key={singleExercise.name}>
              <ExerciseCard>
                {singleExercise.name}
                <FavoriteBtn type="button">❤︎</FavoriteBtn>
              </ExerciseCard>
            </StyledExerciseTitle>
          </div>
        ))}
      </StyledList>
    </>
  )
}

const StyledList = styled.div`
display: flex; 
flex-direction:column; 
border: 2px solid green;
height: 100vh;
`

const StyledExerciseTitle = styled.h3`
display: flex;
justify-content: center;
`

const FavoriteBtn = styled.button`
border: none;
background: none;
display: flex;
align-self: center;
`