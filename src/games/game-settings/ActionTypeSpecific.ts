import Observable from 'observables/lib/Observable'
import Listenable from '../../listenable/Listenable'

interface Data<T> {
  data: Observable<T>
  deviceId: number
}
type ActionTypeSpecific<T> = (data: Data<T>) => Listenable<readonly []>

export default ActionTypeSpecific
