import {
  booleanGameSettingFns,
  Context,
  Data,
  initializeData
} from '../../util/booleanGameSettings'
import { GameSetting } from '../../util/gameSetting'
import { CaretUpOutlined } from '@ant-design/icons'
import buttonSize from './buttonSize'

const paddle0Up: GameSetting<Data, Context> = {
  data: initializeData(
    'Paddle 0 Up',
    new Set(['KeyW']),
    <CaretUpOutlined />,
    [{
      x: {
        value: 10,
        reverse: false
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

export default paddle0Up
