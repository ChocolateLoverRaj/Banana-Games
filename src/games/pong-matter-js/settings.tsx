import { Context, Data } from '../../util/boolean-game-settings'
import { GameSetting } from '../../util/game-setting'
import paddle0Down from './paddle0Down'
import paddle0Up from './paddle0Up'
import paddle1Down from './paddle1Down'
import paddle1Up from './paddle1Up'
import pauseSetting from './pauseSetting'

const settings: ReadonlyArray<GameSetting<Data, Context>> = [
  pauseSetting,
  paddle0Up,
  paddle0Down,
  paddle1Up,
  paddle1Down
]

export default settings
