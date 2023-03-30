import PlayerIoPreset from '../PlayerIoPreset'
import OnChange from '../../../../util/OnChange'
import PlayerIoWithInfo from '../../PlayerIoWithInfo'

interface Props {
  playerInputs: readonly PlayerIoWithInfo[]
  value: readonly PlayerIoPreset[]
  onChange: OnChange<readonly PlayerIoPreset[]>
}

export default Props
