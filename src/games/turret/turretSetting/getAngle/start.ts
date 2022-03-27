import Data from './Data'
import { start as startEmitterValue } from '../../../../util/emitterValue'
import { start as startMouseTracker } from '../../../../util/mousePositionTracker'

const start = ({ joystickPositionValue, mousePositionTracker }: Data): void => {
  startEmitterValue(joystickPositionValue)
  startMouseTracker(mousePositionTracker)
}

export default start
