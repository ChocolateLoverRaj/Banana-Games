import {
  booleanGameSettingFns,
  Context,
  Data,
  initializeData
} from '../../util/booleanGameSettings'
import { GameSetting } from '../../util/gameSetting'
import { CaretUpOutlined } from '@ant-design/icons'
import buttonSize from './buttonSize'

const paddle1Up: GameSetting<Data, Context> = {
  data: initializeData(
    'Paddle 1 Up',
    new Set(['ArrowUp']),
    <CaretUpOutlined />,
    [{
      x: {
        value: 10,
        reverse: true
      },
      y: {
        value: 10,
        reverse: false
      },
      width: buttonSize,
      height: buttonSize
    }]),
  context: new Set(),
  fns: booleanGameSettingFns
}

export default paddle1Up
