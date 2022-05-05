import { LoadUnload } from '..'
import { Listener } from 'emitter2'

interface ReferenceManagerEmitter<T extends unknown[], UnloadData> {
  loadUnload: LoadUnload<Set<Listener<T>>, UnloadData>
  listeners: Set<Listener<T>>
  unloadData: UnloadData | undefined
}

export default ReferenceManagerEmitter
