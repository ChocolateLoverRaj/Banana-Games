import { IReactionDisposer } from 'mobx'
import { SaveData } from '..'
import { IDBPDatabase } from 'idb'

interface AutoSaveData {
  saveData: SaveData
  stop?: {
    dbPromise: Promise<IDBPDatabase>
    stopReaction: IReactionDisposer
  }
}

export default AutoSaveData
