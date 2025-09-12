import { useState, useEffect } from 'react'

function useDeviceType() {
  const [deviceType, setDeviceType] = useState('unknown')
  // Check if the window width is less than or equal to 768px
  useEffect(() => {
    /**
     * Handle window resizes by updating the device type state.
     * This function is called on mount and whenever the window is resized.
     * It checks the window's inner width and sets the device type to 'mobile'
     * if it's less than or equal to 768px, or 'desktop' otherwise.
     */
    const handleResize = () => {
      // Set initial value
      setDeviceType(window.innerWidth <= 768 ? 'mobile' : 'desktop')
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize) // Add event listener

    return () => window.removeEventListener('resize', handleResize) // Clean up
  }, [])

  return deviceType
}

export default useDeviceType
