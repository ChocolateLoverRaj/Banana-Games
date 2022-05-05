import { ReferenceManagerEmitter, add } from '.'
import { Listener } from 'emitter2'
import { useEffect } from 'react'
import deleteValue from './deleteValue'

/**
 * @param listener Using `useCallback` will big improve performance
 */
const useReferenceManagerEmitter = <T extends unknown[]>(
  referenceManagerEmitter: ReferenceManagerEmitter<T, unknown>,
  listener: Listener<T>
): void => {
  useEffect(() => {
    add(referenceManagerEmitter, listener)
    return () => {
      deleteValue(referenceManagerEmitter, listener)
    }
  }, [referenceManagerEmitter, listener])
}

export default useReferenceManagerEmitter
