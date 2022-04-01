import { reaction } from 'mobx'
import AutoSaveData from './AutoSaveData'
import { openSettingDb, settingStore, getDataToSaveToDb, settingKey } from '..'

const start = (autoSave: AutoSaveData): void => {
  const { saveData: { settings }, saveData } = autoSave
  const dbPromise = (async () => (await openSettingDb(saveData)).db)()
  autoSave.stop = {
    dbPromise,
    stopReaction: reaction(() => getDataToSaveToDb(settings), data => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dbPromise.then(async db => {
        const transaction = db.transaction(settingStore, 'readwrite')
        const store = transaction.objectStore(settingStore)
        await store.put(data, settingKey)
      })
    })
  }
}

export default start
