import Preset from './Preset'
import Setting from './Setting'

interface Props {
  /**
   * Used for IndexedDB
   */
  id: string
  settings: readonly Setting[]
  defaultPresets: readonly Preset[]
}

export default Props
