import React from 'react'
import App from './App'

import useGoogleAnalytics from './hooks/useGoogleAnalytics'

export default function AppContainer() {

  const googleAnalyticsTag = useGoogleAnalytics()
  return (
    <>
      <App/>
      {googleAnalyticsTag}
    </>
  )
}
