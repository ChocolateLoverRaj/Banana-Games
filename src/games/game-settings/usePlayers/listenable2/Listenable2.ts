import Listener from '../../../../listenable/Listener'

interface Listenable2<T extends readonly unknown[]> {
  listeners: Set<Listener<T>>
  subscribe: () => void
  unsubscribe: () => void
}

export default Listenable2
