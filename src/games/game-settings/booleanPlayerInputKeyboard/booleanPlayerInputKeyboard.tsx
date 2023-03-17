import PlayerInput from '../playerInput/PlayerInput'
import PlayerInputsPresetType from '../PlayerInputsPresetType'
import PlayerInputType from '../PlayerInputType'
import Edit from './Edit'

const booleanPlayerInputKeyboard: PlayerInput<string> = {
  name: 'Key Pressed',
  playerInputsPresetType: PlayerInputsPresetType.KEYBOARD_AND_MOUSE,
  inputType: PlayerInputType.BOOLEAN,
  renderEdit: ({ value, onChange }) => (
    <Edit
      value={value}
      onChange={onChange}
    />
  ),
  getDefaultData: () => ''
}

export default booleanPlayerInputKeyboard
