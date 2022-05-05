import { emit } from 'emitter2'
import { ObservableMap, MapChangeType } from '.'

const set = <K, V>(observableMap: ObservableMap<K, V>, key: K, value: V): void => {
  const valueBefore = observableMap.map.get(key)
  if (value !== valueBefore) {
    observableMap.map.set(key, value)
    emit(observableMap.emitter, {
      type: MapChangeType.KEY_CHANGE,
      key
    })
  }
}

export default set
