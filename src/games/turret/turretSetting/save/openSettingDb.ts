import { openDb } from '../../../../util/indexedDb'
import config from '../../../../config.json'
import SaveData from './SaveData'
import DbDetails from './DbDetails'
import settingStore from './settingStore'
import settingKey from './settingKey'
import getDataToSaveToDb from './getDataToSaveToDb'

const openSettingDb = async ({ settings, id }: SaveData): Promise<DbDetails> => {
  let previousVersion: number | undefined
  const db = await openDb({
    name: `${config.id}-gameSetting-${id}`,
    version: 1,
    upgrade: async (_db, oldVersion, _newVersion, transaction) => {
      previousVersion = oldVersion
      const store = transaction.db.createObjectStore(settingStore)
      await store.add(getDataToSaveToDb(settings), settingKey)
    }
  })
  return {
    db,
    previousVersion
  }
}

export default openSettingDb
