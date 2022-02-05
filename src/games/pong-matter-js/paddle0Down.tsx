import {
  booleanGameSettingFns,
  Context,
  Data,
  initializeData
} from '../../util/boolean-game-settings'
import { GameSetting } from '../../util/game-setting'
import { CaretDownOutlined } from '@ant-design/icons'
import buttonSize from './buttonSize'

const paddle0Down: GameSetting<Data, Context> = {
  data: initializeData(
    'Paddle 0 Down',
    new Set(['KeyS']),
    <CaretDownOutlined />,
    [{
      x: {
        value: 10,
        reverse: false
      },
      y: {
        value: 10,
        reverse: true
      },
      width: buttonSize,
      height: buttonSize
    }]),
  context: new Set(),
  fns: booleanGameSettingFns
}

export default paddle0Down
