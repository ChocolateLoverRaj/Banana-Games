import ActionTypeSpecific from '../ActionTypeSpecific'
import PlayerIo from '../playerInput/PlayerIo'
import PlayerIoType from '../PlayerIoType'
import InputInputEditor from '../inputInputsEditor/InputInputsEditor'
import { css } from '@emotion/css'
import createWrappedListenable from '../../../createWrappedListenable/createWrappedListenable'
import Data from './Data'
import Edge from './Edge'
import { Select } from 'antd'
import Listener from 'observables/lib/Listener'
import combineBooleanInputs from '../combineBooleanInputs'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'

const actionFromBooleanInput: PlayerIo<Data, ActionTypeSpecific<Data>> = {
  name: 'Action From Boolean Input',
  ioType: PlayerIoType.ACTION,
  typeSpecific: (observableData) => createWrappedListenable(emit => {
    const isActivatedObservable = combineBooleanInputs(createComputedObservable(observe =>
      observe(observableData).inputInputs))
    let wasActivated = isActivatedObservable.getValue()
    const listener: Listener<[]> = () => {
      const isActivatedNow = isActivatedObservable.getValue()
      if (isActivatedNow !== wasActivated) {
        const { edge } = observableData.getValue()
        if (edge === Edge.RISING) {
          if (isActivatedNow) emit()
        } else {
          if (!isActivatedNow) emit()
        }
        wasActivated = isActivatedNow
      }
    }

    return {
      add: () => {
        isActivatedObservable.addRemove.add(listener)
      },
      remove: () => {
        isActivatedObservable.addRemove.remove(listener)
      }
    }
  }),
  getDefaultData: () => ({
    edge: Edge.RISING,
    inputInputs: []
  }),
  playerIosPresetType: undefined,
  renderEdit: ({ value, onChange, playerIosPresetType }) => (
    <>
      <Select
        value={value.edge}
        onChange={newValue => onChange({ ...value, edge: newValue })}
        options={[{
          value: Edge.RISING,
          label: 'Rising Edge'
        }, {
          value: Edge.FALLING,
          label: 'Falling Edge'
        }]}
      />
      <div className={css({ marginLeft: '2ch' })}>
        <InputInputEditor
          value={value.inputInputs}
          onChange={newValue => onChange({ ...value, inputInputs: newValue })}
          playerIoType={PlayerIoType.BOOLEAN}
          playerIosPresetType={playerIosPresetType}
        />
      </div>
    </>
  )
}

export default actionFromBooleanInput
