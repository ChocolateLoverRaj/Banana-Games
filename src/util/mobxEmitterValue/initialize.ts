import { Data as EmitterData, Listener } from 'emitter2'
import Data from './Data'
import { createAtom } from 'mobx'

const initialize = <T extends unknown[]>(
  emitter: EmitterData<T>,
  initialValue: T,
  atomName = 'Emitter Value'
): Data<T> => {
  const listener: Listener<T> = (...params) => {
    data.value = params
    atom.reportChanged()
  }
  const atom = createAtom(
    atomName,
    () => {
      emitter.add(listener)
    }, () => {
      emitter.delete(listener)
    })
  const data: Data<T> = { atom, value: initialValue }
  return data
}

export default initialize
