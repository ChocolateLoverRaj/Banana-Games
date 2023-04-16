import Observable from 'observables/lib/Observable'
import UsePlayerOutput from './Output'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import getObserve from 'observables/lib/observableValue/getObserve'
import UseGameSettingsOutput from '../gameWithSettings/useGameSettings/Output'
import get from 'observables/lib/syncAsync/get/get'
import never from 'never'
import PlayerIoType from '../PlayerIoType'
import InputInputs from '../gameWithSettings/InputInputs'
import combineBooleanInputs from '../combineBooleanInputs'
import createConstantObservable from '../../../util/createConstantObservable'

type Combiner<T> = (inputInputs: Observable<InputInputs>, deviceId: number) => T

const combiners = new Map<PlayerIoType, Combiner<any>>([
  [PlayerIoType.BOOLEAN, combineBooleanInputs]
])

const getTypeSpecific = <TypeSpecific>(
  playersObservableValue: UsePlayerOutput,
  playerIndex: number,
  ioIndex: number,
  gameSettings: UseGameSettingsOutput,
  type: PlayerIoType
): Observable<TypeSpecific | undefined> => createComputedObservable(observe => {
    const { players } = observe(getObserve(playersObservableValue))
    const { selectedPreset, ioId } = players[playerIndex]
    const settings = observe(get(gameSettings)).data
    if (settings === undefined) return
    const { inputs } =
      (settings.playerInputsPresets.get(selectedPreset) ?? never())
    const combinedTypeSpecific = (combiners.get(type) ?? never())(
      createConstantObservable(inputs[ioIndex]),
      ioId)
    return combinedTypeSpecific
  })

export default getTypeSpecific
