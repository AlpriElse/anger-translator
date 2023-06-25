import React from 'react'
import App from './App'
import { Toaster } from 'react-hot-toast'

import { AngerTranslationProvider } from './contexts/AngerTranslationContext'

import useGoogleAnalytics from './hooks/useGoogleAnalytics'

export default function AppContainer() {

  const googleAnalyticsTag = useGoogleAnalytics()
  return (
    <>
      <div><Toaster/></div>
      <AngerTranslationProvider>
        <App/>
      </AngerTranslationProvider>
      {googleAnalyticsTag}
    </>
  )
}
