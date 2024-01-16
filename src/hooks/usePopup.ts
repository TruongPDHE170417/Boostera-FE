import { useState, useEffect, MutableRefObject } from 'react'

//This hook returns if the click was inside the popUp ref or outside it .
function usePopup(popupRef: MutableRefObject<HTMLDivElement | null>) {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const clickedComponent = e.target as Node
      if (!popupRef?.current?.contains(clickedComponent)) {
        setShowPopup(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [showPopup, setShowPopup]
}

export default usePopup
