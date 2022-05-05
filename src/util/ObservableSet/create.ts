import { ObservableSet } from '.'

const create = <T>(set: Set<T>): ObservableSet<T> => ({
  emitter: new Set(),
  set
})

export default create
