import { Data as Emitter } from 'emitter2'
import MapChange from './MapChange'

interface ObservableMap<K, V> {
  /**
   * The actual map used internally. Do not use directly, because then it won't be observable!
   */
  map: Map<K, V>
  emitter: Emitter<[MapChange<K>]>
}

export default ObservableMap
