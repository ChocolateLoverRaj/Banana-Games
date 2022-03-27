import { observer } from 'mobx-react-lite'
import { Select } from 'antd'
import ControlType from './ControlType'
import Data from './Data'
import switchTo from './switchTo'

export interface ControlEditProps {
  turretSetting: Data
}

const ControlEdit = observer<ControlEditProps>(({ turretSetting }) => {
  return (
    <Select
      value={turretSetting.controlType}
      onChange={controlType => switchTo(turretSetting, controlType)}
    >
      <Select.Option value={ControlType.MOUSE}>Mouse</Select.Option>
      <Select.Option value={ControlType.JOYSTICK}>Joystick</Select.Option>
    </Select>
  )
})

export default ControlEdit
