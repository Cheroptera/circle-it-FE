/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'
import { DescriptionPopup } from 'lib/DescriptionPopUp'

//* This is where the random workout shows
export const TodaysWorkout = () => {
  const workoutList = useSelector((store) => store.workouts.list)
  const navigate = useNavigate()
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)

  const handleStart = () => {
    navigate('/set-timer')
  }

  const handleDescriptionBtnClick = (exercise) => {
    setSelectedExercise(exercise)
    setShowDescriptionPopup(true)
  }

  const handleCloseDescriptionPopup = () => {
    setShowDescriptionPopup(false)
  }

  return (
    <Main>
      <Header headerTitle="Today's Workout" />
      <StyledList>
        <Ul>
          {workoutList &&
            workoutList.map((singleRandomExercise) => (
              <Li key={singleRandomExercise.name}>
                <TodaysCard>
                  <ExerciseImg
                    src={singleRandomExercise.img}
                    alt="exerciseImg"
                  />
                  <DescriptionDiv>
                    <h3>{singleRandomExercise.name}</h3>
                    <DescriptionBtn
                      type="button"
                      onClick={() => handleDescriptionBtnClick(singleRandomExercise)}>
                      See description
                    </DescriptionBtn>
                  </DescriptionDiv>
                </TodaysCard>
                {showDescriptionPopup && selectedExercise && (
                  <DescriptionPopup
                    img={selectedExercise.img}
                    exerciseName={selectedExercise.name}
                    message={selectedExercise.description}
                    handleClose={handleCloseDescriptionPopup}
                  />
                )}
              </Li>
            ))}
        </Ul>
      </StyledList>
      <ButtonWrapper>
        <StartButton buttonText="Let's go!" handleClick={handleStart} />
      </ButtonWrapper>
    </Main>
  )
}

const Main = styled.div`
  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

export const DescriptionBtn = styled.button`
display: flex;
justify-content: center;
background-color: unset;
border: 2px solid #BAE1FF;
box-shadow: 0px 8px 8px rgb(0 0 0 / 30%);
border-radius: 10px;
width: fit-content;
padding: 3px 5px;
`
export const StyledList = styled.div`
display: flex;
flex-direction: column;
gap: 16px;
`

export const Ul = styled.ul`
list-style-type: none;
padding-left: 0;
display: flex;
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
padding-bottom: 2rem;
`
export const TodaysCard = styled.div`
border: 1px solid #CDB0EE;
display: flex;
gap: 20px;
width: 350px;
height: 110px;
border-radius: 16px;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);

@media (min-width: 700px) {
  width: 600px;
  height: 130px;
}
`
export const ExerciseImg = styled.img`
height: 100px;
border-radius: 16px;

@media (min-width: 700px) {
  height: 130px;
}
`

export const DescriptionDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
padding: 8px 10px 8px 0px;
gap: 8px;
width: 150px;

h3 {
  margin: unset;
}

p {
  margin: unset;
  margin-top: 6px;
}
`