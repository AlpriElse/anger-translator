import { FiCopy } from "react-icons/fi";
import { SOMEWHAT_BLACK } from '../../constants/Colors';
import styled from 'styled-components'

const StyledFiCopy = styled(FiCopy)`
font-size: 1.5em;
`


export default function CopyIcon() {
  return <StyledFiCopy color={'#6c757d'}/>
}
