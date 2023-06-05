import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
`;

const CountdownWrapper = styled.div`
  position: relative;
  height: ${(props) => props.height}
  width: ${(props) => props.width}
`;

const CountdownText = styled.p`
  color: #A53860;
  font-size: ${(props) => props.size * 0.3}px;
`;

const CountdownBackground = styled.circle`
  fill: none;
  stroke: white;
  stroke-width: 12px;
`;

const CountdownProgress = styled.circle`
  stroke-dasharray: ${(props) => props.circumference};
  stroke-dashoffset: ${(props) => (props.isRunning ? props.strokeDashoffset : 0)};
  fill: none;
  stroke-linecap: round;
  stroke: ${(props) => props.strokeColor};
  stroke-width: ${(props) => props.strokeWidth};
`;

export const CountdownTimer = ({
  seconds,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth
}) => {
  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;

  const [countdown, setCountdown] = useState(milliseconds);
  const isRunning = useSelector((store) => store.timer.isRunning);

  const strokeDashoffset = () => circumference - (countdown / milliseconds) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 10);

      if (countdown <= 0) {
        clearInterval(interval);
        setCountdown(milliseconds);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <CountdownContainer>
        <CountdownWrapper>
          <CountdownText>{Math.ceil(countdown / 1000)}s</CountdownText>
          <svg>
            <CountdownBackground cx={radius} cy={radius} r={radius} />
            <CountdownProgress
              circumference={circumference}
              strokeDashoffset={strokeDashoffset()}
              isRunning={isRunning}
              strokeColor={strokeColor}
              strokeBgColor={strokeBgColor}
              strokeWidth={strokeWidth}
              cx={radius}
              cy={radius}
              r={radius} />
          </svg>
        </CountdownWrapper>
      </CountdownContainer>
    </div>
  );
};
