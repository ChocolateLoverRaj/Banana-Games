import OnChange from '../../../../util/OnChange'
import PlayerIosPresetType from '../../PlayerIosPresetType'

interface Input<T> {
  value: T
  onChange: OnChange<T>
  playerIosPresetType: PlayerIosPresetType
}

export default Input
