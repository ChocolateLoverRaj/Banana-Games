import { GameSetting } from '../../util/gameSetting'
import { Context, Data, fns, initialize } from './turretSetting'

const turretGameSetting: GameSetting<Data, Context> = {
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
  context: new Set(),
  fns
}

export default turretGameSetting
