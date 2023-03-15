import Preset from '../SettingsPreset'

interface Input {
  /**
   * Used for IndexedDB
   */
  id: string
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly any[]
}

export default Input
