/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setList } from 'reducers/exercises'
import { API_URL } from 'utils/urls'
import { setFilteredEquipmentList } from 'reducers/filteredWorkout';

export const SetEquipment = () => {
// State variables to store selected muscle groups and equipment
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [filteredWorkout, setFilteredWorkout] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
        Authorization: accessToken
      }
    }
    // Fetch equipment options from the API endpoint
    const fetchEquipmentOptions = () => {
      fetch(API_URL('/exercises/equipment'), options)
        .then((res) => res.json())
        .then((data) => {
          setSelectedEquipment(data.response);
        })
        .catch((error) => {
          console.error('Error fetching equipment options:', error);
        });
    };

    fetchEquipmentOptions();
  }, [accessToken]);

  // Event handler for equipment checkboxes
  const handleEquipmentChange = (event) => {
    const equipment = event.target.value;
    if (event.target.checked) {
      dispatch(setFilteredEquipmentList([...selectedEquipment, equipment]));
    } else {
      dispatch(setFilteredEquipmentList(selectedEquipment.filter((item) => item !== equipment)));
    }
  };

  // Function to handle the random workout request
  const HandleRandomWorkout = () => {
    const equipmentQuery = useSelector((store) => store.filteredWorkout.list)
    const inclusion = selectedEquipment.includes(equipmentQuery) ? 'in' : 'nin';
    const QUERY_API_URL = `/exercises/random?equipment=${equipmentQuery}&inclusion=${inclusion}`;
    fetch(QUERY_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setFilteredWorkout(data.response);
      })
    dispatch(setList(filteredWorkout))
    navigate('/set-timer')
  }
  // const muscleGroupsQuery = selectedMuscleGroups.join(',');

  // Make the API request with the constructed query parameters
  // Use the 'inclusion' parameter to determine whether to use 'in' or 'nin'
  // Make the API request using the constructed apiUrl

  return (
    <>
      <p>Välj utrustning dårå!</p>
      {/* Render equipment checkboxes */}
      {selectedEquipment.map((equipment) => (
        <div key={equipment}>
          <label htmlFor={equipment}>
            <input
              type="checkbox"
              value={equipment}
              onChange={handleEquipmentChange} />
            {equipment}
          </label>
        </div>
      ))}

      {/* Add a button to trigger the random workout request */}
      <button type="button" onClick={HandleRandomWorkout}>Generate Random Workout</button>
    </>
  );
}

// Make sure to replace muscleGroups and equipmentOptions with the state variables where you store the fetched data.
// With this implementation, the muscle group and equipment checkboxes will be rendered dynamically based on the data retrieved from your backend API.
// Whenever the data is fetched, the checkboxes will be updated accordingly.
// Remember to handle the checkbox change events and construct the query parameters as explained in the previous response.