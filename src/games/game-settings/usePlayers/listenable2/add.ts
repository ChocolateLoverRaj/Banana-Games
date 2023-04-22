import AddRemoveInput from './AddRemoveInput'

const add = <T extends readonly unknown[]>({ listenable, listener }: AddRemoveInput<T>): void => {
  if (listenable.listeners.size === 0) {
    listenable.subscribe()
  }
  listenable.listeners.add(listener)
}

export default add
