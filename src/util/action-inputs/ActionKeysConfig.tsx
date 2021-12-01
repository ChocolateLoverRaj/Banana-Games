import { FC } from 'react'
import ActionInputs from './ActionInputs'
import { Table } from 'antd'
import Input from './types/Input'
import { observer } from 'mobx-react-lite'
import KeyBindings from './KeyBindings'
import ResetButton from './ResetButton'

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
        render: ([action]: [Action, Input]) =>
          <ResetButton {...{ action, actionInputs }} />
      }]}
      pagination={{ hideOnSinglePage: true }}
      rowKey={entry => entry.toString()}
    />
  )
})

export default ActionKeysConfig
