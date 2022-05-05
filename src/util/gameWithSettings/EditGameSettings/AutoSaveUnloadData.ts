import { Listener } from 'emitter2'

interface AutoSaveUnloadData {
  watchData: any
  listener: Listener<[]>
}

export default AutoSaveUnloadData
