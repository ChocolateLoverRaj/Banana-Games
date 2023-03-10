import Dexie, { Table } from 'dexie'
import settingsDb from './settingsDb'

class MySubClassedDexie extends Dexie {
  pausedWhenNotVisible!: Table<boolean>;
  warnBeforeLeavingGame!: Table<boolean>
  touchScreen!: Table<boolean>;

  constructor () {
    super(settingsDb)
    this.version(1).stores({
      pausedWhenNotVisible: '',
      warnBeforeLeavingGame: '',
      touchScreen: ''
    })

    this.on('populate', async () => {
      await Promise.all([
        this.table('pausedWhenNotVisible').add(true, ''),
        this.table('warnBeforeLeavingGame').add(true, ''),
        this.table('touchScreen').add(true, '')
      ])
    })
  }
}

const settingsDexie = new MySubClassedDexie()

export default settingsDexie
