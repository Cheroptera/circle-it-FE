import React from 'react'
import { user } from 'reducers/user'
import { welcome } from 'reducers/welcome'
import { timer } from 'reducers/timer'
import { exercises } from 'reducers/exercises'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import GlobalStyle from 'GlobalStyle'
import { SetTimer } from 'components/SetTimer'
import { Welcome } from 'components/Welcome'
import { Favorites } from 'components/Favorites'
import { Recent } from 'components/Recent'
import { Details } from 'components/Details'
import { WorkoutPage } from 'components/WorkoutPage'
import { NotFound } from 'components/NotFound'
import { WellDone } from 'components/WellDone'
import { CustomWorkout } from 'components/CustomWorkout'
import favorites from 'reducers/favorites'
import { SetEquipment } from 'components/SetEquipment'
import { SetMuscleGroup } from 'components/SetMusclegroup'
import { AllExercises } from './components/AllExercises'
import { LogIn } from './components/LogIn'
import { RandomWorkout } from './components/RandomWorkout'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    welcome: welcome.reducer,
    timer: timer.reducer,
    exercises: exercises.reducer,
    favorites: favorites.reducer
  })
  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/exercises" element={<AllExercises />} />
          <Route path="/set-equipment" element={<SetEquipment />} />
          <Route path="/set-musclegroup" element={<SetMuscleGroup />} />
          <Route path="/details" element={<Details />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/random" element={<RandomWorkout />} />
          <Route path="/set-timer" element={<SetTimer />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/my-workout" element={<CustomWorkout />} />
          <Route path="/well-done" element={<WellDone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
