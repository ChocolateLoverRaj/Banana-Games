import get from 'observables/lib/observableValue/get'
import set from 'observables/lib/observableValue/set'
import Input from './Input'

const switchIo = ({
  playersObservableValue,
  newInputIndex,
  playerIndex,
  presetIndex
}: Input): void => {
  const { players, newInputs } = get(playersObservableValue)
  set(playersObservableValue, {
    players: [
      ...players.slice(0, playerIndex),
      {
        ...players[playerIndex],
        selectedPreset: presetIndex,
        ioId: newInputs[newInputIndex].id
      },
      ...players.slice(playerIndex + 1)
    ],
    newInputs: [
      ...newInputs.slice(0, newInputIndex),
      ...newInputs.slice(newInputIndex + 1)
    ]
  })
}

export default switchIo
