import Listenable from '../listenable/Listenable'
import Listener from '../listenable/Listener'
import Input from './Input'

const createWrappedListenable = <T extends readonly unknown[]>(input: Input<T>): Listenable<T> => {
  const listeners = new Set<Listener<T>>()
  const { add, remove } = input((...inputs) => {
    listeners.forEach((listener) => listener(...inputs))
  })

  return {
    add: listener => {
      if (listeners.size === 0) {
        add()
      }
      listeners.add(listener)
    },
    remove: listener => {
      listeners.delete(listener)
      if (listeners.size === 0) {
        remove()
      }
    }
  }
}

export default createWrappedListenable
