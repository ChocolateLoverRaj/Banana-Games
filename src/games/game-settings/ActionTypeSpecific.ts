import Observable from 'observables/lib/Observable'
import Listenable from '../../listenable/Listenable'

type ActionTypeSpecific<T> = (data: Observable<T>) => Listenable<readonly []>

export default ActionTypeSpecific
