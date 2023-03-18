import actionFromBooleanInput from './actionFromBooleanInput/actionFromBooleanInput'
import booleanPlayerInputKeyboard from './booleanPlayerInputKeyboard/booleanPlayerInputKeyboard'
import PlayerIoId from './gameWithSettings/PlayerIoId'
import PlayerIo from './playerInput/PlayerIo'

const playerIos: Map<PlayerIoId, PlayerIo<any, any>> = new Map([
  [PlayerIoId.BOOLEAN_KEYBOARD, booleanPlayerInputKeyboard],
  [PlayerIoId.ACTION_FROM_BOOLEAN_INPUT, actionFromBooleanInput]
])

export default playerIos
