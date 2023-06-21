/* eslint-disable react/jsx-closing-bracket-location */
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
import { DescriptionPopup } from 'lib/DescriptionPopUp'
import {
  StyledList,
  Ul,
  Li,
  TodaysCard,
  ExerciseImg,
  DescriptionDiv,
  DescriptionBtn
} from './TodaysWorkout'

//* This is where the random workout shows
export const RandomWorkout = () => {
  const [loading, setLoading] = useState(true)
  const [randomList, setRandomList] = useState([])
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickEvent = () => {
    window.location.reload()
  }

  const handleDescriptionBtnClick = () => {
    setShowDescriptionPopup(true)
  }

  const handleCloseDescriptionPopup = () => {
    setShowDescriptionPopup(false)
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
    <Main>
      <Header headerTitle="Today's Workout" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ButtonWrapper>
            <StartButton buttonText="Let's go!" handleClick={handleSetList} />
            <StartButton
              white
              buttonText="Randomise again"
              handleClick={handleClickEvent}
            />
          </ButtonWrapper>
          <StyledList>
            <Ul>
              {randomList &&
                randomList.map((singleRandomExercise) => (
                  <Li key={singleRandomExercise.name}>
                    <TodaysCard>
                      <ExerciseImg
                        src={singleRandomExercise.img}
                        alt="exerciseImg"
                      />
                      <DescriptionDiv>
                        <h3>{singleRandomExercise.name}</h3>
                        <DescriptionBtn onClick={handleDescriptionBtnClick} type="button">
                          See description
                        </DescriptionBtn>
                      </DescriptionDiv>
                    </TodaysCard>
                    {showDescriptionPopup && (
                      <DescriptionPopup
                        img={singleRandomExercise.img}
                        exerciseName={singleRandomExercise.name}
                        message={singleRandomExercise.description}
                        handleClose={handleCloseDescriptionPopup}
                      />
                    )}
                  </Li>
                ))}
            </Ul>
          </StyledList>
        </>
      )}
    </Main>
  )
}

const Main = styled.div`
  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    padding-bottom: 3rem;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
