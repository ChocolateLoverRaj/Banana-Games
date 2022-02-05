import { booleanGameSettingFns, Context, Data, initializeData } from '../../util/boolean-game-settings'
import {
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { GameSetting } from '../../util/game-setting'
import pauseSetting from './pauseSetting'

const arrowSize = 50
const arrowSpace = 10

const settings: ReadonlyArray<GameSetting<Data, Context>> = [
  pauseSetting, {
    data: initializeData(
      'Up',
      new Set(['ArrowUp', 'KeyW']),
      <UpOutlined />,
      [{
        x: {
          value: arrowSpace * 2 + arrowSize,
          reverse: false
        },
        y: {
          value: arrowSpace * 3 + arrowSize * 2,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      }]),
    context: new Set(),
    fns: booleanGameSettingFns
  }, {
    data: initializeData(
      'Down',
      new Set(['ArrowDown', 'KeyS']),
      <DownOutlined />,
      [{
        x: {
          value: arrowSpace * 2 + arrowSize,
          reverse: false
        },
        y: {
          value: arrowSpace,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      }]),
    context: new Set(),
    fns: booleanGameSettingFns
  }, {
    data: initializeData(
      'Left',
      new Set(['ArrowLeft', 'KeyA']),
      <LeftOutlined />,
      [{
        x: {
          value: arrowSpace,
          reverse: false
        },
        y: {
          value: arrowSpace * 2 + arrowSize,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      }]),
    context: new Set(),
    fns: booleanGameSettingFns
  }, {
    data: initializeData(
      'Right',
      new Set(['ArrowRight', 'KeyD']),
      <RightOutlined />,
      [{
        x: {
          value: arrowSpace * 3 + arrowSize * 2,
          reverse: false
        },
        y: {
          value: arrowSpace * 2 + arrowSize,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      }]
    ),
    context: new Set(),
    fns: booleanGameSettingFns
  }]

export default settings
