import { getAngleUsingMouse, Data } from '.'
import ControlType from '../ControlType'

const getAngle = ({
  setting,
  joystickPositionValue,
  mousePositionTracker,
  getPosition
}: Data): number | undefined =>
  setting.controlType === ControlType.JOYSTICK
    ? joystickPositionValue.value?.[0]
    : getAngleUsingMouse(mousePositionTracker, getPosition)

export default getAngle
