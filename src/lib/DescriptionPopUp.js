import { React } from 'react'
import styled from 'styled-components/macro'

export const DescriptionPopup = ({ img, exerciseName, message, handleClose }) => {
  return (
    <Overlay>
      <AlertWindow>
        <MessageArea>
          <AlertHeader>
            <h2>{exerciseName}</h2>
            <DescriptionImg src={img} alt="img" />
          </AlertHeader>
          <DescriptionDiv1>
            <h3>Description</h3>
            <p>{message}</p>
          </DescriptionDiv1>
        </MessageArea>
        <Closebutton type="button" onClick={handleClose}>
          Close
        </Closebutton>
      </AlertWindow>
    </Overlay>
  )
}

const Overlay = styled.section`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(49, 49, 49, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

const AlertWindow = styled.div`
  padding: 20px;
  min-width: 300px;
  min-height: 400px;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  background-color: white;
  z-index: 2;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const DescriptionDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px 10px 8px 0px;
  gap: 8px;

  h3 {
    margin: unset;
  }

  p {
    margin: unset;
    margin-top: 6px;
  }
`

const Closebutton = styled.button`
  margin: 3px;
  cursor: pointer;
`
const MessageArea = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
`

const AlertHeader = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-end;
`

const DescriptionImg = styled.img`
  width: 100px;
`