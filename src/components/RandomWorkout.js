/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { API_URL } from 'utils/urls'
import { Button } from 'lib/Button'
import { Header } from '../lib/Header'

export const RandomWorkout = () => {
  const [randomList, setRandomList] = useState([])

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
        <ul>
          {randomList &&
            randomList.map((singleRandomExercise) => (
              <li key={singleRandomExercise.name}>
                {singleRandomExercise.name}
              </li>
            ))}
        </ul>
      </StyledList>
      <Link to="/set-timer">
        <Button>Set rounds</Button>
      </Link>
    </>
  )
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
`
