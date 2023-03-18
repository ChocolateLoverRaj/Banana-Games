import PlayerInputsPresetType from '../PlayerInputsPresetType'
import PlayerInputType from '../PlayerInputType'
import RenderEdit from './renderEdit/RenderEdit'

interface PlayerInput<Data, TypeSpecific> {
  renderEdit: RenderEdit<Data>
  getDefaultData: () => Data
  name: string
  playerInputsPresetType: PlayerInputsPresetType
  inputType: PlayerInputType
  typeSpecific: TypeSpecific
}

export default PlayerInput
