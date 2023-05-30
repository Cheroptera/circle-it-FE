import React from 'react'
import { user } from 'reducers/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { welcome } from 'reducers/welcome'
import { Welcome } from 'components/Welcome'
import { LogIn } from './components/LogIn'

import RandomWorkout from './components/RandomWorkout'

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
          <Route path="/randomWorkout" element={<RandomWorkout />} />
          <Route path="/welcome" element={<Welcome />}> </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
