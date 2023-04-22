import Observable from 'observables/lib/Observable'
import InputInputs from './gameWithSettings/InputInputs'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import playerIos from './playerIos'
import BooleanTypeSpecific from './BooleanTypeSpecific'
import createConstantObservable from '../../util/createConstantObservable'

const combineBooleanInputs = (
  inputInputs: Observable<InputInputs>,
  deviceId: number
): Observable<boolean> =>
  createComputedObservable(observe =>
    observe(inputInputs).some(({ id, data }) => {
      const isActivated = playerIos.get(id)?.typeSpecific as BooleanTypeSpecific<any>
      return observe(isActivated(createConstantObservable(data), deviceId))
    }))

export default combineBooleanInputs
