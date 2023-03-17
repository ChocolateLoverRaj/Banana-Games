import OnChange from '../../../../../../util/OnChange'
import PlayerInputsPresetType from '../../../../PlayerInputsPresetType'
import PlayerInputType from '../../../../PlayerInputType'
import InputInputs from '../../../InputInputs'

interface Props {
  playerInputsPresetType: PlayerInputsPresetType
  value: InputInputs
  onChange: OnChange<InputInputs>
  playerInputType: PlayerInputType
}

export default Props
