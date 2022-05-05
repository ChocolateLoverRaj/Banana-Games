import { ObservableValue } from '.'

/**
 * @returns You can directly use the `ValueWithEmitter`. It can be used until it's
 * garbage-collected.
 */
const create = <T>(initialValue: T): ObservableValue<T> => ({
  value: initialValue,
  emitter: new Set()
})

export default create
