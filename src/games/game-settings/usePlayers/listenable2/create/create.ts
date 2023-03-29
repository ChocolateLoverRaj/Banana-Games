import Listener from '../../../../../listenable/Listener'
import Listenable2 from '../Listenable2'
import Input from './Input'

const create = <T extends readonly unknown[]>(input: Input<T>): Listenable2<T> => {
  const listeners = new Set<Listener<T>>()
  const {
    subscribe,
    unsubscribe
  } = input((...inputs) => listeners.forEach(listener => listener(...inputs)))
  return {
    listeners: listeners,
    subscribe,
    unsubscribe
  }
}

export default create
