import openSettingDb from './openSettingDb'
import SaveData from './SaveData'
import { runInAction } from 'mobx'
import settingStore from './settingStore'
import settingKey from './settingKey'

const load = async (save: SaveData): Promise<void> => {
  const { db, previousVersion } = await openSettingDb(save)
  // If previous version was 0, then the settings are already up-to-date
  if (previousVersion !== 0) {
    const store = db.transaction(settingStore, 'readonly').objectStore('setting')
    const settings = await store.get(settingKey)
    runInAction(() => {
      Object.assign(save.settings, settings)
    })
  }
  db.close()
}

export default load
