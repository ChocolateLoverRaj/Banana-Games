import BooleanTypeSpecific from '../BooleanTypeSpecific'
import PlayerIo from '../playerInput/PlayerIo'
import PlayerIosPresetType from '../PlayerIosPresetType'
import PlayerIoType from '../PlayerIoType'
import Edit from './Edit'
import wrapGetObservable from 'observables/lib/wrapGetObservable/wrapGetObservable'
import { GamepadListener } from 'gamepad.js'

const booleanPlayerInputGamepad: PlayerIo<number, BooleanTypeSpecific<number>> = {
  name: 'Gamepad Button',
  playerIosPresetType: PlayerIosPresetType.GAMEPAD,
  ioType: PlayerIoType.BOOLEAN,
  renderEdit: ({ value, onChange }) => (
    <Edit
      value={value}
      onChange={onChange}
    />
  ),
  getDefaultData: () => -1,
  typeSpecific: (data, gamepadIndex) => wrapGetObservable({
    getValue: () =>
      data.getValue() !== -1 &&
      navigator.getGamepads()[gamepadIndex]?.buttons[data.getValue()].pressed === true,
    getInternalObserve: triggerUpdate => {
      const gamepadListener = new GamepadListener()
      // TODO: Maybe only listen for events specific to the button
      gamepadListener.on(`gamepad:${gamepadIndex}:button`, ({ detail: { button } }): void => {
        if (button === data.getValue()) triggerUpdate()
      })
      return {
        add: () => {
          console.log('start', gamepadIndex)
          gamepadListener.start()
        },
        remove: () => {
          gamepadListener.stop()
        }
      }
    }
  })
}

export default booleanPlayerInputGamepad
