import { Data as EmitterValue } from '../emitterValue'
import KeysPressed from '../KeysPressed'
import SettingData from './Data'

const isInputPressed = (
  data: SettingData,
  touchButtonPressed: EmitterValue<[boolean]>,
  keysPressed: KeysPressed
): boolean =>
  touchButtonPressed.value?.[0] === true ||
  [...data.keyBindings].some(key => keysPressed.keysPressed.has(key))

export default isInputPressed
