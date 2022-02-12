import Data from './Data'
import Option from './Option'
import { makeObservable, observable } from 'mobx'

const initialize = <T>(
  name: string,
  options: ReadonlyArray<Option<T>>,
  defaultOption: T
): Data<T> => makeObservable({
    name,
    options,
    defaultOption,
    selectedOption: defaultOption
  }, {
    selectedOption: observable.ref
  })

export default initialize
