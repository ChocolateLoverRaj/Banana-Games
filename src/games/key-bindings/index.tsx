import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { Tag, Tabs } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { game } from './index.module.scss'
import { Map, Set as ImmutableSet } from 'immutable'
import { ActionKeys, useActionsPressed, ActionKeysConfig } from '../../util/action-keys'

const actions = ['up', 'down', 'left', 'right'] as const
type Action = typeof actions[number]

const actionKeys = new ActionKeys<Action>(Map<Action, ImmutableSet<string>>()
  .set('up', ImmutableSet.of('ArrowUp', 'KeyW'))
  .set('down', ImmutableSet.of('ArrowDown', 'KeyS'))
  .set('left', ImmutableSet.of('ArrowLeft', 'KeyA'))
  .set('right', ImmutableSet.of('ArrowRight', 'KeyD'))
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