import { Map } from 'immutable'

export type Keys<Action extends string = string> = Map<Action, string>

export default Keys
