import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import goBackImg from '../images/back.png'

export const GoBackBtn = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <GoBackButton type="button" onClick={goBack}>
      <IMG src={goBackImg} alt="arrow" />
    </GoBackButton>
  )
}

const GoBackButton = styled.button`
background: none;
border: none;
padding: none;
position: absolute;
left: -5px;
top: 5px;
cursor: pointer;
`
const IMG = styled.img`
height: 28px;
`
