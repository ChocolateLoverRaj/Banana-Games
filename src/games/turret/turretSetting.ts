import { GameSetting } from '../../util/game-setting'
import { Context, Data, fns, initialize } from './turret-setting'

const turretSetting: GameSetting<Data, Context> = {
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

export default turretSetting
