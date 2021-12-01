import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import ActionInputs from './ActionInputs'
import never from 'never'
import { action as mobxAction } from 'mobx'

export interface ResetButtonProps<T extends string> {
  actionInputs: ActionInputs<T>
  action: T
}
const ResetButton = observer<ResetButtonProps<string>>(({ actionInputs, action }) => {
  const { keyboard, touch } = actionInputs.currentInputs.get(action) ?? never()
  const { currentInputs } = actionInputs

  return (
    <Button
      disabled={[...keyboard].toString() === [...(actionInputs.defaultInputs.get(action) ?? never()).keyboard].toString()}
      onClick={mobxAction(() =>
        currentInputs.set(action, {
          touch,
          keyboard: actionInputs.defaultInputs.get(action)?.keyboard as Set<string>
        }))}
    >
      Reset to default
    </Button>
  )
})

export default ResetButton
