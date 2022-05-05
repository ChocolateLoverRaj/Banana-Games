import { StartStop } from '../..'
import PromiseState from '../../../types/PromiseState'
import DoneCallback from './DoneCallback'

/**
 * When started, done callback is called if promise is already done.
 * If promise is pending, it will call the done callback after promise is done.
 *
 * Calling stop will cancel calling done callback after promise is done.
 */
const doneCallbackStartStop: StartStop<DoneCallback<unknown>> = {
  start: ({ observablePromise, doneCallback }) => {
    if (observablePromise.state !== PromiseState.PENDING) {
      doneCallback()
    } else {
      observablePromise.emitter.add(doneCallback)
    }
  },
  stop: ({ observablePromise, doneCallback }) => {
    observablePromise.emitter.delete(doneCallback)
  }
}

export default doneCallbackStartStop
