/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState } from 'react'
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
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false)

  const handleStart = () => {
    navigate('/set-timer')
  }
  const handleDescriptionBtnClick = () => {
    setShowDescriptionPopup(true)
  }

  const handleCloseDescriptionPopup = () => {
    setShowDescriptionPopup(false);
  };

  return (
    <>
      <Header headerTitle="Today&apos;s Workout" />
      <StyledList>
        <Ul>
          {workoutList &&
            workoutList.map((singleRandomExercise) => (
              <Li key={singleRandomExercise.name}>
                <TodaysCard>
                  <ExerciseImg src={singleRandomExercise.img} alt="exerciseImg" />
                  <DescriptionDiv>
                    <h3>{singleRandomExercise.name}</h3>
                    <DescriptionBtn type="button" onClick={handleDescriptionBtnClick}><p>{singleRandomExercise.description}</p><p>...</p></DescriptionBtn>
                  </DescriptionDiv>
                </TodaysCard>
                {showDescriptionPopup && (
                  <DescriptionPopup
                    message={singleRandomExercise.description}
                    handleClose={handleCloseDescriptionPopup} />
                )}
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

export const DescriptionBtn = styled.button`
border: none;
border-radius: 8px;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);
background-color: unset;
font-size: 12px;
width: 200px;
cursor: pointer;
text-align: inherit;
overflow:hidden;
text-overflow: ellipsis;
word-break: break-all;
white-space: nowrap;
display: flex;
flex-direction: column;

&:hover {
  opacity: 0.5;
}
@media (min-width: 700px){
  width: 420px;
}
`

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
height: 110px;
border-radius: 16px;
box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);

@media (min-width: 700px){
  width: 600px;
  height: 130px;
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
padding: 8px 10px 8px 0px;
gap: 8px;
width: 150px;

h3{
  margin: unset;
}

p{
  margin: unset;
  margin-top: 6px;
}
`

const DescriptionPopup = ({ message, handleClose }) => {
  return (
    <Overlay>
      <AlertWindow>
        <TopBorder>
          <Xbutton
            type="button"
            onClick={handleClose}>
            X
          </Xbutton>
        </TopBorder>
        <MessageArea>
          <p>{message}</p>
        </MessageArea>
      </AlertWindow>
    </Overlay>
  )
}

const Overlay = styled.section`
width: 100vw;
height: 100vh;
top: 0;
left: 0;
right: 0;
bottom: 0;
position: fixed;
background-color: rgba(49,49,49,0.8);
display: flex;
align-items: center;
justify-content: center;
`

const AlertWindow = styled.div`
width: 300px;
border: 3px #A53860 solid;
border-radius: 10px 10px 5px 5px;
position: absolute;
background-color: white;
`

const TopBorder = styled.div`
width: 100%;
background-color: #A53860;
display: flex;
justify-content: flex-end;
`
const Xbutton = styled.button`
margin: 3px;
cursor:pointer;
`
const MessageArea = styled.div`
padding: 0px 20px;
`
