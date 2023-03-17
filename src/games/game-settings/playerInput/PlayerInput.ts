import PlayerInputsPresetType from '../PlayerInputsPresetType'
import PlayerInputType from '../PlayerInputType'
import RenderEdit from './renderEdit/RenderEdit'

interface PlayerInput<T> {
  renderEdit: RenderEdit<T>
  getDefaultData: () => T
  name: string
  playerInputsPresetType: PlayerInputsPresetType
  inputType: PlayerInputType
}

export default PlayerInput
