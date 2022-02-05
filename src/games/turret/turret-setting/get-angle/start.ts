import Data from './Data'
import { start as startEmitterValue } from '../../../../util/emitter-value'
import { start as startMouseTracker } from '../../../../util/mouse-position-tracker'

const start = ({ joystickPositionValue, mousePositionTracker }: Data): void => {
  startEmitterValue(joystickPositionValue)
  startMouseTracker(mousePositionTracker)
}

export default start
