import React, { useEffect, useState } from 'react';
import { API_URL } from 'utils/urls';

export const Recent = () => {
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from storage

    const fetchRecentWorkouts = async () => {
      try {
        const response = await fetch(API_URL('/exercises/recent'), {
          headers: {
            Authorization: accessToken
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRecentWorkouts(data.response);
        } else {
          console.error('Failed to fetch recent workouts');
        }
      } catch (error) {
        console.error('Error fetching recent workouts:', error);
      }
    };

    if (accessToken) {
      fetchRecentWorkouts();
    }
  }, []);

  return (
    <div>
      <h2>Your Recent Workouts</h2>
      {recentWorkouts.length > 0 ? (
        <ul>
          {recentWorkouts.map((workout) => (
            <li key={workout.timestamp}>{/* Render workout data here */}</li>
          ))}
        </ul>
      ) : (
        <p>No recent workouts</p>
      )}
    </div>
  );
};
