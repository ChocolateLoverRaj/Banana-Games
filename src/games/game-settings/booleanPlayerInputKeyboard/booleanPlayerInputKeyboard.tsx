import wrapGetObservable from 'observables/lib/wrapGetObservable/wrapGetObservable'
import BooleanTypeSpecific from '../BooleanTypeSpecific'
import PlayerIo from '../playerInput/PlayerIo'
import PlayerIosPresetType from '../PlayerIosPresetType'
import PlayerIoType from '../PlayerIoType'
import Edit from './Edit'

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
  typeSpecific: data => {
    // TODO: Consider only storing boolean instead of all keys pressed
    const keysPressed: Set<string> = new Set()
    return wrapGetObservable({
      getValue: () => console.log(keysPressed, data.getValue(), keysPressed.has(data.getValue())) || keysPressed.has(data.getValue()),
      getInternalObserve: triggerUpdate => {
        const keydownListener = (e: KeyboardEvent): void => {
          keysPressed.add(e.code)
          triggerUpdate()
          console.log('update', e.code, data.getValue())
        }
        const keyupListener = (e: KeyboardEvent): void => {
          keysPressed.add(e.code)
          triggerUpdate()
        }
        return {
          add: () => {
            data.addRemove.add(triggerUpdate)
            window.addEventListener('keydown', keydownListener)
            window.addEventListener('keyup', keyupListener)
          },
          remove: () => {
            data.addRemove.remove(triggerUpdate)
            window.removeEventListener('keydown', keydownListener)
            window.removeEventListener('keyup', keyupListener)
          }
        }
      }
    })
  }
}

export default booleanPlayerInputKeyboard
