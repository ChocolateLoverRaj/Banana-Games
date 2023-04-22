import Listenable from '../Listenable'
import Listener from '../Listener'

interface Input<T extends readonly unknown[]> {
  listenable?: Listenable<T>
  listener: Listener<T>
}

export default Input
