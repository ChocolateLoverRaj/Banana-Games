import { GameSettingAllFns } from '../gameSetting'
import booleanGameSettingFns from './booleanGameSettingFns'
import { SaveData, saveFns } from './save'
import { AutoSaveData } from './save/autoSave'

const allFns: GameSettingAllFns = {
  coreFns: booleanGameSettingFns,
  saveFns: saveFns,
  initializeContext: () => new Set(),
  initializeSaveData: ({ settingData, id }): SaveData => ({ settings: settingData, id }),
  initializeAutoSaveData: (saveData: SaveData): AutoSaveData => ({ saveData })
}

export default allFns
