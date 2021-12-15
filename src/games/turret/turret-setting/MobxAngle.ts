import MobxAngleUsingMouse, { GetPosition } from './MobxAngleUsingMouse'
import TurretSetting from './TurretSetting'
import { makeObservable, computed } from 'mobx'
import ControlType from './ControlType'

class MobxAngle {
  readonly angleUsingMouse: MobxAngleUsingMouse

  constructor (readonly turretSetting: TurretSetting, getPosition: GetPosition) {
    this.angleUsingMouse = new MobxAngleUsingMouse(getPosition)
    makeObservable(this, {
      angle: computed
    })
  }

  get angle (): number {
    return this.turretSetting.controlType === ControlType.JOYSTICK
      ? this.turretSetting.angle
      : this.angleUsingMouse.angle
  }
}

export default MobxAngle
