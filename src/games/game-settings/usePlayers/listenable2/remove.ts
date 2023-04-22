import AddRemoveInput from './AddRemoveInput'

const remove = <T extends readonly unknown[]>(
  { listenable, listener }: AddRemoveInput<T>
): void => {
  listenable.listeners.delete(listener)
  if (listenable.listeners.size === 0) {
    listenable.unsubscribe()
  }
}

export default remove
