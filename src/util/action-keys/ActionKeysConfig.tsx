import { FC, MouseEventHandler } from 'react'
import ActionKeys from './ActionKeys'
import { Table, Form, Button, Space } from 'antd'
import KeyBindingsInput from '../KeyBindingInput'
import useCurrentKeys from './useCurrentKeys'
import { Set } from 'immutable'
import { DeleteOutlined } from '@ant-design/icons'
import { flex } from './ActionKeysConfig.module.scss'

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
        title: 'Key Bindings',
        render: ([action, keys]) => (
          <Form
            // TODO: use controlled form
            initialValues={{ keys: [...keys] }}
            onValuesChange={(_, { keys }) => setCurrentKeys(currentKeys.set(action, Set(keys)))}
          >
            <Form.List name='keys'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space className={flex} key={field.key} align='baseline'>
                      <Form.Item key={field.key}>
                        <Form.Item {...field} noStyle>
                          <KeyBindingsInput />
                        </Form.Item>
                      </Form.Item>
                      <Button danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button onClick={() => add('')}>Add Another Key</Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        )
      }, {
        title: 'Reset',
        render: ([action, key]) => {
          const handleClick: MouseEventHandler = () =>
            setCurrentKeys(currentKeys.set(action, actionKeys.defaultKeys.get(action) as Set<string>))
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
