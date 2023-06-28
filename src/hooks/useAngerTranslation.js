import { useContext, useState } from 'react'
import { AngerTranslationContext } from '../contexts/AngerTranslationContext'
import { track } from '@amplitude/analytics-browser'
import * as AmplitudeEvents from '../constants/AmplitudeEvents'

import useDeployEnvironment, { Environment } from '../hooks/useDeployEnvironment'

const DEVELOPMENT_TRANSLATION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export default function useAngerTranslation() {
  const { angerPrompt, setAngerPrompt, angerTranslation, setAngerTranslation } = useContext(AngerTranslationContext)
  const [isGeneratingAngerTranslation, setIsGeneratingAngerTranslation] = useState(false)

  const isDevelopment = useDeployEnvironment() === Environment.DEVELOPMENT

  return {
    angerPrompt,
    isGeneratingAngerTranslation,
    angerTranslation,
    generateAngerTranslation: (prompt) => {
      setIsGeneratingAngerTranslation(true)
      setAngerPrompt(prompt)

      track(AmplitudeEvents.SUBMIT_ANGRY_PROMPT)

      if (isDevelopment) {
        return new Promise(resolve => (
          setTimeout(() => {
            setAngerTranslation(DEVELOPMENT_TRANSLATION)
            setIsGeneratingAngerTranslation(false)
            resolve()
          }, 1000)
        ))
      }


      fetch('/api/translate-anger-v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
        }),
      })
        .then(response => {
          console.log(response)
          return response.json()
        })
        .then(({ translation }) => {
          setAngerTranslation(translation)
          setIsGeneratingAngerTranslation(false)
        })
        .catch((error) => {
            console.error('Error:', error);

            track(AmplitudeEvents.SUBMIT_ANGRY_PROMPT_FAILED)
        });
    }
  }
}
