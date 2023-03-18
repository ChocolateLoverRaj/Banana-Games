import Observable from 'observables/lib/Observable'
import InputInputs from './gameWithSettings/InputInputs'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import playerIos from './playerIos'
import BooleanTypeSpecific from './BooleanTypeSpecific'
import getObserve from 'observables/lib/observableValue/getObserve'
import create from 'observables/lib/observableValue/create'

const combineBooleanInputs = (inputInputs: Observable<InputInputs>): Observable<boolean> =>
  createComputedObservable(observe =>
    observe(inputInputs).some(({ id, data }) => {
      const isActivated = playerIos.get(id)?.typeSpecific as BooleanTypeSpecific<any>
      return observe(isActivated(getObserve(create(data))))
    }))

export default combineBooleanInputs
