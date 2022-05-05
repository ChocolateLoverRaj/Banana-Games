import { ReferenceManager } from '.'
import { set } from '../ObservableValue'

const unReference = (referenceManager: ReferenceManager<unknown>): void => {
  set(referenceManager.references, referenceManager.references.value - 1)
  if (referenceManager.references.value === 0) {
    referenceManager.loadUnload.unload?.(referenceManager.loadedValue.value)
    set(referenceManager.loadedValue, undefined)
  }
}

export default unReference
