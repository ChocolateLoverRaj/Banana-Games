import { ReferenceManagerMap } from '.'
import { ObservableMap, ObservableValue } from '../..'

const reference = <K, V>(
  referenceManagerMap: ReferenceManagerMap<K, V>,
  key: K
): V => {
  let value = referenceManagerMap.observableMap.map.get(key)
  if (value === undefined) {
    value = {
      observableValue: ObservableValue.create(referenceManagerMap.loadUnload.load(key)),
      references: 0
    }
    ObservableMap.set(referenceManagerMap.observableMap, key, value)
  }
  value.references++
  return value.observableValue.value
}

export default reference
