import PlayerIosPresetType from '../PlayerIosPresetType'
import InputInputs from './InputInputs'

interface PlayerIoPreset {
  name: string
  playerInputPresetType: PlayerIosPresetType
  inputs: readonly InputInputs[]
}

export default PlayerIoPreset
