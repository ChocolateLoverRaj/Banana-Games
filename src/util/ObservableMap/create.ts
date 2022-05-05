import { ObservableMap } from '.'

const create = <K, V>(map: Map<K, V>): ObservableMap<K, V> => ({
  map,
  emitter: new Set()
})

export default create
