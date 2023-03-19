import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import Observable from 'observables/lib/Observable'
import get from 'observables/lib/syncAsync/get/get'
import Output from './useGameSettings/Output'

const isActivated = (syncAsync: Output, ioIndex: number): Observable<boolean> => 
  createComputedObservable(observe => {
    const io = observe(get(syncAsync)).data?.playerInputsPresets[ioIndex])
  })

export default isActivated
