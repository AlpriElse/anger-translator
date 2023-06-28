import React from 'react'
import styled, { keyframes } from 'styled-components'
import CopyIcon from '../components/icons/CopyIcon'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { toast } from 'react-hot-toast'
import { track } from '@amplitude/analytics-browser'
import * as AmplitudeEvents from '../constants/AmplitudeEvents'

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

  function handleShareClick() {
    toast("Fuck, we're still building this feature", {
      icon: '🤬',
    })
    track(AmplitudeEvents.SHARE_VIA_IMAGE_NOT_IMPLEMENTED)
  }

  function handleClipboardCopyClick() {
    copyShareClipboardSnipper()
    track(AmplitudeEvents.SHARE_VIA_CLIPBOARD)
  }

  return (
    <SharingOptionsContainer aria-label="Basic example">
      <Button variant="outline-secondary" onClick={handleShareClick }>Share</Button>
      <Button variant="outline-secondary" onClick={handleClipboardCopyClick}>
        <CopyIcon/>
      </Button>
    </SharingOptionsContainer>
  )
}

export default SharingOptions
