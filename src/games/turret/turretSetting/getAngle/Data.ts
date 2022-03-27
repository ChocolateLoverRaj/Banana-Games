import { Data as EmitterValue } from '../../../../util/emitterValue'
import { Data as MousePositionTracker } from '../../../../util/mousePositionTracker'
import TurretSetting from '../Data'
import GetPosition from './GetPosition'

interface Data {
  setting: TurretSetting
  joystickPositionValue: EmitterValue<[number]>
  mousePositionTracker: MousePositionTracker
  getPosition: GetPosition
}

export default Data
