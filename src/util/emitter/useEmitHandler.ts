import { Emitter, Listener } from './Emitter'
import { useEffect } from 'react'

/**
 * React hook for calling a function when an emitter emits
 */
const useEmitHandler = <T extends unknown[]>(emitter: Emitter<T>, listener: Listener<T>): void => {
  useEffect(() => {
    emitter.add(listener)
    return () => {
      emitter.delete(listener)
    }
  })
}

export default useEmitHandler
