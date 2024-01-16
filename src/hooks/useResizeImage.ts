import { useState } from 'react'

export const useResizeImage = () => {
  const [size, setSize] = useState({ width: 200, height: 200 })
  const [resizing, setResizing] = useState(false)
  const onMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    setResizing(true)
  }
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    setResizing(false)
  }
  const onMouseMove = (e: MouseEvent) => {
    setSize((currentSize) => ({
      width: currentSize.width + e.movementX,
      height: currentSize.height + e.movementY,
    }))
  }

  return { size, onMouseDown, resizing }
}
