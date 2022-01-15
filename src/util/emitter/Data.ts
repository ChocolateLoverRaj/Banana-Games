import Listener from './Listener'

export type Data<T extends unknown[]> = Set<Listener<T>>

export default Data
