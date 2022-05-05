import { Data as Emitter } from 'emitter2'

/**
 * This is a simple interface for a value that will change
 */
interface ValueWithEmitter<T> {
  value: T
  emitter: Emitter<[]>
}

export default ValueWithEmitter
