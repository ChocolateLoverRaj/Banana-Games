import PlayerIoPreset from '../PlayerIoPreset'
import OnChange from '../../../../util/OnChange'
import PlayerIoWithInfo from '../../PlayerIoWithInfo'

interface Props {
  playerInputs: readonly PlayerIoWithInfo[]
  value: ReadonlyMap<string, PlayerIoPreset>
  onChange: OnChange<ReadonlyMap<string, PlayerIoPreset>>
}

export default Props
