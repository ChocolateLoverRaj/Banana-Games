import PlayerIoWithInfo from '../../PlayerIoWithInfo'
import PlayerIoPreset from '../PlayerIoPreset'
import Preset from '../SettingsPreset'
import Upgrade from '../upgrade/Upgrade'

interface Input {
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
  playerInputs: readonly PlayerIoWithInfo[]
  defaultSettingsPresets: readonly Preset[]
  defaultPlayerInputsPresets: readonly PlayerIoPreset[]
}

export default Input
