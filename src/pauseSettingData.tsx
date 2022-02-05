import { PauseOutlined } from '@ant-design/icons'
import { initializeData } from './util/boolean-game-settings'

const pauseSettingData = initializeData(
  'Pause',
  new Set(['Escape', 'KeyP']),
  <PauseOutlined />,
  [{
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
  }]
)

export default pauseSettingData
