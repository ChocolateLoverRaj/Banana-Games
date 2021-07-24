import { useContext, useCallback } from 'react'
import Context from './Context'
import never from 'never'
import { openDB, IDBPDatabase, IDBPTransaction } from 'idb'

export type CreateTransaction = (stores: string[], mode: IDBTransactionMode) =>
Promise<IDBPTransaction<unknown, string[], IDBTransactionMode>>

const useTransaction = (db: string): CreateTransaction => {
  const { dbs, openDbs } = useContext(Context)
  const transaction = useCallback<CreateTransaction>(async (stores, mode) => {
    const getDb = async (): Promise<IDBPDatabase> => {
      const openedDb = openDbs.get(db)
      if (openedDb !== undefined) return await openedDb
      else {
        const dbOptions = dbs.get(db) ?? never(`No db with name: ${db}`)
        const openedDb = openDB(db, dbOptions.version, { upgrade: dbOptions.upgrade })
        openDbs.set(db, openedDb)
        return await openedDb
      }
    }
    return (await getDb()).transaction(stores, mode)
  }, [db])
  return transaction
}

export default useTransaction
