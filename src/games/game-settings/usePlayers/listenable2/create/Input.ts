import Listener from '../../../../../listenable/Listener'

type Input<T extends readonly unknown[]> = (emit: Listener<T>) => {
  subscribe: () => void
  unsubscribe: () => void
}

export default Input
