import { ReferenceManagerMap } from '.'
import { deleteEntry } from '../../ObservableMap'
import never from 'never'

const unReference = <K>(
  referenceManagerMap: ReferenceManagerMap<K, unknown>,
  key: K
): void => {
  const value = referenceManagerMap.observableMap.map.get(key) ?? never()
  value.references--
  if (value.references === 0) {
    referenceManagerMap.loadUnload.unload?.(key, value.observableValue.value)
    deleteEntry(referenceManagerMap.observableMap, key)
  }
}

export default unReference
