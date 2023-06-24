import React from 'react'
import styled from 'styled-components'
import TypeWriterText from './TypeWriterText'
import { MANGO } from '../constants/Colors'

const StyledAnger = styled.h3`
line-height: 1.75em;
font-family: Caprasimo;
color: ${MANGO};
`

const AngryText = ({text}) => (
  <StyledAnger>
    <TypeWriterText text={text}/>
  </StyledAnger>
)

export default AngryText
