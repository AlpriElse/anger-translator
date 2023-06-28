import { toast } from 'react-hot-toast';

import useAngerTranslation from './useAngerTranslation';

const SIGNATURES = [
  "Made in an outburst by https://angertranslator.ai",
  "💥 into existence by https://angertranslator.ai",
  "🔥 into being by https://angertranslator.ai",
  "Frustrated 😡 into creation by https://angertranslator.ai",
  "Made with 💢 by https://angertranslator.ai"
]

function getRandomSignature() {
  const index = Math.floor(Math.random() * SIGNATURES.length)
  return SIGNATURES[index]
}

const generateSnippet = (angerPrompt, angerTranslation) =>
`me 😇: ${angerPrompt}

unhinged me 🤬: ${angerTranslation}

${getRandomSignature()}`

export default function useShareViaClipboard() {
  const { angerPrompt, angerTranslation } = useAngerTranslation()

  const snippet = generateSnippet(angerPrompt, angerTranslation)

  return {
    copyShareClipboardSnipper: () => {
      navigator.clipboard.writeText(snippet)
        .then(() => toast.success('Copied this masterpiece to your clipboard 👌'))
        .catch(() => toast.error("Shit copying to your clipboard failed!"));
    }
  }
}
