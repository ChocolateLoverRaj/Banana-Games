import { createContext } from 'react'
import { OpenDBCallbacks, IDBPDatabase } from 'idb'

export interface Db {
  version: number
  upgrade?: OpenDBCallbacks<unknown>['upgrade']
}

export type Dbs = Map<string, Db>

export interface ContextData {
  dbs: Dbs
  openDbs: Map<string, Promise<IDBPDatabase>>
}

const Context = createContext<ContextData>(undefined as any)

export default Context
