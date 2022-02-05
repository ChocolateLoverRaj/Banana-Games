import { Data as Emitter, Listener } from 'emitter2'

interface Data<T extends unknown[]> {
  emitter: Emitter<T>
  listener: Listener<T>
  value?: T
}

export default Data
