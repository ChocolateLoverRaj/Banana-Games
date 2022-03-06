import { toJS } from 'mobx'
import { openDb } from '../../indexed-db'
import config from '../../../config.json'
import SaveData from './SaveData'
import DbDetails from './DbDetails'

const openSettingDb = async ({ settings, id }: SaveData): Promise<DbDetails> => {
  let previousVersion: number | undefined
  const db = await openDb({
    name: `${config.id}-gameSetting-${id}`,
    version: 1,
    upgrade: async (_db, oldVersion, _newVersion, transaction) => {
      previousVersion = oldVersion
      const store = transaction.db.createObjectStore('setting')
      await Promise.all([
        store.add(toJS(settings.keyBindings), 'keyBindings'),
        store.add(toJS(settings.screenRects), 'screenRects')
      ])
    }
  })
  return {
    db,
    previousVersion
  }
}

export default openSettingDb
