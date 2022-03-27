import PromiseState from './PromiseState'
import Data from './Data'

const getState = (observablePromise: Data<unknown>): PromiseState => {
  observablePromise.atom.reportObserved()
  return observablePromise.state
}

export default getState
