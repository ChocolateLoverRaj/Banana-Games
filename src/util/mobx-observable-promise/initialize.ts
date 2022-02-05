import Data from './Data'
import { createAtom } from 'mobx'
import PromiseState from './PromiseState'

const initialize = <T>(promise: PromiseLike<T>): Data<T> => {
  const atom = createAtom('Promise')
  const data: Data<T> = {
    state: PromiseState.PENDING,
    data: promise,
    atom
  }
  promise.then(
    value => {
      data.state = PromiseState.RESOLVED
      data.data = value
      atom.reportChanged()
    },
    error => {
      data.state = PromiseState.REJECTED
      data.data = error
      atom.reportChanged()
    })
  return data
}

export default initialize
