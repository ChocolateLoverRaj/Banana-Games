import PlayerInputWithInfo from '../PlayerInputWithInfo'
import PlayerInputPreset from './PlayerInputPreset'
import Preset from './SettingsPreset'
import Upgrade from './upgrade/Upgrde'

interface Props {
  /**
   * Used for IndexedDB
   */
  id: string
  /**
   * https://github.com/ChocolateLoverRaj/Banana-Games/discussions/79#discussioncomment-5348643
   */
  version: number
  /**
   * https://github.com/ChocolateLoverRaj/Banana-Games/discussions/79#discussioncomment-5348643
   */
  upgrade: Upgrade | undefined
  settings: readonly any[]
  playerInputs: readonly PlayerInputWithInfo[]
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly PlayerInputPreset[]
}

export default Props
