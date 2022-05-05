import { Data as Emitter } from 'emitter2'

interface ObservableSet<T> {
  set: Set<T>
  emitter: Emitter<[changedValues: ReadonlySet<T>]>
}

export default ObservableSet
