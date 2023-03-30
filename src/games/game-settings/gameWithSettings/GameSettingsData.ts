import PlayerIoPreset from './PlayerIoPreset'
import Preset from './SettingsPreset'

interface GameSettingsData {
  settingsPresets: readonly Preset[]
  playerInputsPresets: readonly PlayerIoPreset[]
}

export default GameSettingsData
