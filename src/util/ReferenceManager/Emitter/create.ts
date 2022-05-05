import { LoadUnload } from '..'
import { ReferenceManagerEmitter } from '.'
import { Listener } from 'emitter2'

const create = <T extends unknown[], UnloadData>(
  loadUnload: LoadUnload<Set<Listener<T>>, UnloadData>
): ReferenceManagerEmitter<T, UnloadData> => {
  return {
    loadUnload,
    listeners: new Set(),
    unloadData: undefined
  }
}

export default create
