import { Listener } from 'emitter2'
import AddDelete from '../AddDelete'

interface SaveGameSettingFns<SaveData> {
  load: (saveData: SaveData, dbData: any) => Promise<void>
  save: (saveData: SaveData) => any
  watchChanges: {
    initializeWatchData: (saveData: SaveData) => any
    addDelete: AddDelete<any, Listener<unknown[]>>
  }
}

export default SaveGameSettingFns
