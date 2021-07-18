import { forwardRef, useState, MouseEventHandler } from 'react'
import GameComponent from '../../types/GameComponent'
import { Tag, Tabs, Table, Form, Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { game } from './index.module.scss'
import { Map } from 'immutable'
import KeyBindingsInput from '../../util/KeyBindingInput'
import useKeysPressed from '../../util/useKeysPressed'

const actions = ['up', 'down', 'left', 'right'] as const
type Action = typeof actions[number]

const defaultKeyBindings = Map<Action, string>()
  .set('up', 'ArrowUp')
  .set('down', 'ArrowDown')
  .set('left', 'ArrowLeft')
  .set('right', 'ArrowRight')

const KeyBindingsGame: GameComponent = forwardRef((_props, ref) => {
  const [keyBindings, setKeyBindings] = useState(defaultKeyBindings)
  const keysPressed = useKeysPressed()

  // TODO - don't allow duplicate keybindings
  return (
    <div ref={ref} className={game}>
      <Tabs>
        <Tabs.TabPane tab='Game' key='game'>
          <h1>Pressed Keys</h1>
          {actions.map(keyBinding =>
            <Tag.CheckableTag
              key={keyBinding}
              checked={keysPressed.has(keyBindings.get(keyBinding) as string)}
            >
              {keyBinding}
            </Tag.CheckableTag>)}
        </Tabs.TabPane>
        <Tabs.TabPane tab={<><SettingOutlined /> Configure</>} key='config'>
          <Table
            title={() => 'Key Bindings'}
            dataSource={[...keyBindings]}
            columns={[{
              title: 'Action',
              render: ([action]) => <>{action}</>
            }, {
              title: 'Key Binding',
              render: ([action, key]) => (
                <Form
                  initialValues={{ key }}
                  onValuesChange={({ key }) => setKeyBindings(keyBindings.set(action, key))}
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
                  setKeyBindings(keyBindings.set(action, defaultKeyBindings.get(action) as string))
                return (
                  <Button disabled={key === defaultKeyBindings.get(action)} onClick={handleClick}>
                    Reset to default
                  </Button>
                )
              }
            }]}
            pagination={{ hideOnSinglePage: true }}
            rowKey={entry => entry.toString()}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
})

export default KeyBindingsGame
