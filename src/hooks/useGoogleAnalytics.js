import React, { useEffect } from 'react'
import useDeployEnvironment, { Environment } from './useDeployEnvironment';

const GoogleAnalyticsTag = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    function gtag(){
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-LN5JYMWEP9');
  }, [])

  return (
    (
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LN5JYMWEP9"></script>
    )
  )
}

export default function useGoogleAnalytics() {
  const env = useDeployEnvironment()

  if (env === Environment.DEVELOPMENT) {
    return null
  }

  console.log('Attaching Google Analytics Tag')
  return (
    <GoogleAnalyticsTag/>
  )
}
