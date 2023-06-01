import React from 'react'
import { user } from 'reducers/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { welcome } from 'reducers/welcome'
import { Welcome } from 'components/Welcome'
import { Favorites } from 'components/Favorites'
import { Recent } from 'components/Recent'
import { AllExercises } from './components/AllExercises'
import { LogIn } from './components/LogIn'
import { RandomWorkout } from './components/RandomWorkout'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    welcome: welcome.reducer
  })
  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/random-workout" element={<RandomWorkout />} />
          <Route path="/exercises" element={<AllExercises />} />
          <Route path="/welcome" element={<Welcome />}> </Route>
          <Route path="/favorites" element={<Favorites />}> </Route>
          <Route path="/recent" element={<Recent />}> </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
