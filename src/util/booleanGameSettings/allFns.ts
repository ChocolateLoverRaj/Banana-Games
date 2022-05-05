import { GameSettingAllFns } from '../gameSetting'
import booleanGameSettingFns from './booleanGameSettingFns'
import { SaveData, saveFns } from './save'

const allFns: GameSettingAllFns = {
  coreFns: booleanGameSettingFns,
  saveFns: saveFns,
  initializeContext: () => new Set(),
  initializeSaveData: ({ settingData, id }): SaveData => ({ settings: settingData, id }),
  initializeAutoSaveData: (saveData: SaveData) => ({ saveData }),
  dbStoreName: 'boolean'
}

export default allFns
