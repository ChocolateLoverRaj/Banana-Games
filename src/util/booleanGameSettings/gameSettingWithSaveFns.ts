import GameSettingWithSaveFns from '../gameSetting/GameSettingWithSaveFns'
import { AutoSaveData } from './save/autoSave'
import booleanGameSettingFns from './booleanGameSettingFns'
import Context from './Context'
import Data from './Data'
import { saveFns, SaveData } from './save'

const gameSettingWithSaveFns: GameSettingWithSaveFns<Data, Context, SaveData, AutoSaveData> = {
  settingFns: booleanGameSettingFns,
  saveFns
}

export default gameSettingWithSaveFns
