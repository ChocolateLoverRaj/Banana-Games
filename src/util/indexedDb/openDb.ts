import Db from './Db'
import { openDB, IDBPDatabase } from 'idb'

const openDb = async <T>(db: Db<T>): Promise<IDBPDatabase<T>> =>
  await openDB(db.name, db.version, db)

export default openDb
