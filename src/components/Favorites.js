import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'
import { LogOutButton } from 'lib/LogOutButton'

// * This is a list of all the favorites of a logged in user
export const Favorites = () => {
  // const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  // const loggedInUserId = useSelector((store) => store.user.userId)

  // const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
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
    fetch(API_URL('workouts/favorites'), options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error('Failed', error)
      })
  })
  return (
    <>
      <Header />
      <div>
        <h2>My Favorites</h2>
      </div>
      <LogOutButton />
    </>
  )
}

// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { API_URL } from 'utils/urls'
// import { Header } from 'lib/Header'

// export const Favorites = () => {
//   const [favoriteWorkouts, setFavoriteWorkouts] = useState([])
//   const accessToken = useSelector((store) => store.user.accessToken)

//   useEffect(() => {
//     const fetchFavoriteWorkouts = async () => {
//       try {
//         const response = await fetch(API_URL('workouts/favorites'), {
//           headers: {
//             Authorization: accessToken,
//           }
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setFavoriteWorkouts(data)
//         } else {
//           throw new Error('Error fetching favorite workouts')
//         }
//       } catch (error) {
//         console.log('Error fetching favorite workouts:', error)
//       }
//     }

//     fetchFavoriteWorkouts()
//   }, [accessToken])

//   return (
//     <>
//       <Header />
//       <div>
//         <h2>My Favorites</h2>
//         <ul>
//           {favorites.map((favorite) => (
//             <li key={favorite.id}>{favorite.name}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   )
// }
// ,
//       body: JSON.stringify({
//         timestamp,
//         exercises: finishedWorkout,
//         loggedInUserId
//       })