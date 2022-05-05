import { ReferenceManagerEmitter } from '.'
import { Listener } from 'emitter2'

const add = <T extends unknown[]>(
  referenceManagerEmitter: ReferenceManagerEmitter<T, unknown>,
  listener: Listener<T>
): void => {
  const { listeners, loadUnload: { load } } = referenceManagerEmitter
  if (!listeners.has(listener)) {
    listeners.add(listener)
    if (listeners.size === 1) {
      referenceManagerEmitter.unloadData = load(listeners)
    }
  }
}

export default add
