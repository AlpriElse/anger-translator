import React, { useRef } from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import AngryText from './components/AngryText'
import LoadingSpinner from './components/LoadingSpinner'
import { SOMEWHAT_BLACK } from './constants/Colors'
import Button from './components/UIButton'

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


  const deviceType = useDeviceType()


  const angerTranslationUi = (isGeneratingAngerTranslation, angerTranslation) => {
    if (isGeneratingAngerTranslation) {
      return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
      <>

        {angerTranslationUi(isGeneratingAngerTranslation, angerTranslation)}

        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          padding: '.5em'
        }}>
          {promptInputGroup}
        </div>
      </>
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
