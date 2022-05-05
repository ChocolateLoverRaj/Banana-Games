import ObservableSet from '../ObservableSet'
import { Listener, emit } from 'emitter2'
import { create, ReferenceManagerEmitter } from '../../ReferenceManager/Emitter'

const has = <T>(
  observableSet: ObservableSet<T>,
  value: T
): ReferenceManagerEmitter<[], Listener<[ReadonlySet<T>]>> => create({
    load: emitter => {
      const listener: Listener<[ReadonlySet<T>]> = changedValues => {
        if (changedValues.has(value)) {
          emit(emitter)
        }
      }
      observableSet.emitter.add(listener)
      return listener
    },
    unload: (emitter, listener) => {
      observableSet.emitter.delete(listener)
    }
  })

export default has
