import Option from './Option'

interface Data<T> {
  name: string
  options: ReadonlyArray<Option<T>>
  defaultOption: T
  selectedOption: T
}

export default Data
