import React from 'react'
import { user } from 'reducers/user'
import { welcome } from 'reducers/welcome'
import { timer } from 'reducers/timer'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Timer } from 'components/Timer'
import { SetTimer } from 'components/SetTimer'
import { Welcome } from 'components/Welcome'
import { Favorites } from 'components/Favorites'
import { Recent } from 'components/Recent'
import { Details } from 'components/Details'
import { WorkoutPage } from 'components/WorkoutPage'
import { NotFound } from 'components/NotFound'
import { AllExercises } from './components/AllExercises'
import { LogIn } from './components/LogIn'
import { RandomWorkout } from './components/RandomWorkout'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    welcome: welcome.reducer,
    timer: timer.reducer
  })
  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/exercises" element={<AllExercises />} />
          <Route path="/details" element={<Details />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/random-workout" element={<RandomWorkout />} />
          <Route path="/set-timer" element={<SetTimer />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
