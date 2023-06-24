import React from 'react'
import styled, { keyframes } from 'styled-components'

const blinkAnimation = keyframes`
0%, 50% {
  opacity: 1;
}
50.1%, 100% {
  opacity: 0;
}
`

const BlinkingCursorWrapper = styled.span`
margin-left: 5px;
background-color: #fff;
animation: ${blinkAnimation} 1s infinite;
position: relative;
top: -2px;
`

export default () => <BlinkingCursorWrapper>|</BlinkingCursorWrapper>
