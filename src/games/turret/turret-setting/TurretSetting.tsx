import { GameSetting } from '../../../util/game-setting'
import AbsolutePosition from '../../../util/types/AbsolutePosition'
import Size from '../../../util/types/Size'
import { ReactNode } from 'react'
import { makeObservable, observable, action } from 'mobx'
import ControlType from './ControlType'
import ControlEdit from './ControlEditor'
import JoystickScreenRect from './JoystickScreenRect'
import RenderScreenRectOptions from '../../../util/game-setting/RenderScreenRectOptions'

const defaultControlType = ControlType.JOYSTICK
class TurretSetting extends GameSetting {
  screenRects: Array<AbsolutePosition & Size>
  controlType: ControlType
  /** In radians */
  angle = 0

  constructor (
    public readonly displayName: string,
    public readonly defaultJoystick: AbsolutePosition & Size
  ) {
    super()
    this.resetToDefault()
    makeObservable(this, {
      controlType: observable,
      screenRects: observable,
      switchTo: action,
      resetToDefault: action,
      angle: observable
    })
  }

  get isSameAsDefault (): boolean {
    return this.controlType === defaultControlType
  }

  renderEdit (): ReactNode {
    return <ControlEdit turretSetting={this} />
  }

  resetToDefault (): void {
    this.switchTo(defaultControlType)
  }

  switchTo (controlType: ControlType): void {
    this.controlType = controlType
    if (controlType === ControlType.MOUSE) {
      this.screenRects = []
    } else {
      this.screenRects = [this.defaultJoystick]
    }
  }

  renderScreenRect (options: RenderScreenRectOptions): ReactNode {
    return <JoystickScreenRect {...options} turretSetting={this} />
  }
}

export default TurretSetting
