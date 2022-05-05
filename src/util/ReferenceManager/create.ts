import { LoadUnload, ReferenceManager } from '.'
import * as ObservableValue from '../ObservableValue'

const create = <T>(loadUnload: LoadUnload<T>): ReferenceManager<T> => ({
  loadUnload,
  references: ObservableValue.create(0),
  loadedValue: ObservableValue.create(undefined)
})

export default create
