import { ReferenceManagerEmitter } from './ReferenceManager/Emitter'

/**
 * This is a simple interface for a value that will change
 */
interface ValueWithEmitter<T> {
  value: T
  emitter: ReferenceManagerEmitter<[], unknown>
}

export default ValueWithEmitter
