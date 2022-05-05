import { ObservableValue } from '.'
import { emit } from 'emitter2'

const set = <T>(observableValue: ObservableValue<T>, valueToSet: T): void => {
  if (valueToSet !== observableValue.value) {
    observableValue.value = valueToSet
    emit(observableValue.emitter)
  }
}

export default set
