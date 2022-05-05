import SaveData from './SaveData'
import { action } from 'mobx'

const load = action(async (save: SaveData, dbData: any): Promise<void> => {
  Object.assign(save.settings, dbData)
})

export default load
