import { GameSettingAllFns } from '../../../util/gameSetting'
import Context from './Context'
import fns from './fns'
import { SaveData, saveFns } from './save'
import { AutoSaveData } from './save/autoSave'

const allFns: GameSettingAllFns = {
  coreFns: fns,
  saveFns: saveFns,
  initializeContext: (): Context => new Set(),
  initializeSaveData: ({ settingData, id }): SaveData => ({ settings: settingData, id }),
  initializeAutoSaveData: (saveData: SaveData): AutoSaveData => ({ saveData })
}

export default allFns
