import React, { useRef } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import AngryText from './components/AngryText'
import LoadingSpinner from './components/LoadingSpinner'
import { SOMEWHAT_BLACK } from './constants/Colors'

import useDeviceType, { DeviceType } from './hooks/useDeviceType'
import useAngerTranslation from './hooks/useAngerTranslation'

import './App.css'

function App() {
  const promptInputRef = useRef()


  const { isGeneratingAngerTranslation, angerTranslation, generateAngerTranslation} = useAngerTranslation()
  const handleOnClick = () => {
    const inputPrompt = promptInputRef.current.value
    generateAngerTranslation(inputPrompt)
  }

  const angerTranslationUi = (isGeneratingAngerTranslation, angerTranslation) => {
    if (isGeneratingAngerTranslation) {
      return (
        <div style={{ paddingTop: '5em', display: 'flex', justifyContent: 'center'}}>
          <LoadingSpinner/>
        </div>
      )
    }

    if (angerTranslation === "") {
      return <></>
    }

    return (
      <div style={{ paddingTop: '5em'}}>
        <AngryText text={angerTranslation}/>
      </div>
    )
  }

  const deviceType = useDeviceType()

  const promptInputGroup = (
    <InputGroup>
      <Form.Control
        ref={promptInputRef}
        placeholder="What are you mad about?"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleOnClick()
          }
        }}
      />
      <Button variant="primary" onClick={handleOnClick}>
        { deviceType === DeviceType.MOBILE ? "Submit" : "Translate inner thoughts"}
      </Button>
    </InputGroup>
  )

  if (deviceType === DeviceType.MOBILE) {
    return (
      <div style={{
        display: 'flex',
        height: 'calc(var(--vh, 1vh) * 100)',
        flexDirection: 'column'
      }}>
        <div className="p-4" style={{
          flexGrow: 1,
        }}>
          {angerTranslationUi(isGeneratingAngerTranslation, angerTranslation)}
        </div>
        <div style={{
          padding: '.5em'
        }}>
          {promptInputGroup}
        </div>
      </div>
    )
  }

  return (
    <Container className="pt-4">
      <Row>
        <Col className='text-center' md={{ span: 8, offset: 2}}>
          <h1 style={{
            fontFamily: 'Bangers',
            color: SOMEWHAT_BLACK
          }}>Anger Translator</h1>
          <div className="pt-4">
            {promptInputGroup}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3}}>
          {angerTranslationUi(isGeneratingAngerTranslation, angerTranslation)}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
