import pauseSetting from './pauseSetting'
import { GameSetting } from '../../util/gameSetting'
import turretGameSetting from './turretGameSetting'

const settings: ReadonlyArray<GameSetting<any, any>> = [
  pauseSetting,
  turretGameSetting
]

export default settings
