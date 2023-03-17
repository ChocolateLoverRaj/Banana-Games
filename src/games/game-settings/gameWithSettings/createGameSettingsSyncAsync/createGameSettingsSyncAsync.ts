import GameSettingsData from '../GameSettingsData'
import gameSettingsDexie from '../gameSettingsDexie'
import createDexieSyncAsync from 'observables/lib/createDexieSyncAsync/createDexieSyncAsync'
import SyncAsync from 'observables/lib/syncAsync/SyncAsync'
import Input from './Input'
import never from 'never'

const createGameSettingsSyncAsync = ({
  id,
  defaultPlayerInputsPresets,
  defaultSettingsPresets,
  version,
  upgrade
}: Input): SyncAsync<GameSettingsData> => createDexieSyncAsync({
  load: async () => {
    const dataWithVersion = await gameSettingsDexie.settings.get(id)
    if (dataWithVersion === undefined) {
      const defaultData = {
        settingsPresets: defaultSettingsPresets,
        playerInputsPresets: defaultPlayerInputsPresets
      }
      await gameSettingsDexie.settings.put({
        version,
        data: defaultData
      }, id)
      return defaultData
    } else if (dataWithVersion.version < version) {
      await gameSettingsDexie.settings.put({
        version,
        data: await (upgrade ?? never('Stored version is newer, but no upgrade fn inputted'))({
          oldVersion: dataWithVersion.version,
          oldData: dataWithVersion.data
        })
      }, id)
    }
    return dataWithVersion.data
  },
  save: async newData => {
    await gameSettingsDexie.settings.put({
      version,
      data: newData
    }, id)
  }
})

export default createGameSettingsSyncAsync
