import Data from './Data'

const start = <T extends unknown[]>({ emitter, listener }: Data<T>): void => {
  emitter.add(listener)
}

export default start
