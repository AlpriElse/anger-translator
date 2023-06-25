import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import CopyIcon from '../components/icons/CopyIcon'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { toast } from 'react-hot-toast'

import useShareViaClipboard from '../hooks/useShareClipboardSnippet'

const revealKeyframes = keyframes`
0% {
  opacity: 0;
  transform: translateY(10px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`

const SharingOptionsContainer = styled(ButtonGroup)`
animation: ${revealKeyframes} .2s ease-out;
`


const SharingOptions = () => {
  const { copyShareClipboardSnipper } = useShareViaClipboard()

  return (
    <SharingOptionsContainer aria-label="Basic example">
      <Button variant="outline-secondary" onClick={() => toast("Fuck, we're still building this feature", {
        icon: '🤬',
      })}>Share</Button>
      <Button variant="outline-secondary" onClick={copyShareClipboardSnipper}>
        <CopyIcon/>
      </Button>
    </SharingOptionsContainer>
  )
}

export default SharingOptions
