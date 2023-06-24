import React, { useRef, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import AngryText from './components/AngryText'

function App() {
  const promptInputRef = useRef()

  const [isGeneratingAngerTranslation, setIsGeneratingAngerTranslation] = useState(false)
  const [angerTranslation, setAngerTranslation] = useState("")

  const handleOnClick = () => {
    setIsGeneratingAngerTranslation(true)
    const inputPrompt = promptInputRef.current.value

    fetch('/api/translate-anger-v1', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'prompt': inputPrompt
      }),
    })
      .then(response => response.json())
      .then(({ translation }) => {
        setAngerTranslation(translation)
        setIsGeneratingAngerTranslation(false)
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
    <Container className="pt-4">
      <Row>
        <Col className='text-center' md={{ span: 8, offset: 2}}>
          <h1>Anger Translator</h1>
          <div className="pt-4">
            <InputGroup className="mb-3">
              <Form.Control
                ref={promptInputRef}
                placeholder="What are you made about?"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleOnClick()
                  }
                }}
              />
              <Button variant="primary" onClick={handleOnClick}>
                Translate inner thoughts
              </Button>
            </InputGroup>
          </div>
          {isGeneratingAngerTranslation && (
            <span>Loading...</span>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3}}>
          {
            !isGeneratingAngerTranslation && angerTranslation !== "" && (
              <div style={{ paddingTop: '5em'}}>
                <AngryText text={angerTranslation}/>
              </div>
            )
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
