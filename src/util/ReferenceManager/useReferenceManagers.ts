import { useEffect } from 'react'
import { usePreviousImmediate } from 'rooks'
import ReferenceManager from './ReferenceManager'
import arrDiff from 'arr-diff'
import unReference from './unReference'
import reference from './reference'

const useReferenceManagers = (referenceManagers: ReadonlyArray<ReferenceManager<unknown>>): void => {
  const previousReferenceManagers = usePreviousImmediate(referenceManagers) ?? []

  useEffect(() => {
    arrDiff(previousReferenceManagers, referenceManagers).forEach(referenceManager => unReference(referenceManager))
    arrDiff(referenceManagers, previousReferenceManagers).forEach(referenceManager => reference(referenceManager))
  }, [referenceManagers])

  useEffect(() => () => {
    referenceManagers.forEach(referenceManager => unReference(referenceManager))
  }, [])
}

export default useReferenceManagers
