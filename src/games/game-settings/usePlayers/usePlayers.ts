import never from 'never'
import create from 'observables/lib/observableValue/create'
import getObservableValue from 'observables/lib/observableValue/get'
import set from 'observables/lib/observableValue/set'
import getSyncAsync from 'observables/lib/syncAsync/get/get'
import { useEffect } from 'react'
import useConstant from 'use-constant'
import Listener from '../../../listenable/Listener'
import useGameSettings from '../gameWithSettings/useGameSettings/useGameSettings'
import PlayerIosPresetType from '../PlayerIosPresetType'
import Input from './Input'
import ioPresetTriggers from './ioPresetTriggers'
import add from './listenable2/add'
import Listenable2 from './listenable2/Listenable2'
import remove from './listenable2/remove'
import Output from './Output'
import State from './State'
import useObserve from './useObserve'

const usePlayers = ({ useGameSettingsInput, maxPlayers }: Input): Output => {
  const stateObservableValue = useConstant(() => create<State>({
    players: [],
    newInputs: []
  }))
  const useGameSettingsOutput = useGameSettings(useGameSettingsInput)
  const { data } = useObserve(getSyncAsync(useGameSettingsOutput))
  useObserve(useGameSettingsOutput.load, true)

  useEffect(() => {
    console.log('effect')
    if (data !== undefined) {
      interface Trigger {
        type: PlayerIosPresetType
        listenable: Listenable2<readonly [number]>
      }
      const triggers = [...data.playerInputsPresets.values()]
        .flatMap<Trigger>(({ playerInputPresetType }) => ({
        type: playerInputPresetType,
        listenable: ioPresetTriggers.get(playerInputPresetType) ?? never()
      }))

      const listeners: Array<Listener<readonly [number]>> = triggers.map(({ type }) => (id) => {
        const state = getObservableValue(stateObservableValue)
        if (
          // This input wasn't already detected
          !state.newInputs.some(
            ({ type: currentType, id: currentId }) => currentType === type && currentId === id) &&
          // There isn't a player with this input already
          !state.players.some(({ type: currentType, ioId }) =>
            currentType === type &&
            ioId === id)) {
          set(stateObservableValue, {
            ...state,
            newInputs: [
              ...state.newInputs,
              {
                type,
                id
              }
            ]
          })
        }
      })
      triggers.forEach(({ listenable }, index) => add({ listenable, listener: listeners[index] }))
      return () => triggers.forEach(({ listenable }, index) =>
        remove({ listenable, listener: listeners[index] }))
    }
  }, [data])

  return stateObservableValue
}

export default usePlayers
