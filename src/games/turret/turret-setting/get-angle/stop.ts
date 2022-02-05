import Data from './Data'
import { stop as stopEmitterValue } from '../../../../util/emitter-value'
import { stop as stopMouseTracker } from '../../../../util/mouse-position-tracker'

const stop = ({ joystickPositionValue, mousePositionTracker }: Data): void => {
  stopEmitterValue(joystickPositionValue)
  stopMouseTracker(mousePositionTracker)
}

export default stop
