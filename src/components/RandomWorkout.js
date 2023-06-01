/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'

export const RandomWorkout = () => {
  const [randomList, setRandomList] = useState([])

  useEffect(() => {
    fetch(API_URL('exercises/random'))
      .then((res) => res.json())
      .then((json) => {
        setRandomList(json.response)
      });
  }, []);

  return (
    <StyledList>
      <p>This is a random list</p>
      <ul>
        {randomList && randomList.map((singleRandomExercise) => (
          <li key={singleRandomExercise.name}>
            {singleRandomExercise.name}
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