import { useEffect, useRef } from 'react'
import Cleanup from './Cleanup'
import CleanupLater from './CleanupLater'

const useCleanupLater = (): CleanupLater => {
  const didUnmountRef = useRef(false)
  const cleanupRef = useRef<Cleanup>()

  useEffect(() => () => {
    cleanupRef.current?.() ?? (didUnmountRef.current = true)
  }, [])

  return cleanup => {
    if (didUnmountRef.current) {
      cleanup()
    } else {
      cleanupRef.current = cleanup
    }
  }
}

export default useCleanupLater
