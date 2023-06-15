/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilteredList } from 'reducers/filtered'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'

export const FilterData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)

  const [exerciseList, setExerciseList] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [lowImpactOnly, setLowImpactOnly] = useState(false)

  const musclegroups = [
    'legs',
    'chest',
    'arms',
    'back',
    'shoulders',
    'abs',
    'glutes'
  ]
  const equipment = [
    'none',
    'dumbbells',
    'kettlebell',
    'jump rope',
    'fitness band',
    'box',
    'weight plate'
  ]

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
    fetch(API_URL('exercises'), options)
      .then((res) => res.json())
      .then((json) => {
        setExerciseList(json)
        console.log(json)
      })
      .catch((error) => {
        console.error(error)
        navigate('/404')
      })
  }, [accessToken, navigate])

  const handleMuscleGroupChange = (event) => {
    const checkedMuscleGroup = event.target.value
    if (event.target.checked) {
      setSelectedMuscleGroups((prevSelected) => [
        ...prevSelected,
        checkedMuscleGroup
      ])
    } else {
      setSelectedMuscleGroups((prevSelected) =>
        prevSelected.filter((item) => item !== checkedMuscleGroup)
      )
    }
  }

  const handleEquipmentChange = (event) => {
    const checkedEquipment = event.target.value
    if (event.target.checked) {
      setSelectedEquipment((prevSelected) => [
        ...prevSelected,
        checkedEquipment
      ])
    } else {
      setSelectedEquipment((prevSelected) =>
        prevSelected.filter((item) => item !== checkedEquipment)
      )
    }
  }

  const handleLowImpactToggle = (event) => {
    setLowImpactOnly(event.target.checked)
  }

  const handleFilteredData = () => {
    console.log('selectedMuscleGroups:', selectedMuscleGroups)
    console.log('selectedEquipment:', selectedEquipment)
    console.log('lowImpactOnly:', lowImpactOnly)
    console.log('exerciseList:', exerciseList)
    const filteredData = exerciseList.filter((exercise) => {
      const muscleGroupsMatch =
        selectedMuscleGroups.length === 0 ||
        exercise.musclegroup.some((group) =>
          selectedMuscleGroups.includes(group)
        )
      const equipmentMatch =
        selectedEquipment.length === 0 ||
        exercise.equipment.some((eq) => selectedEquipment.includes(eq))
      const lowImpactMatch = !lowImpactOnly || !exercise.highImpact
      return (muscleGroupsMatch || equipmentMatch) && lowImpactMatch // Modify this line
    })
    console.log(filteredData)
    dispatch(setFilteredList(filteredData))
    navigate('/exercises')
  }

  return (
    <Main>
      <MainWrapper>
        <Header headerTitle="Customize Workout" />
        <SelectionDiv>
          <EquipAndMuscle>
            {/* Render muscle group toggle switches */}
            <MuscleGroupDiv>
              <h3>Target</h3>
              {musclegroups.map((singleMuscleGroup) => (
                <ToggleContainer key={singleMuscleGroup}>
                  <StyledToggle
                    id={singleMuscleGroup}
                    value={singleMuscleGroup}
                    defaultChecked={selectedMuscleGroups.includes(
                      singleMuscleGroup
                    )}
                    onChange={handleMuscleGroupChange}
                  />
                  <ToggleLabel htmlFor={singleMuscleGroup}>
                    {singleMuscleGroup}
                  </ToggleLabel>
                </ToggleContainer>
              ))}
            </MuscleGroupDiv>

            {/* Render equipment toggle switches */}
            <EquipmentDiv>
              <h3>Equipment</h3>
              {equipment.map((singleEquipment) => (
                <ToggleContainer key={singleEquipment}>
                  <StyledToggle
                    id={singleEquipment}
                    value={singleEquipment}
                    defaultChecked={selectedEquipment.includes(singleEquipment)}
                    onChange={handleEquipmentChange}
                  />
                  <ToggleLabel htmlFor={singleEquipment}>
                    {singleEquipment}
                  </ToggleLabel>
                </ToggleContainer>
              ))}
            </EquipmentDiv>
          </EquipAndMuscle>

          {/* Render the low impact switch */}
          <ToggleContainer>
            <StyledToggle
              id="lowImpact"
              defaultChecked={lowImpactOnly}
              onChange={handleLowImpactToggle}
            />
            <ToggleLabel htmlFor="lowImpact">Low Impact Only</ToggleLabel>
          </ToggleContainer>
          <StartButton buttonText="Next" onClick={handleFilteredData} />
        </SelectionDiv>
      </MainWrapper>
    </Main>
  )
}

const Main = styled.div``

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 668px) {
    max-width: 660px;
    margin: auto;
    padding-bottom: 3rem;
    box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
  }
`

const SelectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  gap: 20px;
`

const EquipAndMuscle = styled.div`
  display: flex;
  gap: 30px;
`
const MuscleGroupDiv = styled.div`
  width: fit-content;

  h3 {
    margin: 10px;
  }
`

const EquipmentDiv = styled.div`
  width: fit-content;

  h3 {
    margin: 10px;
  }
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const ToggleLabel = styled.label`
  margin-left: 0.5rem;
`

const StyledToggle = styled(Toggle)`
  && {
    --toggle-hover-color-unchecked: #a53860;
    --toggle-hover-color-checked: #9affdf;

    .react-toggle-track {
      background-color: #61304b;
    }

    &:hover:not(.react-toggle--checked) .react-toggle-track {
      background-color: var(--toggle-hover-color-unchecked);
    }

    &:hover.react-toggle--checked .react-toggle-track {
      background-color: var(--toggle-hover-color-checked);
    }

    .react-toggle-thumb {
      background-color: #fff;
      border: 1px solid #a53860;
    }

    &.react-toggle--checked .react-toggle-thumb,
    &.react-toggle--checked:hover .react-toggle-thumb {
      background-color: #fff;
    }

    &.react-toggle--checked .react-toggle-track {
      background-color: #61c9a8;
    }

    .react-toggle-track-check,
    .react-toggle-track-x {
      display: none;
    }

    .react-toggle-screenreader-only {
      display: none;
    }
  }
`
