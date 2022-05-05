import { Listener } from 'emitter2'
import AddDelete from '../AddDelete'
import { ReferenceManagerEmitter } from '../ReferenceManager/Emitter'

interface ReferenceEmitterValue<T extends unknown[], TAddDelete> {
  value: T
  referenceManagerEmitter: ReferenceManagerEmitter<T, Listener<T>>
  thingToAddAndDeleteOfIn: TAddDelete
  addDelete: AddDelete<TAddDelete, Listener<T>>
}

export default ReferenceEmitterValue
