import { IDBPObjectStore } from 'idb'
import { zip } from 'zip-array'

const storeToObject = async (
  store: IDBPObjectStore<unknown, string[], any, IDBTransactionMode>
): Promise<object> => {
  const [keys, values] = await Promise.all([store.getAllKeys(), store.getAll()])
  return Object.fromEntries(zip(keys, values))
}

export default storeToObject
