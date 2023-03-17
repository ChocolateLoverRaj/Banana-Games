import OnChange from '../../../../../util/OnChange'
import PlayerInputWithInfo from '../../../PlayerInputWithInfo'
import PlayerInputPreset from '../../PlayerInputPreset'

interface Props {
  playerInputs: readonly PlayerInputWithInfo[]
  value: PlayerInputPreset
  onChange: OnChange<PlayerInputPreset>
}

export default Props
