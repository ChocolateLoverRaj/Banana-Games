import PlayerInputType from '../PlayerInputType'
import Preset from './SettingsPreset'

interface Props {
  /**
   * Used for IndexedDB
   */
  id: string
  settings: readonly any[]
  playerInputs: readonly PlayerInputType[]
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly any[]
}

export default Props
