import PlayerIosPresetType from '../PlayerIosPresetType'
import InputInputs from './InputInputs'

interface PlayerInputPreset {
  name: string
  playerInputPresetType: PlayerIosPresetType
  inputs: readonly InputInputs[]
}

export default PlayerInputPreset
