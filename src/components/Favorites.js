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
