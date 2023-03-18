import Observable from 'observables/lib/Observable'

type BooleanTypeSpecific<T> = (data: Observable<T>) => Observable<boolean>

export default BooleanTypeSpecific
