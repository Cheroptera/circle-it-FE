import React from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from 'utils/urls'
import { Header } from 'lib/Header'

// * This is a list of all the favorites of a logged in user
export const Favorites = async () => {
  const favorites = useSelector((store) => store.user.favorites)

  try {
    const response = await fetch(API_URL('exercises/favorites'))
    if (response.ok) {
      await response.json()
    } else {
      throw new Error('Error fetching favorites')
    }
  } catch (error) {
    console.log('Error fetching favorites:', error)
  }

  return (
    <>
      <Header />
      <div>
        <h2>My Favorites</h2>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.name}</li>
          ))}
        </ul>
      </div>
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
