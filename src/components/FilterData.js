/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/workouts';
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'

export const FilterData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)

  const [filteredData, setFilteredData] = useState([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [lowImpactOnly, setLowImpactOnly] = useState(false)

  const musclegroups = ['legs', 'chest', 'arms', 'back', 'shoulders', 'abs']
  const equipment = ['none', 'dumbbells', 'kettlebell', 'jump rope', 'fitness band']

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
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
      const data = await response.json();
      setFilteredData(data.response);
    } catch (error) {
      console.error('Error fetching filtered exercises:', error);
    }
  };

  const handleMuscleGroupChange = (event) => {
    const checkedMuscleGroup = event.target.value;
    if (event.target.checked) {
      setSelectedMuscleGroups((prevSelected) => [...prevSelected, checkedMuscleGroup]);
    } else {
      setSelectedMuscleGroups((prevSelected) => prevSelected.filter((item) => item !== checkedMuscleGroup));
    }
  };

  const handleEquipmentChange = (event) => {
    const checkedEquipment = event.target.value;
    if (event.target.checked) {
      setSelectedEquipment((prevSelected) => [...prevSelected, checkedEquipment]);
    } else {
      setSelectedEquipment((prevSelected) => prevSelected.filter((item) => item !== checkedEquipment));
    }
  };

  const handleLowImpactToggle = (event) => {
    setLowImpactOnly(event.target.checked);
  };

  const handleSetList = () => {
    fetchFilteredData();
    dispatch(setList(filteredData))
    navigate('set-timer')
    console.log(filteredData)
  }

  return (
    <>
      <Header headerTitle="Customize workout" />
      {/* Render muscle group checkboxes */}
      {musclegroups.map((singleMuscleGroup) => (
        <div key={singleMuscleGroup}>
          <label htmlFor={singleMuscleGroup}>
            <input
              type="checkbox"
              id={singleMuscleGroup}
              value={singleMuscleGroup}
              checked={selectedMuscleGroups.includes(singleMuscleGroup)}
              onChange={handleMuscleGroupChange} />
            {singleMuscleGroup}
          </label>
        </div>
      ))}

      {/* Render equipment checkboxes */}
      {equipment.map((singleEquipment) => (
        <div key={singleEquipment}>
          <label htmlFor={singleEquipment}>
            <input
              type="checkbox"
              id={singleEquipment}
              value={singleEquipment}
              checked={selectedEquipment.includes(singleEquipment)}
              onChange={handleEquipmentChange} />
            {singleEquipment}
          </label>
        </div>
      ))}

      {/* Render the low impact switch */}
      <label htmlFor="lowImpact">
        <input
          type="checkbox"
          id="lowImpact"
          checked={lowImpactOnly}
          onChange={handleLowImpactToggle} />
        Low Impact Only
      </label>
      <button type="button" onClick={handleSetList}>Randomize</button>
    </>
  )
}
