import React from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import * as Colors from '../constants/Colors'

const PrimaryStyledButton = styled(Button)`
background-color: ${Colors.SOMEWHAT_BLACK};
border-color: ${Colors.SOMEWHAT_BLACK};
&:hover {
  background-color: ${Colors.DEAD_EGGPLANT};
}
&:active {
  background-color: ${Colors.ROTTING_EGGPLANT} !important;
}
`

export default function UIButton({variant, ...props}) {
  if (variant === 'primary') {
    return <PrimaryStyledButton variant={variant} {...props}/>
  }


  return (
    <Button {...props} />
  )
}
