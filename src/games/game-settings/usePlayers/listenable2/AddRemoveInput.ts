import Listener from '../../../../listenable/Listener'
import Listenable2 from './Listenable2'

interface AddRemoveInput<T extends readonly unknown[]> {
  listenable: Listenable2<T>
  listener: Listener<T>
}

export default AddRemoveInput
