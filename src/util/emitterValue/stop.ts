import Data from './Data'

const start = <T extends unknown[]>({ emitter, listener }: Data<T>): void => {
  emitter.delete(listener)
}

export default start
