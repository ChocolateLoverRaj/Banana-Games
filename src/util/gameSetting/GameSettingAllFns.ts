import { GameSettingFns, SaveGameSettingFns } from '.'

interface GameSettingAllFns {
  coreFns: GameSettingFns<any, any>
  saveFns: SaveGameSettingFns<any, any>
  initializeContext: () => any
  initializeSaveData: (data: { settingData: any, id: string }) => any
  initializeAutoSaveData: (saveData: any) => any
}

export default GameSettingAllFns
