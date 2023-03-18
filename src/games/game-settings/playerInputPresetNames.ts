import PlayerIosPresetType from './PlayerIosPresetType'

const playerInputPresetNames: Map<PlayerIosPresetType, string> = new Map([
  [PlayerIosPresetType.KEYBOARD_AND_MOUSE, 'Keyboard & Mouse'],
  [PlayerIosPresetType.GAMEPAD, 'Gamepad']
])

export default playerInputPresetNames
