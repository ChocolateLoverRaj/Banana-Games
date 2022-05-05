import { ReferenceManagerEmitter } from './ReferenceManager/Emitter'

interface GetObserve<Input, TReturn> {
  get: (input: Input) => TReturn
  observe: (input: Input) => ReferenceManagerEmitter<[], unknown>
}

export default GetObserve
