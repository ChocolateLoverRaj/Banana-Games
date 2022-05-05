import { Db } from '../../indexedDb'
import config from '../../../config.json'
import { allFns } from '../../booleanGameSettings'

const settingFns = [allFns]

const gameSettingsDb: Db<unknown> = {
  name: `${config.id}-gameSettings`,
  version: 1,
  upgrade: (db, _oldVersion, _newVersion, _transaction) => {
    settingFns.forEach(({ dbStoreName }) => {
      db.createObjectStore(dbStoreName)
    })
  }
}

export default gameSettingsDb
