import {
  booleanGameSettingFns,
  Context,
  Data,
  initializeData
} from '../../util/booleanGameSettings'
import { GameSetting } from '../../util/gameSetting'
import { CaretDownOutlined } from '@ant-design/icons'
import buttonSize from './buttonSize'

const paddle1Down: GameSetting<Data, Context> = {
  data: initializeData(
    'Paddle 1 Down',
    new Set(['ArrowDown']),
    <CaretDownOutlined />,
    [{
      x: {
        value: 10,
        reverse: true
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

export default paddle1Down
