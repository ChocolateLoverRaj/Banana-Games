import { SavableGameSetting } from './loadSettings'
import { useState } from 'react'
import { GameSettingDataAndAllFns } from './gameSetting'

const useSavableGameSettings = (
  settings: Map<string, GameSettingDataAndAllFns>,
  indexedDbPrefix: string
): ReadonlyArray<SavableGameSetting<any, any>> => {
  const [savableGameSettings] = useState((): ReadonlyArray<SavableGameSetting<any, any>> =>
    [...settings].map(([id, { data, fns }]) => {
      const saveData = fns.initializeSaveData({ settingData: data, id: `${indexedDbPrefix}-${id}` })
      return {
        saveFns: fns.saveFns,
        saveData: saveData,
        autoSaveData: fns.initializeAutoSaveData(saveData)
      }
    }))
  return savableGameSettings
}

export default useSavableGameSettings
