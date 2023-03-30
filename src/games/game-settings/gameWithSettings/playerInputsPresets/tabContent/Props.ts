import OnChange from '../../../../../util/OnChange'
import PlayerIoWithInfo from '../../../PlayerIoWithInfo'
import PlayerIoPreset from '../../PlayerIoPreset'

interface Props {
  playerInputs: readonly PlayerIoWithInfo[]
  value: PlayerIoPreset
  onChange: OnChange<PlayerIoPreset>
}

export default Props
