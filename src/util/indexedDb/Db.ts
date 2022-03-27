import { OpenDBCallbacks } from 'idb'

interface Db<T> extends OpenDBCallbacks<T> {
  name: string
  version: number
}

export default Db
