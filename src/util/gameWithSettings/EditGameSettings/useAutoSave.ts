import { useEffect, useContext } from 'react'
import GameSettingDataAndAllFns from '../../gameSetting/GameSettingDataAndAllFns'
import EditGameSettingsContext from './EditGameSettingsContext'
import { reference, unReference } from '../../ReferenceManager/Map'

const useAutoSave = (gameSettingDataAndAllFns: GameSettingDataAndAllFns): void => {
  const autoSaveReferenceManagerMap = useContext(EditGameSettingsContext)

  useEffect(() => {
    reference(autoSaveReferenceManagerMap, gameSettingDataAndAllFns)
    return () => {
      unReference(autoSaveReferenceManagerMap, gameSettingDataAndAllFns)
    }
  }, [])
}

export default useAutoSave
