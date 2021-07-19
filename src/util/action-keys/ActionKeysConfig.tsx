import { FC, MouseEventHandler } from 'react'
import ActionKeys from './ActionKeys'
import { Table, Form, Button } from 'antd'
import KeyBindingsInput from '../KeyBindingInput'
import useCurrentKeys from './useCurrentKeys'

export interface ActionKeysConfigProps<Action extends string = string> {
  actionKeys: ActionKeys<Action>
}

const ActionKeysConfig: FC<ActionKeysConfigProps> = <Action extends string = string>(
  props: ActionKeysConfigProps<Action>
) => {
  const { actionKeys } = props

  const [currentKeys, setCurrentKeys] = useCurrentKeys(actionKeys)

  return (
    <Table
      title={() => 'Key Bindings'}
      dataSource={[...currentKeys]}
      columns={[{
        title: 'Action',
        render: ([action]) => <>{action}</>
      }, {
        title: 'Key Binding',
        render: ([action, key]) => (
          <Form
            initialValues={{ key }}
            onValuesChange={({ key }) => setCurrentKeys(currentKeys.set(action, key))}
          >
            <Form.Item name='key'>
              <KeyBindingsInput />
            </Form.Item>
          </Form>
        )
      }, {
        title: 'Reset',
        render: ([action, key]) => {
          const handleClick: MouseEventHandler = () =>
            setCurrentKeys(currentKeys.set(action, actionKeys.defaultKeys.get(action) as string))
          return (
            <Button disabled={key === actionKeys.defaultKeys.get(action)} onClick={handleClick}>
              Reset to default
            </Button>
          )
        }
      }]}
      pagination={{ hideOnSinglePage: true }}
      rowKey={entry => entry.toString()}
    />
  )
}

export default ActionKeysConfig
