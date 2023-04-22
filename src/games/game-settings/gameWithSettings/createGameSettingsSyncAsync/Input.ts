import PlayerIoPreset from '../PlayerIoPreset'
import Preset from '../SettingsPreset'
import Upgrade from '../upgrade/Upgrade'

interface Input {
  /**
   * Used for IndexedDB
   */
  id: string
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerIoPresets: readonly PlayerIoPreset[]
  version: number
  upgrade: Upgrade | undefined
}

export default Input
