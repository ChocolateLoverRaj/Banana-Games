import defaultPauseSetting from '../../defaultPauseSetting'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { BooleanGameSetting } from '../../util/boolean-game-settings'

const buttonSize = 50
const buttonMargin = 10
export const paddle0Up = new BooleanGameSetting(
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
  }])

export const paddle0Down = new BooleanGameSetting(
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
  }])

export const paddle1Up = new BooleanGameSetting(
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
  }])

export const paddle1Down = new BooleanGameSetting(
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
  }])

export const pauseSetting = new BooleanGameSetting(
  defaultPauseSetting.displayName,
  defaultPauseSetting.defaultKeyBindings,
  defaultPauseSetting.buttonContent,
  [{
    x: {
      value: buttonMargin * 2 + buttonSize,
      reverse: true
    },
    y: {
      value: buttonMargin,
      reverse: false
    },
    width: buttonSize,
    height: buttonSize
  }]
)

export const settings: BooleanGameSetting[] = [
  pauseSetting,
  paddle0Up,
  paddle0Down,
  paddle1Up,
  paddle1Down
]

export const paddleSettings = [{
  up: paddle0Up,
  down: paddle0Down
}, {
  up: paddle1Up,
  down: paddle1Down
}]
