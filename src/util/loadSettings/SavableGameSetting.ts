import { SaveGameSettingFns } from '../../util/gameSetting'

interface SavableGameSetting<SaveData, AutoSaveData> {
  saveData: SaveData
  autoSaveData: AutoSaveData
  saveFns: SaveGameSettingFns<SaveData>
}

export default SavableGameSetting
