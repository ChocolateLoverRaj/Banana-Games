import { Data as EmitterValueData, get } from '../mobx-emitter-value'
import MobxKeysPressed from '../MobxKeysPressed'
import SettingData from './Data'

const mobxIsInputPressed = (
  data: SettingData,
  mobxPressed: EmitterValueData<[boolean]>,
  keysPressed: MobxKeysPressed
): boolean =>
  get(mobxPressed)[0] ||
  [...data.keyBindings].some(key => keysPressed.keysPressed.has(key))

export default mobxIsInputPressed
