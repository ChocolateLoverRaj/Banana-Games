import { Map, Set } from 'immutable'

export type Keys<Action extends string = string> = Map<Action, Set<string>>

export default Keys
