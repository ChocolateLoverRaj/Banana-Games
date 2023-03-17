import PlayerInputsPresetType from '../PlayerInputsPresetType'
import InputInputs from './InputInputs'

interface PlayerInputPreset {
  name: string
  playerInputPresetType: PlayerInputsPresetType
  inputs: readonly InputInputs[]
}

export default PlayerInputPreset
