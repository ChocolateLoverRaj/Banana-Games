import { Listener } from 'emitter2'

interface AutoSaveReactionCleanupData {
  watchData: any
  listener: Listener<[]>
}

export default AutoSaveReactionCleanupData
