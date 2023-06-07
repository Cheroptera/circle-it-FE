import React from 'react'
import { useNavigate } from 'react-router-dom'

export const GoBackBtn = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <button type="button" onClick={goBack}>Go back</button>

  )
}