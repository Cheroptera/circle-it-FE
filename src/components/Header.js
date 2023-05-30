import React from 'react'
import styled from 'styled-components/macro'

const StyledHeader = styled.div`
display:flex;
height: 250px;
border-radius: 0px 0px 17rem 17rem;
background-color: #61C9A8;
`

const StyledHeaderTitle = styled.h2`
align-self:center;
color: white; 
text-align: center;
margin: 80px 30px 80px 30px;

@media (min-width:1024px) {
font-size: 48px;
margin: 0 20%;
}
`

export const Header = ({ headerTitle, className }) => {
  return (
    <StyledHeader className={className}>
      {headerTitle && <StyledHeaderTitle>{headerTitle}</StyledHeaderTitle>}
    </StyledHeader>
  )
}