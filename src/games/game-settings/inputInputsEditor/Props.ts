import OnChange from '../../../util/OnChange'
import PlayerIosPresetType from '../PlayerIosPresetType'
import PlayerIoType from '../PlayerIoType'
import InputInputs from '../gameWithSettings/InputInputs'

interface Props {
  playerIosPresetType: PlayerIosPresetType
  value: InputInputs
  onChange: OnChange<InputInputs>
  playerIoType: PlayerIoType
}

export default Props
