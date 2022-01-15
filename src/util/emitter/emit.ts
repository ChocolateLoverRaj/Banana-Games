import Data from './Data'

const emit = <T extends unknown[]>(emitter: Data<T>, ...params: T): void => {
  emitter.forEach(listener => listener(...params))
}

export default emit
