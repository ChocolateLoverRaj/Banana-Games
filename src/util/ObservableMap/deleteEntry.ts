import { emit } from 'emitter2'
import { ObservableMap, MapChangeType } from '.'

const deleteEntry = <K>(observableMap: ObservableMap<K, unknown>, key: K): void => {
  const didDelete = observableMap.map.delete(key)
  if (didDelete) {
    emit(observableMap.emitter, {
      type: MapChangeType.KEY_CHANGE,
      key
    })
  }
}

export default deleteEntry
