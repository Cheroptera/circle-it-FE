import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { useNavigate } from 'react-router-dom'

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
    <StyledList>
      <p>This is a list of all exercises</p>
      <ul>
        {exerciseList && exerciseList.map((singleExercise) => (
          <p key={singleExercise.name}>
            {singleExercise.name}
          </p>
        ))}
      </ul>
    </StyledList>
  )
}

const StyledList = styled.div`
display: flex; 
flex-direction:column; 
border: 2px solid green;
list-style-type:none;
`