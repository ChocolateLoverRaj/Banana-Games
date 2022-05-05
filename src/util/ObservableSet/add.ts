import { ObservableSet } from '.'
import { emit } from 'emitter2'

const add = <T>(observableSet: ObservableSet<T>, value: T): void => {
  if (!observableSet.set.has(value)) {
    observableSet.set.add(value)
    emit(observableSet.emitter, new Set([value]))
  }
}

export default add
