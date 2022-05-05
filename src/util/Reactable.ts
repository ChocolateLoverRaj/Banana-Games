import { Listener } from 'emitter2'
import AddDelete from './AddDelete'

interface Reactable<T> {
  listeners: T
  addDelete: AddDelete<T, Listener<unknown[]>>
}

export default Reactable
