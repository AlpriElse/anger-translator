import React, { useState, useEffect} from 'react'
import styled, { keyframes } from 'styled-components'
import { SOMEWHAT_BLACK } from '../constants/Colors'

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
  "Hold your horses... we're making your message angrier.",
  "Anger brewing... please wait.",
  "Stoking the flames of fury... stay tuned.",
  "Pumping up the volume... hang in there.",
  "Adding a pinch of anger spice... loading.",
  "Loading temper tantrum...",
  "Prepping for an angry outburst... please stand by.",
  "Serving your message, extra hot and spicy... wait a sec.",
  "Stirring the pot of rage... bear with us.",
  "Translating calm to chaos... hold on tight.",
  "Cranking up the anger knob... hold on!",
  "Assembling fury components... just a moment.",
  "Infusing rage... wait for it.",
  "Anger amplification in progress... stand by.",
  "Turning up the heat... brace yourself.",
  "Mixing up a rage cocktail... cheers!",
  "Feeding the rage monster... loading.",
  "Getting our feathers ruffled... stay with us.",
  "Brewing up a storm... loading.",
  "Your message is getting a rage makeover... patience!",
  "Tweaking anger settings... hang in there!",
  "Revving up the rage engine... wait for it.",
  "Anger steroids incoming... loading.",
  "Rageifying your message... sit tight.",
  "Calibrating anger translator... hold on a sec."
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
    <div {...props}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <StyledDiv>
          <ScalingDot left={5} start={0} stop={1}/>
          <MovingDot left={8}/>
          <MovingDot left={32}/>
          <ScalingDot left={56} start={1} stop={0}/>
        </StyledDiv>
      </div>
      <p className="text-center">{loadingMessage}</p>
    </div>
  )
}

