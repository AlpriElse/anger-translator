import React, { useState } from 'react'
import styled from 'styled-components'

import { FORBIDDEN_SOUP } from '../constants/Colors'
import TypeWriterText from './TypeWriterText'
import SharingOptions from './SharingOptions'

const StyledAnger = styled.h3`
line-height: 1.75em;
font-family: Caprasimo;
color: ${FORBIDDEN_SOUP};
`

const AngryText = ({text}) => {
  const [isTyping, setIsTyping] = useState(true)

  return (
    <div>
      <StyledAnger>
        <TypeWriterText text={text} callback={() => setIsTyping(false)}/>
      </StyledAnger>
      <div className="pt-3" style={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        {!isTyping && <SharingOptions/>}
      </div>
    </div>
  )
}

export default AngryText
