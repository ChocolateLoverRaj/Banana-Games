import { Data as EmitterValue } from '../../../../util/emitter-value'
import { Data as MousePositionTracker } from '../../../../util/mouse-position-tracker'
import TurretSetting from '../Data'
import GetPosition from './GetPosition'

interface Data {
  setting: TurretSetting
  joystickPositionValue: EmitterValue<[number]>
  mousePositionTracker: MousePositionTracker
  getPosition: GetPosition
}

export default Data
