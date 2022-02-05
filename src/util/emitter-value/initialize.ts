import { Data as Emitter } from 'emitter2'
import Data from './Data'

const initialize = <T extends unknown[]>(emitter: Emitter<T>): Data<T> => {
  const data: Data<T> = {
    emitter,
    listener: (...params) => {
      data.value = params
    }
  }
  return data
}

export default initialize
