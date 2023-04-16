import Observable from 'observables/lib/Observable'

const createConstantObservable = <T>(constantValue: T): Observable<T> => ({
  getValue: () => constantValue,
  addRemove: {
    add: () => {},
    remove: () => {}
  }
})

export default createConstantObservable
