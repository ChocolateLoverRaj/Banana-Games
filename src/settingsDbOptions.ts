import settingsDb from './settingsDb'
import { Db } from './util/indexed-db'

const settingsDbOptions: Db<any> = {
  name: settingsDb,
  version: 3,
  upgrade: async (db, previousVersion, _currentVersion, transaction) => {
    if (previousVersion === 0) {
      const store = db.createObjectStore('settings')
      await Promise.all([
        store.add(true, 'pausedWhenNotVisible'),
        store.add(true, 'warnBeforeLeavingGame'),
        store.add(true, 'touchScreen')
      ])
    } else {
      const store = transaction.objectStore('settings')
      await Promise.all([
        ...previousVersion === 1 ? [store.add(true, 'warnBeforeLeavingGame')] : [],
        store.add(true, 'touchScreen')
      ])
    }
  }
}

export default settingsDbOptions
