import Data from './Data'
import { stop as stopEmitterValue } from '../../../../util/emitterValue'
import { stop as stopMouseTracker } from '../../../../util/mousePositionTracker'

const stop = ({ joystickPositionValue, mousePositionTracker }: Data): void => {
  stopEmitterValue(joystickPositionValue)
  stopMouseTracker(mousePositionTracker)
}

export default stop
