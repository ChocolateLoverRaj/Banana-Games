import { MapChange, ObservableMap } from '.'
import { ValueWithEmitter } from '..'
import { Data as Emitter, emit, Listener } from 'emitter2'

/**
 * Get a value but observe changes
 * @returns **1 time use emitter!**
 */
const get = <K, V>(observableMap: ObservableMap<K, V>, key: K): ValueWithEmitter<V | undefined> => {
  const emitter: Emitter<[]> = new Set()

  const listenerOnce: Listener<[MapChange<K>]> = mapChange => {
    if (mapChange.key === key) {
      emit(emitter)
      observableMap.emitter.delete(listenerOnce)
    }
  }
  observableMap.emitter.add(listenerOnce)

  return {
    value: observableMap.map.get(key),
    emitter
  }
}

export default get
