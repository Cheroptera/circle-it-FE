import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from 'utils/urls'
import setFavorites from '../reducers/favorites'

// * This is a list of all the favorites of a logged in user

export const Favorites = async () => {
  const favorites = useSelector((store) => store.favorites.exercises)
  const dispatch = useDispatch()
  try {
    const response = await fetch(API_URL('exercises/favorites'));
    if (response.ok) {
      const favoritesData = await response.json();
      dispatch(setFavorites(favoritesData)); // Update the Redux store with the fetched favorites
    } else {
      throw new Error('Error fetching favorites');
    }
  } catch (error) {
    console.log('Error fetching favorites:', error);
  }

  return (
    <div>
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
};
