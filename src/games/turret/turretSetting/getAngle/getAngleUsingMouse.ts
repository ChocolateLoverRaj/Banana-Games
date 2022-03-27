import { Data as MousePositionTracker } from '../../../../util/mousePositionTracker'
import GetPosition from './GetPosition'

const mobxGetAngleUsingMouse = (
  mousePositionTracker: MousePositionTracker,
  getPosition: GetPosition
): number | undefined => {
  if (mousePositionTracker.e === undefined) return undefined
  const { clientX, clientY } = mousePositionTracker.e
  const { x, y } = getPosition()
  return Math.atan2(clientY - y, clientX - x)
}

export default mobxGetAngleUsingMouse
