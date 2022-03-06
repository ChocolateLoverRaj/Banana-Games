import { reaction, toJS } from 'mobx'
import AutoSaveData from './AutoSaveData'
import { openSettingDb } from '../save'

const start = (autoSave: AutoSaveData): void => {
  const { saveData: { settings }, saveData } = autoSave
  const dbPromise = (async () => (await openSettingDb(saveData)).db)()
  const stopReactions = ['keyBindings', 'screenRects'].map(key =>
    reaction(() => {
      return toJS(settings[key])
    }, data => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dbPromise.then(async db => {
        const transaction = db.transaction('setting', 'readwrite')
        const store = transaction.objectStore('setting')
        await store.put(data, key)
      })
    }))
  autoSave.stop = { dbPromise, stopReactions }
}

export default start
