import { useContext, useState } from 'react'
import { AngerTranslationContext } from '../contexts/AngerTranslationContext'
import { track } from '@amplitude/analytics-browser'
import * as AmplitudeEvents from '../constants/AmplitudeEvents'

export default function useAngerTranslation() {
  const { angerPrompt, setAngerPrompt, angerTranslation, setAngerTranslation } = useContext(AngerTranslationContext)
  const [isGeneratingAngerTranslation, setIsGeneratingAngerTranslation] = useState(false)

  return {
    angerPrompt,
    isGeneratingAngerTranslation,
    angerTranslation,
    generateAngerTranslation: (prompt) => {
      setIsGeneratingAngerTranslation(true)
      setAngerPrompt(prompt)

      track(AmplitudeEvents.SUBMIT_ANGRY_PROMPT)

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
