import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768; // from bootstrap md

export const DeviceType = {
  MOBILE: "MOBILE",
  DESKTOP: "DESKTOP"
}

export default function useDeviceType() {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBelowBreakpoint(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isBelowBreakpoint ? DeviceType.MOBILE : DeviceType.DESKTOP;

}
