import { SaveGameSettingFns } from '../../util/gameSetting'

interface SavableGameSetting<SaveData, AutoSaveData> {
  saveData: SaveData
  autoSaveData: AutoSaveData
  saveFns: SaveGameSettingFns<SaveData, AutoSaveData>
}

export default SavableGameSetting
