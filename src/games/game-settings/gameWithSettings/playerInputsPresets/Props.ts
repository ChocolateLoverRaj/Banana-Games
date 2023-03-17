import PlayerInputPreset from '../PlayerInputPreset'
import OnChange from '../../../../util/OnChange'
import PlayerInputWithInfo from '../../PlayerInputWithInfo'

interface Props {
  playerInputs: readonly PlayerInputWithInfo[]
  value: readonly PlayerInputPreset[]
  onChange: OnChange<readonly PlayerInputPreset[]>
}

export default Props
