import React from 'react'
import { user } from 'reducers/user'
import { welcome } from 'reducers/welcome'
import { timer } from 'reducers/timer'
import { workouts } from 'reducers/workouts'
import { filtered } from 'reducers/filtered'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import GlobalStyle from 'GlobalStyle'
import { SetTimer } from 'components/SetTimer'
import { Welcome } from 'components/Welcome'
import { Favorites } from 'components/Favorites'
import { Recent } from 'components/Recent'
import { WorkoutPage } from 'components/WorkoutPage'
import { NotFound } from 'components/NotFound'
import { WellDone } from 'components/WellDone'
import { FilterData } from 'components/FilterData'
import { TodaysWorkout } from 'components/TodaysWorkout'
import { CustomWorkout } from './components/CustomWorkout'
import { LogIn } from './components/LogIn'
import { RandomWorkout } from './components/RandomWorkout'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    welcome: welcome.reducer,
    timer: timer.reducer,
    workouts: workouts.reducer,
    filtered: filtered.reducer
  })
  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/exercises" element={<CustomWorkout />} />
          <Route path="/filter" element={<FilterData />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/todays" element={<TodaysWorkout />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/random" element={<RandomWorkout />} />
          <Route path="/set-timer" element={<SetTimer />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/well-done" element={<WellDone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
