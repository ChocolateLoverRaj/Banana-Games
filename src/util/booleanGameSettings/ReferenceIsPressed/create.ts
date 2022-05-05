import { Data, Context } from '..'
import { ReferenceIsPressed } from '.'
import { reference, unReference } from '../../ReferenceManager'
import { ReferenceEmitterValue, ReferenceManager } from '../..'
import { keysPressed } from '../../ReferenceKeysPressed'
import { emit } from 'emitter2'
import setAddDelete from '../../setAddDelete'
import { add, deleteValue } from '../../ReferenceManager/Emitter'

const create = (data: Data, context: Context): ReferenceIsPressed => {
  return ReferenceEmitterValue.create(ReferenceManager.Emitter.create({
    load: emitter => {
      const referenceEmitterValue = ReferenceEmitterValue.create(context, setAddDelete, [false])
      const observableKeysPressed = reference(keysPressed).keysPressed
      const listener = (): void => {
        // FIXME: react to changed keyBindings
        const isPressed =
          [...data.keyBindings].some(code => observableKeysPressed.set.has(code)) ||
          referenceEmitterValue.value[0]
        emit(emitter, isPressed)
      }
      add(referenceEmitterValue.referenceManagerEmitter, listener)
      observableKeysPressed.emitter.add(listener)
      return {
        listener,
        referenceEmitterValue,
        observableKeysPressed
      }
    },
    unload: (_, { listener, referenceEmitterValue, observableKeysPressed }) => {
      deleteValue(referenceEmitterValue.referenceManagerEmitter, listener)
      setAddDelete.deleteValue(referenceEmitterValue.thingToAddAndDeleteOfIn, listener)
      observableKeysPressed.emitter.delete(listener)
      unReference(keysPressed)
    }
  }), ReferenceManager.Emitter.addDelete, [false])
}

export default create
