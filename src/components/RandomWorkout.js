/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { setList } from 'reducers/exercises';
import { API_URL } from 'utils/urls'
// import { Button } from 'lib/Button'
import { Header } from 'lib/Header';
import { ExerciseCard } from 'lib/ExerciseCard';

//* This is where the random workout shows
export const RandomWorkout = () => {
  const [randomList, setRandomList] = useState([])
  const dispatch = useDispatch()
  const handleSetList = () => {
    dispatch(setList(randomList));
  };

  useEffect(() => {
    fetch(API_URL('exercises/random'))
      .then((res) => res.json())
      .then((json) => {
        setRandomList(json.response)
      })
  }, [])

  return (
    <>
      <Header headerTitle="This is a random workout" />
      <StyledList>
        <p>This is a random list</p>
        <Ul>
          {randomList &&
            randomList.map((singleRandomExercise) => (
              <Li key={singleRandomExercise.name}>
                <ExerciseCard>
                  {singleRandomExercise.name}
                </ExerciseCard>
              </Li>
            ))}
        </Ul>
      </StyledList>
      <Link to="/set-timer" onClick={handleSetList}>Set timer</Link>
    </>
  )
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
  border: green solid 2px;
`

const Ul = styled.ul`
list-style-type: none;
`

const Li = styled.li`
display: flex;
justify-content: center;
`
