/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { setList, setTimestamp } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
// import { ExerciseCard } from 'lib/ExerciseCard'
import { StartButton } from 'lib/StartButton'
import { Loading } from 'lib/Loading'
import { StyledList, Ul, Li, TodaysCard, ExerciseImg, DescriptionDiv } from './TodaysWorkout'

//* This is where the random workout shows
export const RandomWorkout = () => {
  const [loading, setLoading] = useState(true);
  const [randomList, setRandomList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickEvent = () => {
    navigate('/random')
  }

  const handleLogInClick = () => {
    navigate('/')
  }

  const handleSetList = () => {
    dispatch(setList(randomList))
    dispatch(setTimestamp()) // Dispatch the setTimestamp action
    navigate('/set-timer')
  }

  useEffect(() => {
    fetch(API_URL('exercises/random'))
      .then((res) => res.json())
      .then((json) => {
        setRandomList(json.response)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Header headerTitle="Todays workout" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <StyledList>
            <Ul>
              {randomList &&
                randomList.map((singleRandomExercise) => (
                  <Li key={singleRandomExercise.name}>
                    <TodaysCard>
                      <ExerciseImg src={singleRandomExercise.img} alt="exerciseImg" />
                      <DescriptionDiv>
                        <h3>{singleRandomExercise.name}</h3>
                        <p>{singleRandomExercise.description}</p>
                      </DescriptionDiv>
                    </TodaysCard>
                  </Li>
                ))}
            </Ul>
          </StyledList>
          <ButtonWrapper>
            <StartButton buttonText="Set timer" handleClick={handleSetList} />
            <StartButton white buttonText="Regenerate" handleClick={handleClickEvent} />
          </ButtonWrapper>
          <LogInBtn type="button" onClick={handleLogInClick}>Log In</LogInBtn>
        </>
      )}
    </>
  )
}

// const StyledList = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const Ul = styled.ul`
//   list-style-type: none;
//   padding-left: 0;
// `

// const Li = styled.li`
//   display: flex;
//   justify-content: center;
// `

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`

const LogInBtn = styled.button`
color: white;
font-size: 20px;
border: none;
background-color: unset;
position: absolute;
top: 2px;
right: 5px;
`
