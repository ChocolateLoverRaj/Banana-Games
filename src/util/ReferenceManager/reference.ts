import { ReferenceManager } from '.'
import never from 'never'
import { set } from '../ObservableValue'

const reference = <T>(referenceManager: ReferenceManager<T>): T => {
  if (referenceManager.references.value === 0) {
    set(referenceManager.loadedValue, referenceManager.loadUnload.load())
  }
  set(referenceManager.references, referenceManager.references.value + 1)
  return referenceManager.loadedValue.value ?? never()
}

export default reference
