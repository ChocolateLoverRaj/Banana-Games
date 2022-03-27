import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import { action as mobxAction } from 'mobx'
import { GameSetting } from '../gameSetting'

export interface ResetButtonProps {
  setting: GameSetting<any, any>
}
const ResetButton = observer<ResetButtonProps>(({ setting: { fns, data, context } }) => {
  return (
    <Button
      disabled={fns.reset?.isSameAsDefault({ data, context })}
      onClick={mobxAction(() => fns.reset?.resetToDefault({ data, context }))}
    >
      Reset to default
    </Button>
  )
})

export default ResetButton
