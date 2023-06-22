/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/workouts'
import { API_URL } from 'utils/urls'
import { StartButton } from 'lib/StartButton'
import { ExerciseCard } from '../lib/ExerciseCard'
import { Header } from '../lib/Header'
import EditImg from '../images/edit.svg'

// * This is a list of all the favorites of a logged in user
export const Favorites = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken)
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'Access-Control-Allow-Origin': '*'
      }
    }
    fetch(API_URL('favorites'), options)
      .then((res) => res.json())
      .then((json) => {
        setFavoriteWorkouts(json.response)
        console.log(json.response)
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  }, [accessToken])

  const handleSelectedWorkout = (workout) => {
    setSelectedWorkout(workout)
  }

  const handleRenameClick = (workout) => {
    handleSelectedWorkout(workout)
    setShowAlert(true)
  }

  const handleSetList = (workout) => {
    dispatch(setList(workout.exercises))
    navigate('/todays')
  }

  const handleCardClick = (workout) => {
    handleSelectedWorkout(workout)
    handleSetList(workout)
  }

  const handleUpdateFavoriteName = (favoriteId, favoriteName) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ favoriteName })
    }

    fetch(API_URL(`favorites/${favoriteId}/update`), options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setFavoriteWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout) =>
              workout._id === favoriteId
                ? { ...workout, favoriteName }
                : workout
            )
          )
          setShowAlert(false)
        } else {
          console.error(json.response)
        }
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  }

  return (
    <Main>
      <MainWrapper>
        <Header headerTitle="Favorite workouts" />
        {favoriteWorkouts.length > 0 ? (
          favoriteWorkouts.map((singleWorkout) => (
            <ExerciseCardWrapper key={singleWorkout._id}>
              <ExerciseCard
                isSelected={selectedWorkout === singleWorkout}
                onClick={() => handleCardClick(singleWorkout)}>
                <H3>{singleWorkout.favoriteName}</H3>
              </ExerciseCard>
              <EditIcon
                src={EditImg}
                onClick={() => handleRenameClick(singleWorkout)}
                alt="rename"
              />
            </ExerciseCardWrapper>
          ))
        ) : (
          <Text>
            Nothing here! Finish a workout to save it to your favorites.
          </Text>
        )}
        {showAlert && (
          <AlertMessage
            favoriteWorkout={selectedWorkout}
            setSelectedWorkout={setSelectedWorkout}
            handleUpdateFavoriteName={handleUpdateFavoriteName}
            handleCloseAlert={() => setShowAlert(false)}
          />
        )}
      </MainWrapper>
    </Main>
  )
}

const Main = styled.div``

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    padding-bottom: 3rem;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`
const EditIcon = styled.img`
  width: 30px;
`

const ExerciseCardWrapper = styled.div`
  display: flex;
  align-self: center;
`

const H3 = styled.h3`
  margin: 0;
`

const Text = styled.p`
  text-align: center;
`

const AlertMessage = ({
  favoriteWorkout,
  handleUpdateFavoriteName,
  handleCloseAlert
}) => {
  const [renameInputValue, setRenameInputValue] = useState(
    favoriteWorkout.favoriteName
  )

  const handleRenameInputChange = (e) => {
    setRenameInputValue(e.target.value)
  }

  const handleRenameClick = () => {
    handleUpdateFavoriteName(favoriteWorkout._id, renameInputValue)
  }
  return (
    <Overlay>
      <AlertWindow>
        <TopBorder>
          <Xbutton type="button" onClick={handleCloseAlert}>
            X
          </Xbutton>
        </TopBorder>
        <MessageArea>
          <h2>Rename workout</h2>
          <RenameInput
            type="text"
            value={renameInputValue}
            onChange={handleRenameInputChange}
          />
          <StartButton buttonText="Rename" handleClick={handleRenameClick} />
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
  background-color: rgba(49, 49, 49, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const AlertWindow = styled.div`
  width: 300px;
  border: 3px #b0ebbd solid;
  border-radius: 10px 10px 5px 5px;
  position: absolute;
  background-color: white;
`

const RenameInput = styled.input`
  width: 150px;
  height: 35px;
  background-color: #f0f0f0;
  margin: 6px;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 3px solid #61c9a8;
  }
`

const TopBorder = styled.div`
  width: 100%;
  background-color: #b0ebbd;
  display: flex;
  justify-content: flex-end;
`
const Xbutton = styled.button`
  margin: 3px;
  cursor: pointer;
`

const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px 20px 20px;
`
