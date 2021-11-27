import { FC, MouseEventHandler } from 'react'
import ActionInputs from './ActionInputs'
import { Table, Form, Button, Space } from 'antd'
import KeyBindingsInput from '../KeyBindingInput'
import { DeleteOutlined } from '@ant-design/icons'
import Input from './types/Input'
import { css } from '@emotion/css'

export interface ActionKeysConfigProps<Action extends string = string> {
  actionInputs: ActionInputs<Action>
}

const ActionKeysConfig: FC<ActionKeysConfigProps> = <Action extends string = string>(
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
        render: ([action, { keyboard: keys, touch }]: [Action, Input]) => (
          <Form
            // TODO: use controlled form
            initialValues={{ keys: [...keys] }}
            onValuesChange={(_, { keys }) => currentInputs.set(action, {
              touch,
              keyboard: new Set(keys)
            })}
          >
            <Form.List name='keys'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space className={css({ display: 'flex' })} key={field.key} align='baseline'>
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
        render: ([action, { keyboard, touch }]: [Action, Input]) => {
          const handleClick: MouseEventHandler = () =>
            currentInputs.set(action, {
              touch,
              keyboard: actionInputs.defaultInputs.get(action)?.keyboard as Set<string>
            })
          return (
            <Button
              disabled={keyboard === actionInputs.defaultInputs.get(action)?.keyboard}
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
}

export default ActionKeysConfig
