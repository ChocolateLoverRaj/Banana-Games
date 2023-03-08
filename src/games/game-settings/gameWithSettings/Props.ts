import Preset from './Preset'
import Setting from './Setting'

interface Props {
  /**
   * Used for IndexedDB
   */
  id: string
  settings: readonly Setting[]
  playerInputs: readonly any[]
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly any[]
}

export default Props
