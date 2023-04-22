import OnChange from '../../../../util/OnChange'
import InputInput from '../../gameWithSettings/InputInput'
import PlayerIosPresetType from '../../PlayerIosPresetType'
import PlayerIoType from '../../PlayerIoType'

interface Props {
  playerIosPresetType: PlayerIosPresetType
  value: InputInput
  onChange: OnChange<InputInput>
  onDelete: () => void
  playerIoType: PlayerIoType
}

export default Props
