import { ObservableSet } from '..'

const has = <T>(observableSet: ObservableSet<T>, value: T): boolean => observableSet.set.has(value)

export default has
