import PlayerIosPresetType from "../PlayerIosPresetType"
import { GamepadListener } from 'gamepad.js'

interface Listenable {

}

const gamepadListener = new GamepadListener()
const ioPresetTrigger = new Map<PlayerIosPresetType, Get<Listenable<readonly [number]>>>([
  [PlayerIosPresetType.KEYBOARD_AND_MOUSE, {
    add: listener => {
      window.addEventListener('keydown', listener)
      window.addEventListener('keyup', listener)
      window.addEventListener('keypress', listener)
    },
    remove: listener => {
      window.removeEventListener('keydown', listener)
      window.removeEventListener('keyup', listener)
      window.removeEventListener('keypress', listener)
    }
  }],
  [PlayerIosPresetType.GAMEPAD, () => {
    const gamepadListenerEventHandler: any = ({index}) => {
      
    }
    return {
    add: listener => {
      gamepadListener.on('gamepad:connected', gamepadListenerEventHandler)
      gamepadListener.on('gamepad:axis', gamepadListenerEventHandler)
      gamepadListener.on('gamepad:button', gamepadListenerEventHandler)
    }
  }
}]
])

export default ioPresetTriggers
