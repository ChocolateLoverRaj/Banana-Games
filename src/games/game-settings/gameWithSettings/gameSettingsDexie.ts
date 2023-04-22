import Dexie, { Table } from 'dexie'
import config from '../../../config.json'
import GameSettingsDataWithVersion from './GameSettingsDataWithVersion'

class MySubClassedDexie extends Dexie {
  settings!: Table<GameSettingsDataWithVersion>;

  constructor () {
    super(`${config.id}.gameSettings`)
    this.version(2).stores({
      settings: ''
    })
  }
}

const gameSettingsDexie = new MySubClassedDexie()

export default gameSettingsDexie
