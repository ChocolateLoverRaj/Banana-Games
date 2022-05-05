import { ReferenceManager } from '../..'
import GetObserve from '../../GetObserve'
import { reference, unReference } from '../../ReferenceManager'
import { emit, Listener } from 'emitter2'
import { LoadedSetting } from '../useGameWithSettings'
import { ObservablePromise } from '../../ObservablePromise'

const getObserveLoadedSetting: GetObserve<
ReferenceManager.ReferenceManager<ObservablePromise<LoadedSetting>>,
LoadedSetting | undefined> = {
  get: referenceManager => {
    const commonParam = referenceManager.loadedValue.value?.result
    return commonParam
  },
  observe: referenceManager =>
    ReferenceManager.Emitter.create<[], Listener<[]>>({
      load: emitter => {
        const promise = reference(referenceManager)
        const listener: Listener<[]> = () => emit(emitter)
        promise.emitter.add(listener)
        return listener
      },
      unload: (_, listener) => {
        referenceManager.loadedValue.emitter.delete(listener)
        unReference(referenceManager)
      }
    })

}

export default getObserveLoadedSetting
