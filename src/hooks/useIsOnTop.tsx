import { useEffect, useState } from 'react'

const useIsOnTop = () => {
  const [onTop, setTop] = useState(true)
  const setMenu = () => {
    if (window.scrollY > 0) setTop(false)
    if (window.scrollY === 0) setTop(true)
  }

  useEffect(() => {
    document.addEventListener('scroll', setMenu)
    return () => document.removeEventListener('scroll', setMenu)
  }, [])

  return onTop
}

export default useIsOnTop
