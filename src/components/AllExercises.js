import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

export const AllExercises = () => {
  const [exerciseList, setExerciseList] = useState([])

  useEffect(() => {
    fetch('https://circle-it-be-3qae2ggbxq-no.a.run.app/exercises')
      .then((res) => res.json())
      .then((json) => {
        setExerciseList(json.results);
      });
  }, []);

  return (
    <StyledList>
      <p>This is a list of all exercises</p>
      <ul>
        {exerciseList && exerciseList.map((singleExercise) => (
          <li key={singleExercise.name}>
            {singleExercise.name}
          </li>
        ))}
      </ul>
    </StyledList>
  )
}

const StyledList = styled.div`
display: flex; 
flex-direction:column; 
border: 2px solid green;
`