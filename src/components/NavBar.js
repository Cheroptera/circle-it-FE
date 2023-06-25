import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

export const NavBar = () => {
  return (
    <NavBarDiv>
      <NavBarList>
        <NavLink to="/welcome">Start</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/recent">Recent</NavLink>
        <NavLink to="/about">About</NavLink>
      </NavBarList>
    </NavBarDiv>
  )
}

const NavBarDiv = styled.div`
height: 40px;
width: 100%;
background-color: rgba(205, 176, 238, 0.5);
display: flex;
padding: 5px;
align-items: center;
justify-content: center;
position: fixed;
bottom: 0;

@media (min-width: 668px) {
    max-width: 690px;
}
`
const NavBarList = styled.ul`
display: flex;
gap: 20px;
font-size: 20px;
text-decoration: none;
color: black;
`