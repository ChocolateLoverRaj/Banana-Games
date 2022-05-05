import PromiseState from '../../types/PromiseState'
import { Data as Emitter } from 'emitter2'

interface ObservablePromise<T> {
  promise: PromiseLike<T>
  state: PromiseState
  /**
   * `undefined` if pending,
   * `T` if resolved,
   * The error if rejected
   */
  result: any
  emitter: Emitter<[]>
}

export default ObservablePromise
