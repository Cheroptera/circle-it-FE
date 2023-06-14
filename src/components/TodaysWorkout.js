/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'
import { LogOutButton } from 'lib/LogOutButton'


//* This is where the random workout shows
export const TodaysWorkout = () => {
  const workoutList = useSelector((store) => store.workouts.list)
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/set-timer')
  }

  return (
    <>
      <Header headerTitle="Todays workout" />
      <StyledList>
        <Ul>
          {workoutList &&
            workoutList.map((singleRandomExercise) => (
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
        <StartButton buttonText="Set timer" handleClick={handleStart} />
      </ButtonWrapper>
      <LogOutButton />
    </>
  )
}

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Ul = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display:flex;
  flex-direction: column;
  gap: 16px;
`

export const Li = styled.li`
  display: flex;
  justify-content: center;
`

export const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
export const TodaysCard = styled.div`
border: solid #A53860 5px;
display: flex;
gap: 20px;
width: 350px;
height: fit-content;
border-radius: 16px;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);

@media (min-width: 700px){
  width: 600px;
}
`
export const ExerciseImg = styled.img`
height: 100px;
border-radius: 16px;

@media (min-width: 700px){
  height: 130px;
}
`

export const DescriptionDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
padding: 16px 10px 16px 0px;

h3{
  margin: unset;
}

p{
  margin: unset;
  margin-top: 6px;
}
`
