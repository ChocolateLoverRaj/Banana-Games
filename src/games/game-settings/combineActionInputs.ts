import playerIos from './playerIos'
import createConstantObservable from '../../util/createConstantObservable'
import ActionTypeSpecific from './ActionTypeSpecific'
import createWrappedListenable from '../../createWrappedListenable/createWrappedListenable'
import Combiner from './usePlayers/Combiner'
import Listenable from '../../listenable/Listenable'
import Listener from 'observables/lib/Listener'

const combineActionInputs: Combiner<ReturnType<ActionTypeSpecific<any>>> = (
  inputInputs,
  deviceId
) =>
  createWrappedListenable(emit => {
    // TODO: Less messy
    let listenables: ReadonlyArray<Listenable<readonly []>> | undefined
    const listener: Listener<[]> = () => {
      listenables?.forEach(({ remove }) => remove(emit))
      listenables = inputInputs.getValue().map(({ id, data }) => {
        const getListenable = (playerIos.get(id)?.typeSpecific as ActionTypeSpecific<any>)
        return getListenable({ data: createConstantObservable(data), deviceId })
      })
      listenables?.forEach(({ add }) => add(emit))
    }

    return {
      add: () => {
        listener()
        inputInputs.addRemove.add(listener)
      },
      remove: () => {
        inputInputs.addRemove.remove(listener)
        listenables?.forEach(({ remove }) => remove(emit))
      }
    }
  })

export default combineActionInputs
