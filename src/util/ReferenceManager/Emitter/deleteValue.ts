import { ReferenceManagerEmitter } from '.'
import { Listener } from 'emitter2'

const deleteValue = <T extends unknown[]>(
  referenceManagerEmitter: ReferenceManagerEmitter<T, unknown>,
  listener: Listener<T>
): void => {
  const { listeners, loadUnload: { unload }, unloadData } = referenceManagerEmitter
  if (
    listeners.delete(listener) &&
    listeners.size === 0
  ) {
    unload?.(listeners, unloadData)
    referenceManagerEmitter.unloadData = undefined
  }
}

export default deleteValue
