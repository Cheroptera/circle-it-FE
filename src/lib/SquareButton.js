import React from 'react'
import styled from 'styled-components/macro'
import { useNavigate } from 'react-router-dom'
import FavoritesIcon from '../images/favorite.png'
import CustomIcon from '../images/custom.png'
import RandomIcon from '../images/random.png'
import RecentIcon from '../images/recent.png'

const StyledSquareButton = styled.button`
  background-color: #9affdf;
  padding: 30px 30px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-family: 'Poppins', 'Sans-Serif';
  font-size: 18px;
  margin-top: 1rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
  }
`

const Icon = styled.img`
  height: 30px;
`

export const SquareButton = ({ buttonText }) => {
  const navigate = useNavigate()

  const getIconForButton = (text) => {
    switch (text) {
      case 'Recent':
        return RecentIcon
      case 'Favorite Workouts':
        return FavoritesIcon
      case 'Surprise Me':
        return RandomIcon
      case 'Custom Workout':
        return CustomIcon
      default:
        return null
    }
  }

  const handleSquareButtonClick = () => {
    if (buttonText === 'Recent') {
      navigate('/recent')
    } else if (buttonText === 'Favorite Workouts') {
      navigate('/favorites')
    } else if (buttonText === 'Surprise Me') {
      navigate('/random')
    } else if (buttonText === 'Custom Workout') {
      navigate('/filter')
    }
  }

  const icon = getIconForButton(buttonText)

  return (
    <StyledSquareButton type="button" onClick={handleSquareButtonClick}>
      {icon && <Icon src={icon} alt="Icon" />}
      {buttonText}
    </StyledSquareButton>
  )
}
