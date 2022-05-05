import { GameSettingFns, SaveGameSettingFns } from '.'

interface GameSettingAllFns {
  coreFns: GameSettingFns<any, any>
  saveFns: SaveGameSettingFns<any>
  initializeContext: () => any
  initializeSaveData: (data: { settingData: any, id: string }) => any
  initializeAutoSaveData: (saveData: any) => any
  dbStoreName: string
}

export default GameSettingAllFns
