import KeysPressed from '../KeysPressed'
import BooleanGameSetting from './BooleanGameSetting'

const isInputPressed = (input: BooleanGameSetting, keysPressed: KeysPressed): boolean =>
  input.isTouchButtonPressed ||
  [...input.keyBindings].some(key => keysPressed.keysPressed.has(key))

export default isInputPressed
