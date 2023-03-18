import PlayerInputPreset from '../PlayerInputPreset'
import OnChange from '../../../../util/OnChange'
import PlayerIoWithInfo from '../../PlayerIoWithInfo'

interface Props {
  playerInputs: readonly PlayerIoWithInfo[]
  value: readonly PlayerInputPreset[]
  onChange: OnChange<readonly PlayerInputPreset[]>
}

export default Props
