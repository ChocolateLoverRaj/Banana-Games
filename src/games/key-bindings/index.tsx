import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { Tag, Tabs } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { game } from './index.module.scss'
import { Map } from 'immutable'
import { ActionKeys, useActionsPressed, ActionKeysConfig } from '../../util/action-keys'

const actions = ['up', 'down', 'left', 'right'] as const
type Action = typeof actions[number]

const actionKeys = new ActionKeys<Action>(Map<Action, string>()
  .set('up', 'ArrowUp')
  .set('down', 'ArrowDown')
  .set('left', 'ArrowLeft')
  .set('right', 'ArrowRight')
)

const KeyBindingsGame: GameComponent = forwardRef((_props, ref) => {
  const actionsPressed = new Set(useActionsPressed(actionKeys))

  // TODO - don't allow duplicate keybindings
  return (
    <div ref={ref} className={game}>
      <Tabs>
        <Tabs.TabPane tab='Game' key='game'>
          <h1>Pressed Keys</h1>
          {actions.map(action =>
            <Tag.CheckableTag key={action} checked={actionsPressed.has(action)}>
              {action}
            </Tag.CheckableTag>)}
        </Tabs.TabPane>
        <Tabs.TabPane tab={<><SettingOutlined /> Configure</>} key='config'>
          <ActionKeysConfig {...{ actionKeys }} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
})

export default KeyBindingsGame
