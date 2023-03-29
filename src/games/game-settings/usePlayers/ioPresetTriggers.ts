import PlayerIosPresetType from '../PlayerIosPresetType'
import { GamepadListener } from 'gamepad.js'
import Listenable2 from './listenable2/Listenable2'
import create from './listenable2/create/create'

const ioPresetTriggers = new Map<PlayerIosPresetType, Listenable2<readonly [number]>>([
  [PlayerIosPresetType.KEYBOARD_AND_MOUSE, create(emit => {
    const internalListener = (): void => emit(0)
    const events: string[] = [
      'keydown',
      'keyup',
      'keypress',
      'mousemove',
      'mousedown',
      'mouseup'
    ]
    return {
      subscribe: () => {
        events.forEach(event => window.addEventListener(event, internalListener))
      },
      unsubscribe: () => {
        events.forEach(event => window.removeEventListener(event, internalListener))
      }
    }
  })],
  [PlayerIosPresetType.GAMEPAD, create(emit => {
    const internalListener = (): void => emit(0)
    const events: string[] = [
      'gamepad:connected',
      'gamepad:axis',
      'gamepad:button'
    ]
    const gamepadListener = new GamepadListener()
    events.forEach(event => gamepadListener.on(event, internalListener))
    return {
      subscribe: () => {
        gamepadListener.start()
      },
      unsubscribe: () => {
        gamepadListener.stop()
      }
    }
  })]
])

export default ioPresetTriggers
