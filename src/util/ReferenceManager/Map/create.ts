import { ReferenceManagerMap } from '.'
import { LoadUnload } from '..'
import { ObservableMap } from '../..'

const create = <K, V>(loadUnload: LoadUnload<K, V>): ReferenceManagerMap<K, V> => ({
  loadUnload,
  observableMap: ObservableMap.create(new Map())
})

export default create
