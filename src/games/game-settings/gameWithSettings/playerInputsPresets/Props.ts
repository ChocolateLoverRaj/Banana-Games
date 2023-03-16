import PlayerInputPreset from '../PlayerInputPreset'
import OnChange from '../../../../util/OnChange'

interface Props {
  value: readonly PlayerInputPreset[]
  onChange: OnChange<readonly PlayerInputPreset[]>
}

export default Props
