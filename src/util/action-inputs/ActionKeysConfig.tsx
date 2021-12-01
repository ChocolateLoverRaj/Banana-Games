import { FC, MouseEventHandler } from 'react'
import ActionInputs from './ActionInputs'
import { Table, Button } from 'antd'
import Input from './types/Input'
import { observer } from 'mobx-react-lite'
import never from 'never'
import KeyBindings from './KeyBindings'

export interface ActionKeysConfigProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
}

const ActionKeysConfig: FC<ActionKeysConfigProps> = observer(<Action extends string = string>(
  props: ActionKeysConfigProps<Action>
) => {
  const { actionInputs } = props
  const { currentInputs } = actionInputs

  return (
    <Table
      title={() => 'Key Bindings'}
      dataSource={[...currentInputs]}
      columns={[{
        title: 'Action',
        render: ([action]) => <>{action}</>
      }, {
        title: 'Key Bindings',
        render: ([, input]: [Action, Input]) => <KeyBindings keyboard={input.keyboard} />
      }, {
        title: 'Reset',
        render: ([action, { keyboard, touch }]: [Action, Input]) => {
          const handleClick: MouseEventHandler = () =>
            currentInputs.set(action, {
              touch,
              keyboard: actionInputs.defaultInputs.get(action)?.keyboard as Set<string>
            })
          return (
            <Button
              disabled={[...keyboard].toString() === [...(actionInputs.defaultInputs.get(action) ?? never()).keyboard].toString()}
              onClick={handleClick}
            >
              Reset to default
            </Button>
          )
        }
      }]}
      pagination={{ hideOnSinglePage: true }}
      rowKey={entry => entry.toString()}
    />
  )
})

export default ActionKeysConfig
