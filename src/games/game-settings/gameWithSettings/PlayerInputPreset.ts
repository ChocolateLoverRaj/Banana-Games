import PlayerInputPresetType from '../PlayerInputPresetType'
import InputInputs from './InputInputs'

interface PlayerInputPreset {
  name: string
  playerInputPresetType: PlayerInputPresetType
  inputs: readonly InputInputs[]
}

export default PlayerInputPreset
