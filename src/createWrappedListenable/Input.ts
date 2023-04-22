import Emit from './Emit'

type Input<T extends readonly unknown[]> = (emit: Emit<T>) => {
  add: () => void
  remove: () => void
}

export default Input
