import SaveData from './SaveData'
import { toJS } from 'mobx'
import pick from 'object.pick'

const save = (saveData: SaveData): any =>
  pick(toJS(saveData.settings), ['keyBindings', 'screenRects'])

export default save
