import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/exercises'
import { API_URL } from 'utils/urls'
import styled from 'styled-components/macro'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'

export const SetMuscleGroup = ({ workout, generateWorkout }) => {
  const [filteredList, setFilteredList] = useState([])
  const [includeMuscleGroup, setIncludeMuscleGroup] = useState('')
  const [includeEquipment, setIncludeEquipment] = useState('')
  const [excludeMuscleGroup, setExcludeMuscleGroup] = useState('')
  const [excludeEquipment, setExcludeEquipment] = useState('')
  const [muscleGroups, setMuscleGroups] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSetList = () => {
    dispatch(setList(filteredList))
    navigate('/set-timer')
  }

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  const fetchMuscleGroups = async () => {
    try {
      const response = await fetch(API_URL('/muscleGroups'));
      const data = await response.json();
      setMuscleGroups(data);
    } catch (error) {
      console.error('Error fetching muscle groups:', error);
    }
  };

  useEffect(() => {
    const handleGenerateWorkout = () => {
      const queryParams = {
        includeMuscleGroup,
        includeEquipment,
        excludeMuscleGroup,
        excludeEquipment
      };
      generateWorkout(queryParams);
    }
  });

  return (
    <>
      <Header headerTitle="Todays workout" />
      <div>
       Include Muscle Group:
        {muscleGroups.map((muscleGroup) => (
          <div key={muscleGroup.id}>
            <input
              type="radio"
              id={muscleGroup.id}
              name="includeMuscleGroup"
              value={muscleGroup.name}
              checked={includeMuscleGroup === muscleGroup.name}
              onChange={(e) => setIncludeMuscleGroup(e.target.value)} />
            <label htmlFor={muscleGroup.id}>{muscleGroup.name}</label>
          </div>
        ))}
      </div>
      <div>
        Include Equipment:
        <input
          type="text"
          value={includeEquipment}
          onChange={(e) => setIncludeEquipment(e.target.value)} />
      </div>
      <div>
        Exclude Muscle Group:
        {muscleGroups.map((muscleGroup) => (
          <div key={muscleGroup.id}>
            <input
              type="radio"
              id={muscleGroup.id}
              name="excludeMuscleGroup"
              value={muscleGroup.name}
              checked={excludeMuscleGroup === muscleGroup.name}
              onChange={(e) => setExcludeMuscleGroup(e.target.value)} />
            <label htmlFor={muscleGroup.id}>{muscleGroup.name}</label>
          </div>
        ))}
      </div>
      <div>
        Exclude Equipment:
        <input
          type="text"
          value={excludeEquipment}
          onChange={(e) => setExcludeEquipment(e.target.value)} />
      </div>
      <div>
        {workout.length > 0 ? (
          <ul>
            {workout.map((exercise) => (
              <li key={exercise.name}>{exercise.name}</li>
            ))}
          </ul>
        ) : (
          <p>No exercises found</p>
        )}
      </div>
      <StartButton buttonText="Set timer" handleClick={handleSetList} />
    </>
  )
}