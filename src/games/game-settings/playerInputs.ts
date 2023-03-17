import booleanPlayerInputKeyboard from './booleanPlayerInputKeyboard/booleanPlayerInputKeyboard'
import PlayerInputId from './gameWithSettings/PlayerInputId'
import PlayerInput from './playerInput/PlayerInput'

const playerInputs: Map<PlayerInputId, PlayerInput<any>> = new Map([
  [PlayerInputId.BOOLEAN_KEYBOARD, booleanPlayerInputKeyboard]
])

export default playerInputs
