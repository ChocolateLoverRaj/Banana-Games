import { useEffect } from 'react'
import Data from './Data'
import Listener from './Listener'

/**
 * React hook for calling a function when an emitter emits
 */
const useEmitHandler = <T extends unknown[]>(emitter: Data<T>, listener: Listener<T>): void => {
  useEffect(() => {
    emitter.add(listener)
    return () => {
      emitter.delete(listener)
    }
  })
}

export default useEmitHandler
