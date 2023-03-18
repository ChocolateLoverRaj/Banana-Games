import OnChange from '../../../../../util/OnChange'
import PlayerIoWithInfo from '../../../PlayerIoWithInfo'
import PlayerInputPreset from '../../PlayerInputPreset'

interface Props {
  playerInputs: readonly PlayerIoWithInfo[]
  value: PlayerInputPreset
  onChange: OnChange<PlayerInputPreset>
}

export default Props
