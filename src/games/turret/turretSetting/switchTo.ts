import ControlType from './ControlType'
import Data from './Data'

const switchTo = (data: Data, controlType: ControlType): void => {
  data.controlType = controlType
  if (controlType === ControlType.MOUSE) {
    data.screenRects = []
  } else {
    data.screenRects = [data.defaultJoystick]
  }
}

export default switchTo
