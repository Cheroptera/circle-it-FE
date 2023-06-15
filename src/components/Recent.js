import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
import { GoToStartButton } from 'lib/GoToStartButton'

export const Recent = () => {
  const [recentWorkouts, setRecentWorkouts] = useState([])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') // Get the access token from storage

    const fetchRecentWorkouts = async () => {
      try {
        const response = await fetch(API_URL('/exercises/recent'), {
          headers: {
            Authorization: accessToken
          }
        })

        if (response.ok) {
          const data = await response.json()
          setRecentWorkouts(data.response)
        } else {
          console.error('Failed to fetch recent workouts')
        }
      } catch (error) {
        console.error('Error fetching recent workouts:', error)
      }
    }

    if (accessToken) {
      fetchRecentWorkouts()
    }
  }, [])

  return (
    <RecentPage>
      <Header headerTitle="Your Recent Workouts" />
      {recentWorkouts.length > 0 ? (
        <ul>
          {recentWorkouts.map((workout) => (
            <li key={workout.timestamp}>{/* Render workout data here */}</li>
          ))}
        </ul>
      ) : (
        <p>No recent workouts</p>
      )}
      <GoToStartButton />
    </RecentPage>
  )
}

const RecentPage = styled.div`
display: flex;
flex-direction: column;
align-items: center;

@media (min-width: 668px) {
  max-width: 660px;
  margin: auto;
  box-shadow: 5px 8px 20px rgb(0 0 0 / 30%);
}
`