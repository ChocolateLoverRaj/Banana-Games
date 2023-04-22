import Observable from 'observables/lib/Observable'
import InputInputs from '../gameWithSettings/InputInputs'

type Combiner<T> = (inputInputs: Observable<InputInputs>, deviceId: number) => T

export default Combiner
