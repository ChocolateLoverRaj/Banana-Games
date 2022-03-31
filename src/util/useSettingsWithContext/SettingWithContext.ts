import { GameSettingDataAndAllFns } from '../gameSetting'

interface SettingWithContext extends GameSettingDataAndAllFns {
  context: any
}

export default SettingWithContext
