import OnChange from '../../../../../../../util/OnChange'
import InputInput from '../../../../InputInput'
import PlayerInputsPresetType from '../../../../../PlayerInputsPresetType'

interface Props {
  playerInputsPresetType: PlayerInputsPresetType
  value: InputInput
  onChange: OnChange<InputInput>
  onDelete: () => void
}

export default Props
