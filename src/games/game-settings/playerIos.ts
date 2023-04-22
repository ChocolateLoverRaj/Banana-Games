import actionFromBooleanInput from './actionFromBooleanInput/actionFromBooleanInput'
import booleanPlayerInputGamepad from './booleanPlayerInputGamepad/booleanPlayerInputGamepad'
import booleanPlayerInputKeyboard from './booleanPlayerInputKeyboard/booleanPlayerInputKeyboard'
import PlayerIoId from './gameWithSettings/PlayerIoId'
import PlayerIo from './playerInput/PlayerIo'

const playerIos = new Map<PlayerIoId, PlayerIo<any, any>>([
  [PlayerIoId.BOOLEAN_KEYBOARD, booleanPlayerInputKeyboard],
  [PlayerIoId.ACTION_FROM_BOOLEAN_INPUT, actionFromBooleanInput],
  [PlayerIoId.BOOLEAN_GAMEPAD, booleanPlayerInputGamepad]
])

export default playerIos
