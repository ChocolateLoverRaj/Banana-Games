import Observable from 'observables/lib/Observable'

type BooleanTypeSpecific<T> = (data: Observable<T>, deviceId: number) => Observable<boolean>

export default BooleanTypeSpecific
