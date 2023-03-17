import PlayerInputType from '../PlayerInputType'
import PlayerInputPreset from './PlayerInputPreset'
import Preset from './SettingsPreset'

interface Props {
  /**
   * Used for IndexedDB
   */
  id: string
  settings: readonly any[]
  playerInputs: readonly PlayerInputType[]
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly PlayerInputPreset[]
}

export default Props
