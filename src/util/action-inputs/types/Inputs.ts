import { Map } from 'immutable'
import Input from './Input'

export type Inputs<Action extends string = string> = Map<Action, Input>

export default Inputs
