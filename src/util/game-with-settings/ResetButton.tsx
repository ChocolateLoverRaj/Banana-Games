import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import { action as mobxAction } from 'mobx'
import { GameSetting } from '../game-setting'

export interface ResetButtonProps {
  setting: GameSetting
}
const ResetButton = observer<ResetButtonProps>(({ setting }) => {
  return (
    <Button
      disabled={setting.isSameAsDefault}
      onClick={mobxAction(() => setting.resetToDefault())}
    >
      Reset to default
    </Button>
  )
})

export default ResetButton
