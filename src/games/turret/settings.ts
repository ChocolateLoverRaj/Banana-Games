import { GameSettingDataAndAllFns } from '../../util/gameSetting'
import turretGameSetting from './turretGameSetting'
import pauseSettingDataAndAllFns from '../../pauseSettingDataAndAllFns'

const settings: Map<string, GameSettingDataAndAllFns> = new Map([
  ['pause', pauseSettingDataAndAllFns],
  ['turret', turretGameSetting]
])

export default settings
