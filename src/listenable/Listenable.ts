import Listener from './Listener'

interface Listenable<T extends readonly unknown[]> {
  add: (listener: Listener<T>) => void
  remove: (listener: Listener<T>) => void
}

export default Listenable
