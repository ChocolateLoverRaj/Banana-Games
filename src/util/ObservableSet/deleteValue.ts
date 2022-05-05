import { ObservableSet } from '.'
import { emit } from 'emitter2'

const deleteValue = <T>(observableSet: ObservableSet<T>, value: T): void => {
  if (observableSet.set.delete(value)) {
    emit(observableSet.emitter, new Set([value]))
  }
}

export default deleteValue
