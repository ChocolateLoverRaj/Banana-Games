import GameSettingsData from '../GameSettingsData'
import gameSettingsDexie from '../gameSettingsDexie'
import createDexieSyncAsync from 'observables/lib/createDexieSyncAsync/createDexieSyncAsync'
import SyncAsync from 'observables/lib/syncAsync/SyncAsync'
import Input from './Input'

const createGameSettingsSyncAsync = ({
  id,
  defaultPlayerInputsPresets,
  defaultSettingsPresets
}: Input): SyncAsync<GameSettingsData> => createDexieSyncAsync({
  load: async () => {
    const data = await gameSettingsDexie.settings.get(id)
    if (data === undefined) {
      const defaultData = {
        settingsPresets: defaultSettingsPresets,
        playerInputsPresets: defaultPlayerInputsPresets
      }
      await gameSettingsDexie.settings.put(defaultData, id)
      return defaultData
    }
    return data
  },
  save: async newData => {
    await gameSettingsDexie.settings.put(newData, id)
  }
})

export default createGameSettingsSyncAsync
