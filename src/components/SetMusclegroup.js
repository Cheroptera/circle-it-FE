import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/exercises'
import { API_URL } from 'utils/urls'
import styled from 'styled-components/macro'
import { Header } from 'lib/Header'
import { StartButton } from 'lib/StartButton'

export const SetMuscleGroup = ({ workout, generateWorkout }) => {
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);

  // Fetch muscle groups from the API endpoint
  const fetchMuscleGroups = () => {
    fetch(API_URL('/exercises/musclegroups'), options)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMuscleGroups(data.response);
      })
      .catch((error) => {
        console.error('Error fetching muscle groups:', error);
      });
  };

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  // Event handler for muscle group checkboxes
  const handleMuscleGroupChange = (event) => {
    const muscleGroup = event.target.value;
    if (event.target.checked) {
      setSelectedMuscleGroups((prevSelected) => [...prevSelected, muscleGroup]);
    } else {
      setSelectedMuscleGroups((prevSelected) => prevSelected.filter((group) => group !== muscleGroup));
    }
  };

  // Make the API request with the constructed query parameters
  const inclusion = inclusionCheckbox.checked ? 'in' : 'nin';
  const queryAPI_URL = `/exercises/random?muscleGroups=${muscleGroupsQuery}&inclusion=${inclusion}`;

  const handleRandomWorkout = () => {
  // const muscleGroupsQuery = selectedMuscleGroups.join(',');
    return (
      <>
        <Header headerTitle="Todays workout" />
        <div>
       Include Muscle Group:
          {/* Render muscle group checkboxes */}
          {selectedMuscleGroups.map((muscleGroup) => (
            <div key={muscleGroup}>
              <label htmlFor={muscleGroup}>
                <input
                  type="checkbox"
                  value={muscleGroup}
                  onChange={handleMuscleGroupChange} />
                {muscleGroup}
              </label>
            </div>
          ))}
          <button type="button" onClick={handleRandomWorkout}>Generate Random Workout</button>
          {/* ) : (
          <p>No exercises found</p>
        ) */}
        </div>
        <StartButton buttonText="Set timer" handleClick={handleSetList} />
      </>
    )
  }
}