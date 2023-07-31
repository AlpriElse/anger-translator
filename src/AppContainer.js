import React, { useEffect } from 'react'
import App from './App'
import { Toaster } from 'react-hot-toast'
import * as amplitude from '@amplitude/analytics-browser';
import ReactGA from 'react-ga'


import { AngerTranslationProvider } from './contexts/AngerTranslationContext'

import useDeployEnvironment, { Environment } from './hooks/useDeployEnvironment';

const GOOGLE_ANALYTICS_TRACKING_CODE = 'G-LN5JYMWEP9'

export default function AppContainer() {
  const isDeployed = useDeployEnvironment() === Environment.PRODUCTION

  useEffect(() => {
    if (isDeployed) {
      amplitude.init('6822f9bb80dd44752393308c1feadb13');
      ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_CODE)
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }, [isDeployed])

  return (
    <>
      <div><Toaster/></div>
      <AngerTranslationProvider>
        <App/>
      </AngerTranslationProvider>
    </>
  )
}
