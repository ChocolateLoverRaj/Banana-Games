import { ObservablePromise } from '.'
import { emit, Data as Emitter } from 'emitter2'
import PromiseState from '../../types/PromiseState'

const create = <T>(promise: PromiseLike<T>): ObservablePromise<T> => {
  const emitter: Emitter<[]> = new Set()

  promise.then(value => {
    observablePromise.result = value
    observablePromise.state = PromiseState.RESOLVED
    emit(emitter)
  }, error => {
    observablePromise.result = error
    observablePromise.state = PromiseState.REJECTED
    emit(emitter)
  })

  const observablePromise: ObservablePromise<T> = {
    promise,
    state: PromiseState.PENDING,
    result: undefined,
    emitter
  }

  return observablePromise
}

export default create
