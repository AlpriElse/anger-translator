import { useContext, useState } from 'react'
import { AngerTranslationContext } from '../contexts/AngerTranslationContext'

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

      fetch('/api/translate-anger-v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
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
  }
}
