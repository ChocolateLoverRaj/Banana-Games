import Dexie, { Table } from 'dexie'
import config from '../../../config.json'
import GameSettingsData from './GameSettingsData'

class MySubClassedDexie extends Dexie {
  settings!: Table<GameSettingsData>;

  constructor () {
    super(`${config.id}.gameSettings`)
    this.version(2).stores({
      settings: ''
    })
  }
}

const gameSettingsDexie = new MySubClassedDexie()

export default gameSettingsDexie
