import { ObservableMap } from '../../ObservableMap'
import { LoadUnload } from '..'
import { ObservableValue } from '../../ObservableValue'

interface ReferenceManagerMap<K, V> {
  loadUnload: LoadUnload<K, V>
  observableMap: ObservableMap<K, {
    references: number
    observableValue: ObservableValue<V>
  }>
}

export default ReferenceManagerMap
