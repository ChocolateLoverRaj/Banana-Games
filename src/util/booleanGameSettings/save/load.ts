import openSettingDb from './openSettingDb'
import SaveData from './SaveData'
import { runInAction } from 'mobx'

const load = async (save: SaveData): Promise<void> => {
  const { db, previousVersion } = await openSettingDb(save)
  // If previous version was 0, then the settings are already up-to-date
  if (previousVersion !== 0) {
    const store = db.transaction('setting', 'readonly').objectStore('setting')
    await Promise.all([
      (async () => {
        const keyBindings = await store.get('keyBindings')
        runInAction(() => {
          save.settings.keyBindings = keyBindings
        })
      })(),
      (async () => {
        const screenRects = await store.get('screenRects')
        runInAction(() => {
          save.settings.screenRects = screenRects
        })
      })()
    ])
  }
  db.close()
}

export default load
