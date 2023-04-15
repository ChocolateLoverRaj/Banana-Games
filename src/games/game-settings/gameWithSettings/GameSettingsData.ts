import PlayerIoPreset from './PlayerIoPreset'
import Preset from './SettingsPreset'

interface GameSettingsData {
  settingsPresets: readonly Preset[]
  playerInputsPresets: ReadonlyMap<string, PlayerIoPreset>
}

export default GameSettingsData
