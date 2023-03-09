import booleanPlayerInputKeyboard from './booleanPlayerInputKeyboard/booleanPlayerInputKeyboard'
import PlayerInput from './PlayerInput'
import PlayerInputType from './PlayerInputType'

const playerInputs: Map<PlayerInputType, readonly PlayerInput[]> = new Map([
  [PlayerInputType.BOOLEAN, [
    booleanPlayerInputKeyboard
  ]]
])

export default playerInputs
