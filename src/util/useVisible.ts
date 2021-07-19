import useUnique from './useUnique'
import { useEffect } from 'react'

const useVisible = (): boolean => {
  const reRender = useUnique()[1]

  useEffect(() => {
    document.addEventListener('visibilitychange', reRender)
    return () => document.removeEventListener('visibilitychange', reRender)
  }, [reRender])

  return document.visibilityState === 'visible'
}

export default useVisible
