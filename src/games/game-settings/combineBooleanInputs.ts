import Observable from 'observables/lib/Observable'
import InputInputs from './gameWithSettings/InputInputs'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import playerIos from './playerIos'
import BooleanTypeSpecific from './BooleanTypeSpecific'
import createConstantObservable from '../../util/createConstantObservable'

const combineBooleanInputs = (
  inputInputs: Observable<InputInputs>,
  deviceId: number
): Observable<boolean> => {
  // FIXME: observe
  const isActivatedObservables = inputInputs.getValue().map(({ id, data }) => {
    const isActivated = playerIos.get(id)?.typeSpecific as BooleanTypeSpecific<any>
    const isActivatedObservable = isActivated(createConstantObservable(data), deviceId)
    return isActivatedObservable
  })

  return createComputedObservable(observe =>
    isActivatedObservables.some(observable => observe(observable)))
}

export default combineBooleanInputs
