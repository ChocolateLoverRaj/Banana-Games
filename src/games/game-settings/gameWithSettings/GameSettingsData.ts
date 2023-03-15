import PlayerInputPreset from './PlayerInputPreset'
import Preset from './SettingsPreset'

interface GameSettingsData {
  settingsPresets: readonly Preset[]
  playerInputsPresets: readonly PlayerInputPreset[]
}

export default GameSettingsData
