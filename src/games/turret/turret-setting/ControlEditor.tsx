import { observer } from 'mobx-react-lite'
import TurretSetting from './TurretSetting'
import { Select } from 'antd'
import ControlType from './ControlType'

export interface ControlEditProps {
  turretSetting: TurretSetting
}

const ControlEdit = observer<ControlEditProps>(({ turretSetting }) => {
  return (
    <Select
      value={turretSetting.controlType}
      onChange={controlType => turretSetting.switchTo(controlType)}
    >
      <Select.Option value={ControlType.MOUSE}>Mouse</Select.Option>
      <Select.Option value={ControlType.JOYSTICK}>Joystick</Select.Option>
    </Select>
  )
})

export default ControlEdit
