import defaultPauseSetting from '../../defaultPauseSetting'
import { BooleanGameSetting } from '../../util/boolean-game-settings'
import {
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'

const arrowSize = 50
const arrowSpace = 10
const settings: BooleanGameSetting[] = [
  defaultPauseSetting,
  new BooleanGameSetting(
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
    }]
  ),
  new BooleanGameSetting(
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
    }]
  ),
  new BooleanGameSetting(
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
    }]
  ),
  new BooleanGameSetting(
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
  )
]

export default settings
