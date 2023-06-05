import React from 'react'
import styled from 'styled-components'

export const ExerciseCard = () => {
  return (
    <Card>
      <p> This is an exercise card!</p>
      <HeartButton type="button">❤︎</HeartButton>
    </Card>
  )
}

const Card = styled.div`
background: #9AFFDF;
`
const HeartButton = styled.button`
border: none;
background: none;
`