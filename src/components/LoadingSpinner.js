import React, { useState, useEffect} from 'react'
import styled, { keyframes } from 'styled-components'
import { SOMEWHAT_BLACK } from '../constants/Colors'

const revealKeyframes = keyframes`
0% {
  transform: scale(.8);
  opacity: 0;
}
100% {
  transform: scale(1);
  opacity:
}
`

const LoadingSpinnerContainer = styled.div`
animation: ${revealKeyframes} .2s ease-out;
`

const StyledDiv = styled.div`
display: inline-block;
position: relative;
width: 80px;
height: 80px;
`

const StyledInnerDiv = styled(StyledDiv)`
position: absolute;
top: 33px;
width: 13px;
height: 13px;
border-radius: 50%;
background: ${SOMEWHAT_BLACK};
animation-timing-function: cubic-bezier(0, 1, 1, 0);
left: ${props => props.left}px;
`

function makeScalingKeyframes(start, stop) {
  return keyframes`
    0% {
      transform: scale(${start});
    }
    100% {
      transform: scale(${stop});
    }
  `
}

const ScalingDot = styled(StyledInnerDiv)`
animation: ${props => makeScalingKeyframes(props.start, props.stop)} 0.6s infinite;
`

const movingKeyframes = keyframes`
0% {
  transform: translate(0, 0);
}
100% {
  transform: translate(24px, 0);
}
`
const MovingDot = styled(StyledInnerDiv)`
animation: ${movingKeyframes} 0.6s infinite;
`

const LOADING_MESSAGES = [
  "Anger brewing...",
  "Stoking the flames of fury...",
  "Pumping up the volume...",
  "Adding a pinch of anger spice...",
  "Loading temper tantrum...",
  "Prepping for an angry outburst...",
  "Serving your message, extra hot and spicy...",
  "Stirring the pot of rage...",
  "Translating calm to chaos...",
  "Cranking up the anger knob...",
  "Assembling fury components...",
  "Infusing rage...",
  "Anger amplification in progress...",
  "Turning up the heat...",
  "Mixing up a rage cocktail...",
  "Feeding the rage monster...",
  "Getting our feathers ruffled...",
  "Brewing up a storm...",
  "Your message is getting a rage makeover...",
  "Tweaking anger settings...",
  "Revving up the rage engine...",
  "Anger steroids incoming...",
  "Rageifying your message...",
  "Calibrating anger translator..."
]

function getRandomLoadingMessage() {
  const index = Math.floor(Math.random() * LOADING_MESSAGES.length)
  return LOADING_MESSAGES[index]
}

export default function LoadingSpinner({...props }) {
  const [loadingMessage, setLoadingMessage] = useState(getRandomLoadingMessage())

  useEffect(() => {
    function updateLoadingMessage() {
      setLoadingMessage(getRandomLoadingMessage)
    }

    const interval = setInterval(() => {
      updateLoadingMessage();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <LoadingSpinnerContainer {...props}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <StyledDiv>
          <ScalingDot left={5} start={0} stop={1}/>
          <MovingDot left={8}/>
          <MovingDot left={32}/>
          <ScalingDot left={56} start={1} stop={0}/>
        </StyledDiv>
      </div>
      <p className="text-center">{loadingMessage}</p>
    </LoadingSpinnerContainer>
  )
}

