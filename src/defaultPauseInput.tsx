import Input from './util/action-inputs/types/Input'
import { PauseOutlined } from '@ant-design/icons'

const defaultPauseInput: Input = {
  keyboard: new Set(['Escape', 'KeyP']),
  touch: {
    buttonContents: <PauseOutlined />,
    buttons: new Set([{
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
    }])
  }
}

export default defaultPauseInput
