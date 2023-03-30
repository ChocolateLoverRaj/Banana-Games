import PlayerIosPresetType from '../PlayerIosPresetType'

interface NewInput {
  type: PlayerIosPresetType
  id: number
}
interface Player {
  selectedPreset: number
  ioId: number
}
interface State {
  players: Player[]
  newInputs: readonly NewInput[]
}

export default State
