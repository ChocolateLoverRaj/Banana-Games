import { Listener, emit } from 'emitter2'
import { ReferenceEmitterValue } from '.'
import { Emitter } from '../ReferenceManager'
import { isArraySame } from 'is-array-same'
import AddDelete from '../AddDelete'

const create = <T extends unknown[], TAddDelete>(
  thingToAddAndDeleteOfIn: TAddDelete,
  addDelete: AddDelete<TAddDelete, Listener<T>>,
  initialValue: T
): ReferenceEmitterValue<T, TAddDelete> => {
  const { add, deleteValue } = addDelete
  const referenceEmitterValue: ReferenceEmitterValue<T, TAddDelete> = {
    thingToAddAndDeleteOfIn,
    value: initialValue,
    referenceManagerEmitter: Emitter.create({
      load: emitter => {
        const listener: Listener<T> = (...params) => {
          if (!(isArraySame(params, referenceEmitterValue.value) as boolean)) {
            referenceEmitterValue.value = params
            emit(emitter, ...params)
          }
        }
        add(thingToAddAndDeleteOfIn, listener)
        return listener
      },
      unload: (_, listener) => {
        deleteValue(thingToAddAndDeleteOfIn, listener)
      }
    }),
    addDelete
  }
  return referenceEmitterValue
}

export default create
