import { ActionInputs } from '../../util/action-inputs'
import Input from '../../util/action-inputs/types/Input'
import { Map, Set } from 'immutable'
import defaultPauseInput from '../../defaultPauseInput'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

type Action = 'Paddle 0 Up' | 'Paddle 0 Down' | 'Paddle 1 Up' | 'Paddle 1 Down' | 'back'
const buttonSize = 50
const buttonMargin = 10
const actionInputs = new ActionInputs(Map<Action, Input>([
  ['back', {
    ...defaultPauseInput,
    touch: {
      ...defaultPauseInput.touch,
      buttons: Set.of({
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
      })
    }
  }],
  ['Paddle 0 Up', {
    keyboard: Set.of('KeyW'),
    touch: {
      buttonContents: <CaretUpOutlined />,
      buttons: Set.of({
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
      })
    }
  }],
  ['Paddle 0 Down', {
    keyboard: Set.of('KeyS'),
    touch: {
      buttonContents: <CaretDownOutlined />,
      buttons: Set.of({
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
      })
    }
  }],
  ['Paddle 1 Up', {
    keyboard: Set.of('ArrowUp'),
    touch: {
      buttonContents: <CaretUpOutlined />,
      buttons: Set.of({
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
      })
    }
  }],
  ['Paddle 1 Down', {
    keyboard: Set.of('ArrowDown'),
    touch: {
      buttonContents: <CaretDownOutlined />,
      buttons: Set.of({
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
      })
    }
  }]
]))

export default actionInputs
