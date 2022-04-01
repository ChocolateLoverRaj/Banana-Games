import { GameSettingDataAndAllFns } from '../../util/gameSetting'
import { allFns, initialize } from './turretSetting'

const turretGameSetting: GameSettingDataAndAllFns = {
  data: initialize(
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
    }),
  fns: allFns
}

export default turretGameSetting
