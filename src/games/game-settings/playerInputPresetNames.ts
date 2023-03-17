import PlayerInputsPresetType from './PlayerInputsPresetType'

const playerInputPresetNames: Map<PlayerInputsPresetType, string> = new Map([
  [PlayerInputsPresetType.KEYBOARD_AND_MOUSE, 'Keyboard & Mouse'],
  [PlayerInputsPresetType.GAMEPAD, 'Gamepad']
])

export default playerInputPresetNames
