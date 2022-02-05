import { GameSettingFns } from '../../../util/game-setting'
import Context from './Context'
import ControlEdit from './ControlEditor'
import Data from './Data'
import defaultControlType from './defaultControlType'
import JoystickScreenRect from './JoystickScreenRect'
import switchTo from './switchTo'

const fns: GameSettingFns<Data, Context> = {
  reset: {
    isSameAsDefault: ({ data: { controlType } }) => controlType === defaultControlType,
    resetToDefault: ({ data }) => {
      switchTo(data, defaultControlType)
    }
  },
  renderEdit: ({ data }) => <ControlEdit turretSetting={data} />,
  getName: ({ data: { name } }) => name,
  screenRects: {
    getSet: {
      get: ({ data: { screenRects } }) => screenRects,
      set: ({ data }, screenRects) => {
        data.screenRects = screenRects
      }
    },
    render: (param, options) => <JoystickScreenRect {...options} {...param} />
  }
}

export default fns
