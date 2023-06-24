import { useEffect } from 'react'

export default function useSetVhStyleProperty() {
  useEffect(() => {
    function handleResize() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }

    window.addEventListener('resize', handleResize);
  }, [])
}
