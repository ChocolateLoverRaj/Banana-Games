import { CommonParam } from '../../../../util/game-setting'
import { initialize as initializeEmitterValue } from '../../../../util/emitter-value'
import { initialize as initializeMousePosition } from '../../../../util/mouse-position-tracker'
import TurretContext from '../Context'
import TurretData from '../Data'
import GetPosition from './GetPosition'
import AngleData from './Data'

const getDataFromSetting = (
  commonParam: CommonParam<TurretData, TurretContext>,
  getPosition: GetPosition
): AngleData => ({
  setting: commonParam.data,
  getPosition,
  joystickPositionValue: initializeEmitterValue(commonParam.context),
  mousePositionTracker: initializeMousePosition()
})

export default getDataFromSetting
