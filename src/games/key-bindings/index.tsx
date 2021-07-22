import { forwardRef, useState } from 'react'
import GameComponent from '../../types/GameComponent'
import { Tag, Tabs, Button } from 'antd'
import {
  ControlOutlined,
  PauseOutlined,
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { game, paused as pausedStyle, pausedContent } from './index.module.scss'
import { Map, Set as ImmutableSet } from 'immutable'
import {
  ActionInputs,
  useActionsPressed,
  ActionKeysConfig,
  useOnAction,
  useCurrentInputs
} from '../../util/action-inputs'
import Input from '../../util/action-inputs/types/Input'
import PausedMenu from '../../PausedMenu'
import TouchInputs from '../../util/action-inputs/TouchInputs'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import TouchButtonsConfig from '../../util/action-inputs/TouchButtonsConfig'
import useComponentSize from '@rehooks/component-size'
import { detectTouch } from 'detect-touch'

const actions = ['up', 'down', 'left', 'right', 'back'] as const
type Action = typeof actions[number]

const arrowSize = 50
const arrowSpace = 10
const actionInputs = new ActionInputs<Action>(Map<Action, Input>()
  .set('up', {
    keyboard: ImmutableSet.of('ArrowUp', 'KeyW'),
    touch: {
      buttonContents: <UpOutlined />,
      buttons: ImmutableSet.of({
        x: {
          value: arrowSpace * 2 + arrowSize,
          reverse: false
        },
        y: {
          value: arrowSpace * 3 + arrowSize * 2,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      })
    }
  })
  .set('down', {
    keyboard: ImmutableSet.of('ArrowDown', 'KeyS'),
    touch: {
      buttonContents: <DownOutlined />,
      buttons: ImmutableSet.of({
        x: {
          value: arrowSpace * 2 + arrowSize,
          reverse: false
        },
        y: {
          value: arrowSpace,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      })
    }
  })
  .set('left', {
    keyboard: ImmutableSet.of('ArrowLeft', 'KeyA'),
    touch: {
      buttonContents: <LeftOutlined />,
      buttons: ImmutableSet.of({
        x: {
          value: arrowSpace,
          reverse: false
        },
        y: {
          value: arrowSpace * 2 + arrowSize,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      })
    }
  })
  .set('right', {
    keyboard: ImmutableSet.of('ArrowRight', 'KeyD'),
    touch: {
      buttonContents: <RightOutlined />,
      buttons: ImmutableSet.of({
        x: {
          value: arrowSpace * 3 + arrowSize * 2,
          reverse: false
        },
        y: {
          value: arrowSpace * 2 + arrowSize,
          reverse: true
        },
        width: arrowSize,
        height: arrowSize
      })
    }
  })
  .set('back', {
    keyboard: ImmutableSet.of('Escape', 'KeyP'),
    touch: {
      buttonContents: <PauseOutlined />,
      buttons: ImmutableSet.of({
        x: {
          value: 10,
          reverse: true
        },
        y: {
          value: 10,
          reverse: false
        },
        width: 50,
        height: 50
      })
    }
  })
)
const touchButtons = new TouchButtons(actionInputs)

enum Screen { PLAYING, PAUSED, TOUCH_EDIT }

const KeyBindingsGame: GameComponent = forwardRef((_props, ref) => {
  const actionsPressed = useActionsPressed(actionInputs, touchButtons)
  const [currentInputs] = useCurrentInputs(actionInputs)
  const size = useComponentSize(ref as any)

  const [screen, setScreen] = useState(Screen.PLAYING)

  useOnAction(actionInputs, touchButtons, 'back', setScreen.bind(undefined, Screen.PAUSED))

  // TODO - don't allow duplicate keybindings
  return (
    <div ref={ref} className={game}>
      <div>
        <h1>Pressed Keys</h1>
        {actions.map(action =>
          <Tag.CheckableTag key={action} checked={actionsPressed.has(action)}>
            {action}
          </Tag.CheckableTag>)}
      </div>
      {(detectTouch() as boolean) && (screen === Screen.TOUCH_EDIT
        ? <TouchButtonsConfig
            {...{ actionInputs }}
            onExit={setScreen.bind(undefined, Screen.PAUSED)}
            boundary={size}
          />
        : <TouchInputs touchButtons={touchButtons} />)}
      {screen === Screen.PAUSED && (
        <div className={pausedStyle}>
          <div className={pausedContent}>
            <PausedMenu
              onClose={setScreen.bind(undefined, Screen.PLAYING)}
              backKeys={currentInputs.get('back')?.keyboard as ImmutableSet<string>}
            >
              {[{
                title: 'Controls',
                content: (
                  <Tabs>
                    <Tabs.TabPane key='keyboard' tab='Keyboard'>
                      <ActionKeysConfig {...{ actionInputs }} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key='touch' tab='Touch' disabled={!(detectTouch() as boolean)}>
                      <Button onClick={setScreen.bind(undefined, Screen.TOUCH_EDIT)}>
                        Edit Buttons
                      </Button>
                    </Tabs.TabPane>
                  </Tabs>
                ),
                icon: <ControlOutlined />
              }]}
            </PausedMenu>
          </div>
        </div>
      )}
    </div>
  )
})

export default KeyBindingsGame
