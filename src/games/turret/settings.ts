import defaultPauseSetting from '../../defaultPauseSetting'
import { GameSetting } from '../../util/game-setting'
import TurretSetting from './turret-setting/TurretSetting'

export const turretSetting = new TurretSetting(
  'Turret Rotation',
  {
    height: 100,
    width: 100,
    x: {
      reverse: true,
      value: 50
    },
    y: {
      reverse: true,
      value: 50
    }
  }
)

export const settings: GameSetting[] = [
  defaultPauseSetting,
  turretSetting
]
