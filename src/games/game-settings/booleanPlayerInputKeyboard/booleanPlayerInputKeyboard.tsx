import BooleanTypeSpecific from '../BooleanTypeSpecific'
import PlayerIo from '../playerInput/PlayerIo'
import PlayerIosPresetType from '../PlayerIosPresetType'
import PlayerIoType from '../PlayerIoType'
import Edit from './Edit'
import observableKeysPressed from '../../../util/observableKeysPressed'
import createComputedObservable from 'observables/lib/computedObservable/createComputedObservable'
import has from 'observables/lib/observableSet/getObservable/has'

const booleanPlayerInputKeyboard: PlayerIo<string, BooleanTypeSpecific<string>> = {
  name: 'Key Pressed',
  playerIosPresetType: PlayerIosPresetType.KEYBOARD_AND_MOUSE,
  ioType: PlayerIoType.BOOLEAN,
  renderEdit: ({ value, onChange }) => (
    <Edit
      value={value}
      onChange={onChange}
    />
  ),
  getDefaultData: () => '',
  typeSpecific: data =>
    createComputedObservable(observe => observe(has(observe(observableKeysPressed), observe(data))))
}

export default booleanPlayerInputKeyboard
