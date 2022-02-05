import pauseSetting from './pauseSetting'
import { GameSetting } from '../../util/game-setting'
import turretSetting from './turretSetting'

const settings: ReadonlyArray<GameSetting<any, any>> = [
  pauseSetting,
  turretSetting
]

export default settings
