import { ObservablePromise } from '../../ObservablePromise'
import { PauseEmitter } from '../..'

interface ReferencePauseEmitterValue {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  observablePromise: ObservablePromise<PauseEmitter | void>
  cleanupFns: ReadonlyArray<() => void>
}

export default ReferencePauseEmitterValue
