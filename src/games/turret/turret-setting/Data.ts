import AbsolutePosition from '../../../util/types/AbsolutePosition'
import Size from '../../../util/types/Size'
import ControlType from './ControlType'

interface Data {
  name: string
  controlType: ControlType
  defaultJoystick: AbsolutePosition & Size
  screenRects: Array<AbsolutePosition & Size>
}

export default Data
