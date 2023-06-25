import React from 'react'
import App from './App'

import useGoogleAnalytics from './hooks/useGoogleAnalytics'
import useSetVhStyleProperty from './hooks/useSetVhStyleProperty'

export default function AppContainer() {
  useSetVhStyleProperty()

  const googleAnalyticsTag = useGoogleAnalytics()
  return (
    <>
      <App/>
      {googleAnalyticsTag}
    </>
  )
}
