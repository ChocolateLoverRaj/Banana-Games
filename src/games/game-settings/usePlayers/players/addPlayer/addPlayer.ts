import get from 'observables/lib/observableValue/get'
import set from 'observables/lib/observableValue/set'
import Input from './Input'

const addPlayer = ({
  playersObservableValue,
  newInputIndex,
  presetId: presetIndex
}: Input): void => {
  const { players, newInputs } = get(playersObservableValue)
  set(playersObservableValue, {
    players: [
      ...players,
      {
        selectedPreset: presetIndex,
        ioId: newInputs[newInputIndex].id,
        type: newInputs[newInputIndex].type
      }
    ],
    newInputs: [
      ...newInputs.slice(0, newInputIndex),
      ...newInputs.slice(newInputIndex + 1)
    ]
  })
}

export default addPlayer
