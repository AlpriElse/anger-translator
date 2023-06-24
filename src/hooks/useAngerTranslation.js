import { useState }from 'react'

export default function useAngerTranslation() {
  const [isGeneratingAngerTranslation, setIsGeneratingAngerTranslation] = useState(false)
  const [angerTranslation, setAngerTranslation] = useState("")

  return {
    isGeneratingAngerTranslation,
    angerTranslation,
    generateAngerTranslation: (prompt) => {
      setIsGeneratingAngerTranslation(true)

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
