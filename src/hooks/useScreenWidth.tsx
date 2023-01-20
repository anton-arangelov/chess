import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const resizeHandler = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeHandler)
    setScreenWidth(window.innerWidth)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return { screenWidth }
}
