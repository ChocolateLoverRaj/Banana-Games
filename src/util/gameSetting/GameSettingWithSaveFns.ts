import GameSettingFns from './GameSettingFns'
import SaveGameSettingFns from './SaveGameSettingFns'

interface GameSettingWithSaveFns<Data, Context, SaveData, AutoSaveData> {
  settingFns: GameSettingFns<Data, Context>
  saveFns: SaveGameSettingFns<SaveData, AutoSaveData>
}

export default GameSettingWithSaveFns
