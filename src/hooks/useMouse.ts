import { useEffect, useState, useCallback } from 'react'
import { Position } from '@types'; 
const useMouse = (coordinates: Position): Position => {
  const [position, setPosition] = useState(coordinates);
  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return position
}

export { useMouse };