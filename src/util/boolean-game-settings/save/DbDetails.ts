import { IDBPDatabase } from 'idb'

interface DbDetails {
  db: IDBPDatabase
  /**
   * Previous version of the database, if upgraded. If not upgraded this will be `undefined`
   */
  previousVersion?: number
}

export default DbDetails
