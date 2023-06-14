/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
  // const accessToken = useSelector((store) => store.user.accessToken)

  const [filteredData, setFilteredData] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [lowImpactOnly, setLowImpactOnly] = useState(false)

  const musclegroups = ['Legs', 'Chest', 'Arms', 'Back', 'Shoulders', 'Abs', 'Glutes']
  const equipment = ['None', 'Dumbbells', 'Kettlebell', 'Jump rope', 'Fitness band', 'Pilates ball', 'Weight plate']

  const options = {
    method: 'GET',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // Authorization: accessToken,
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    }
  };

  const fetchFilteredData = async () => {
    try {
      const query = new URLSearchParams({
        musclegroup: selectedMuscleGroups.join(','),
        equipment: selectedEquipment.join(','),
        impact: lowImpactOnly ? 'low' : ''
      });
      const response = await fetch(API_URL(`exercises/filter?${query}`), options)
      const data = await response.json()
      setFilteredData(data.response)
    } catch (error) {
      console.error('Error fetching filtered exercises:', error)
    }
  };

  useEffect(() => {
    dispatch(setFilteredList(filteredData));
  }, [dispatch, filteredData]);

  const handleMuscleGroupChange = (event) => {
    const checkedMuscleGroup = event.target.value
    if (event.target.checked) {
      setSelectedMuscleGroups((prevSelected) => [...prevSelected, checkedMuscleGroup])
    } else {
      setSelectedMuscleGroups((prevSelected) => prevSelected.filter((item) => item !== checkedMuscleGroup))
    }
  };

  const handleEquipmentChange = (event) => {
    const checkedEquipment = event.target.value
    console.log('tadaaa!')
    if (event.target.checked) {
      setSelectedEquipment((prevSelected) => [...prevSelected, checkedEquipment])
    } else {
      setSelectedEquipment((prevSelected) => prevSelected.filter((item) => item !== checkedEquipment))
    }
  };

  const handleLowImpactToggle = (event) => {
    setLowImpactOnly(event.target.checked)
  };

  const handleSetList = async () => {
    try {
      await fetchFilteredData()
      dispatch(setFilteredList(filteredData))
      navigate('/exercises')
    } catch (error) {
      console.error('Error setting filtered list:', error)
    }
  }

  return (
    <>
      <Header headerTitle="Customize workout" />
      <SelectionDiv>
        <EquipAndMuscle>
          {/* Render muscle group toggle switches */}
          <MuscleGroupDiv>
            <h3>Target</h3>
            {musclegroups.map((singleMuscleGroup) => (
              <ToggleContainer key={singleMuscleGroup}>
                <StyledToggle
                  id={singleMuscleGroup}
                  defaultChecked={selectedMuscleGroups.includes(singleMuscleGroup)}
                  onChange={handleMuscleGroupChange} />
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
                  defaultChecked={selectedEquipment.includes(singleEquipment)}
                  onChange={handleEquipmentChange} />
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
            onChange={handleLowImpactToggle} />
          <ToggleLabel htmlFor="lowImpact">Low Impact Only</ToggleLabel>
        </ToggleContainer>
        <StartButton buttonText="Next" onClick={handleSetList} />
      </SelectionDiv>
    </>
  )
}

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

h3{
  margin: 10px;
}
`

const EquipmentDiv = styled.div`
width: fit-content;

h3{
  margin: 10px;
}
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ToggleLabel = styled.label`
  margin-left: 0.5rem;
`;

const StyledToggle = styled(Toggle)`
  && {
    --toggle-hover-color-unchecked: #A53860;
    --toggle-hover-color-checked: #61304B;

    .react-toggle-track {
      background-color: #61304B;
    }

    &:hover:not(.react-toggle--checked) .react-toggle-track {
      background-color: var(--toggle-hover-color-unchecked);
    }

    &:hover.react-toggle--checked .react-toggle-track {
      background-color: var(--toggle-hover-color-checked);
    }

    .react-toggle-thumb {
      background-color: #fff;
      border: 1px solid #A53860;
    }

    &.react-toggle--checked .react-toggle-thumb,
    &.react-toggle--checked:hover .react-toggle-thumb {
      background-color: #fff;
    }

    &.react-toggle--checked .react-toggle-track {
      background-color: #A53860;
    }

    .react-toggle-track-check,
    .react-toggle-track-x {
      display: none;
    }

    .react-toggle-screenreader-only {
      display: none;
    }
  }
`;
