import React from 'react'
import styled from 'styled-components'
import TypeWriterText from './TypeWriterText'

const StyledAnger = styled.h3`
line-height: 1.75em;
`

const AngryText = ({text}) => (
  <StyledAnger>
    <TypeWriterText text={text}/>
  </StyledAnger>
)

export default AngryText
