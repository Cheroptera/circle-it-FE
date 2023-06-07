/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { setList } from 'reducers/exercises'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
import { ExerciseCard } from 'lib/ExerciseCard'
import { StartButton } from 'lib/StartButton'

//* This is where the random workout shows
export const RandomWorkout = () => {
  const [randomList, setRandomList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickEvent = () => {
    window.location.reload(true)
  }

  const handleSetList = () => {
    dispatch(setList(randomList))
    navigate('/set-timer')
  }

  useEffect(() => {
    fetch(API_URL('exercises/random'))
      .then((res) => res.json())
      .then((json) => {
        setRandomList(json.response)
      })
  }, [])

  return (
    <>
      <Header headerTitle="Todays workout" />
      <StyledList>
        <Ul>
          {randomList &&
            randomList.map((singleRandomExercise) => (
              <Li key={singleRandomExercise.name}>
                <ExerciseCard>{singleRandomExercise.name}</ExerciseCard>
              </Li>
            ))}
        </Ul>
      </StyledList>
      <ButtonWrapper>
        <StartButton buttonText="Set timer" handleClick={handleSetList} />
        <StartButton white buttonText="Regenerate" handleClick={handleClickEvent} />
      </ButtonWrapper>
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
  padding-left: 0;
`

const Li = styled.li`
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
