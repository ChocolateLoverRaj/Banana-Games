import { ObservableValue } from '../ObservableValue'
import { LoadUnload } from '.'

interface ReferenceManager<T> {
  loadUnload: LoadUnload<T>
  references: ObservableValue<number>
  loadedValue: ObservableValue<T | undefined>
}

export default ReferenceManager
