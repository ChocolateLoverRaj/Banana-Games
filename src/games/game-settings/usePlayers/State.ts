interface NewInput {
  type: PlayerIosPresetType
  id: number
}
interface Player {
  selectedPreset: number
}
interface State {
  players: Player[]
  newInputs: readonly NewInput[]
}

export default State
