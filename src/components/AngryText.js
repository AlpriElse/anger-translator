import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FORBIDDEN_SOUP } from '../constants/Colors'
import TypeWriterText from './TypeWriterText'
import SharingOptions from './SharingOptions'

import useDeviceType, { DeviceType } from '../hooks/useDeviceType'

const StyledAnger = styled.h3`
line-height: 1.75em;
font-family: Caprasimo;
color: ${FORBIDDEN_SOUP};
`

const AngryText = ({text}) => {
  const ref = useRef(null)

  const [isTyping, setIsTyping] = useState(true)

  const deviceType = useDeviceType()
  useEffect(() => {
    if (deviceType === DeviceType.MOBILE) {
      /* Input focus on mobile causes page scroll; scroll upward to reveal text */
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [deviceType])

  return (
    <div>
      <span ref={ref}></span>
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
