import Input from './util/action-inputs/types/Input'
import { Set } from 'immutable'
import { PauseOutlined } from '@ant-design/icons'

const defaultPauseInput: Input = {
  keyboard: Set.of('Escape', 'KeyP'),
  touch: {
    buttonContents: <PauseOutlined />,
    buttons: Set.of({
      x: {
        value: 10,
        reverse: true
      },
      y: {
        value: 10,
        reverse: false
      },
      width: 50,
      height: 50
    })
  }
}

export default defaultPauseInput
