import Preset from '../SettingsPreset'
import Upgrade from '../upgrade/Upgrade'

interface Input {
  /**
   * Used for IndexedDB
   */
  id: string
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly any[]
  version: number
  upgrade: Upgrade | undefined
}

export default Input
