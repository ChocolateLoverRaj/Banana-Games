import { IReactionDisposer } from 'mobx'
import { SaveData } from '..'
import { IDBPDatabase } from 'idb'

interface AutoSaveData {
  saveData: SaveData
  stop?: {
    dbPromise: Promise<IDBPDatabase>
    stopReactions: readonly IReactionDisposer[]
  }
}

export default AutoSaveData
