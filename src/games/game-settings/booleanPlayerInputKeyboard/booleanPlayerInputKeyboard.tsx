import wrapGetObservable from 'observables/lib/wrapGetObservable/wrapGetObservable'
import BooleanTypeSpecific from '../BooleanTypeSpecific'
import PlayerInput from '../playerInput/PlayerInput'
import PlayerInputsPresetType from '../PlayerInputsPresetType'
import PlayerInputType from '../PlayerInputType'
import Edit from './Edit'

const booleanPlayerInputKeyboard: PlayerInput<string, BooleanTypeSpecific<string>> = {
  name: 'Key Pressed',
  playerInputsPresetType: PlayerInputsPresetType.KEYBOARD_AND_MOUSE,
  inputType: PlayerInputType.BOOLEAN,
  renderEdit: ({ value, onChange }) => (
    <Edit
      value={value}
      onChange={onChange}
    />
  ),
  getDefaultData: () => '',
  typeSpecific: data => {
    // TODO: Consider only storing boolean instead of all keys pressed
    const keysPressed: Set<string> = new Set()
    return wrapGetObservable({
      getValue: () => keysPressed.has(data.getValue()),
      getInternalObserve: triggerUpdate => {
        const keydownListener = (e: KeyboardEvent): void => {
          keysPressed.add(e.key)
          triggerUpdate()
        }
        return {
          add: () => {
            data.addRemove.add(triggerUpdate)
            window.addEventListener('keydown', keydownListener)
          },
          remove: () => {
            data.addRemove.remove(triggerUpdate)
            window.removeEventListener('keydown', keydownListener)
          }
        }
      }
    })
  }
}

export default booleanPlayerInputKeyboard
