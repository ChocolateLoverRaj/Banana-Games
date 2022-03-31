import {
  allFns,
  initializeData
} from '../../util/booleanGameSettings'
import {
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { GameSettingDataAndAllFns } from '../../util/gameSetting'
import pauseSettingDataAndAllFns from '../../pauseSettingDataAndAllFns'

const arrowSize = 50
const arrowSpace = 10

const settings: Map<string, GameSettingDataAndAllFns> = new Map([
  ['pause', pauseSettingDataAndAllFns],
  ['up', {
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
    fns: allFns
  }],
  ['down', {
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
    fns: allFns
  }],
  ['left', {
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
    fns: allFns
  }],
  ['right', {
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
    fns: allFns
  }]
])

export default settings
