/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls'

export const SetEquipment = () => {
// State variables to store selected muscle groups and equipment
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const accessToken = useSelector((store) => store.user.accessToken)

  // Assuming you retrieve the data from an API endpoint
  // Fetch muscle groups from the API endpoint
  // const fetchMuscleGroups = () => {
  //   fetch(API_URL('/exercises/musclegroups'), options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSelectedMuscleGroups(data.response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching muscle groups:', error);
  //     });
  // };

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

    // fetchMuscleGroups();
    fetchEquipmentOptions();
  }, [accessToken]);

  // Event handler for muscle group checkboxes
  // const handleMuscleGroupChange = (event) => {
  //   const muscleGroup = event.target.value;
  //   if (event.target.checked) {
  //     setSelectedMuscleGroups((prevSelected) => [...prevSelected, muscleGroup]);
  //   } else {
  //     setSelectedMuscleGroups((prevSelected) => prevSelected.filter((group) => group !== muscleGroup));
  //   }
  // };

  // Event handler for equipment checkboxes
  const handleEquipmentChange = (event) => {
    const equipment = event.target.value;
    if (event.target.checked) {
      setSelectedEquipment((prevSelected) => [...prevSelected, equipment]);
    } else {
      setSelectedEquipment((prevSelected) => prevSelected.filter((item) => item !== equipment));
    }
  };

  // Function to handle the random workout request
  const handleRandomWorkout = () => {
    const muscleGroupsQuery = selectedMuscleGroups.join(',');
    const equipmentQuery = selectedEquipment.join(',');

    // Make the API request with the constructed query parameters
    // Use the 'inclusion' parameter to determine whether to use 'in' or 'nin'
    const inclusion = inclusionCheckbox.checked ? 'in' : 'nin';
    const queryAPI_URL = `/exercises/random?muscleGroups=${muscleGroupsQuery}&equipment=${equipmentQuery}&inclusion=${inclusion}`;
  // Make the API request using the constructed apiUrl
  };

  return (
    <>
      <p>Välj utrustning dårå!</p>

      {/* Render muscle group checkboxes */}
      {muscleGroups.map((muscleGroup) => (
        <div key={muscleGroup}>
          <label>
            <input
              type="checkbox"
              value={muscleGroup}
              onChange={handleMuscleGroupChange} />
            {muscleGroup}
          </label>
        </div>
      ))}

      {/* Render equipment checkboxes */}
      {equipmentOptions.map((equipment) => (
        <div key={equipment}>
          <label>
            <input
              type="checkbox"
              value={equipment}
              onChange={handleEquipmentChange} />
            {equipment}
          </label>
        </div>
      ))}

      {/* Add a button to trigger the random workout request */}
      <button type="button" onClick={handleRandomWorkout}>Generate Random Workout</button>
    </>
  );
}

// Make sure to replace muscleGroups and equipmentOptions with the state variables where you store the fetched data.
// With this implementation, the muscle group and equipment checkboxes will be rendered dynamically based on the data retrieved from your backend API.
// Whenever the data is fetched, the checkboxes will be updated accordingly.
// Remember to handle the checkbox change events and construct the query parameters as explained in the previous response.