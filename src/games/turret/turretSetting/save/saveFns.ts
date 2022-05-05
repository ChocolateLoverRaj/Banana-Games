import { SaveGameSettingFns } from '../../../../util/gameSetting'
import { AutoSaveData, start, stop } from './autoSave'
import load from './load'
import SaveData from './SaveData'

const saveFns: SaveGameSettingFns<SaveData, AutoSaveData> = {
  load,
  autoSave: {
    start,
    stop
  }
}

export default saveFns
