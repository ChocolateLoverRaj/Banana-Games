import PlayerIosPresetType from './PlayerIosPresetType'

const playerIoPresetNames: Map<PlayerIosPresetType, string> = new Map([
  [PlayerIosPresetType.KEYBOARD_AND_MOUSE, 'Keyboard & Mouse'],
  [PlayerIosPresetType.GAMEPAD, 'Gamepad']
])

export default playerIoPresetNames
