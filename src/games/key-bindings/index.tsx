import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { Tag, Typography } from 'antd'
import {
  PauseOutlined,
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { Map, Set as ImmutableSet } from 'immutable'
import {
  ActionInputs,
  useActionsPressed
} from '../../util/action-inputs'
import Input from '../../util/action-inputs/types/Input'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import useComponentSize from '@rehooks/component-size'
import config from '../../config.json'
import useConstant from 'use-constant'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { game } from './index.module.scss'

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

const KeyBindingsGame: GameComponent = forwardRef((_props, ref) => {
  const touchButtons = useConstant(() => new TouchButtons(actionInputs))
  const actionsPressed = useActionsPressed(actionInputs, touchButtons)
  const size = useComponentSize(ref as any)
  const useScreenResult = useScreen()

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ size, ref }}
      loadedGameConfig={{ useScreenResult, inputs: { actionInputs, touchButtons, back: 'back' } }}
      className={game}
    >
      <h1>Pressed Keys</h1>
      {actions.map(action =>
        <Tag.CheckableTag key={action} checked={actionsPressed.has(action)}>
          {action}
        </Tag.CheckableTag>)}
    </GameWithActions>
  )
})

KeyBindingsGame.description = (
  <>
    <Typography.Paragraph>
      One of the most important things in a game is user input. Without user input, a game wouldn't
      be a game.
    </Typography.Paragraph>
    <Typography.Paragraph>
      One of {config.appName}'s goals is to create games that are playable on most devices. Games
      have to support both keyboard input for devices like laptops and desktop computers, and touch
      input from tablets and phones. For touch inputs, there are buttons on the screen to press.
    </Typography.Paragraph>
    <Typography.Paragraph>
      Another goal that comes with inputs is the ability to customize the inputs. For keyboard
      inputs, the keybindings can be changed, and multiple keys can also be used for the same
      action. For touch inputs, buttons can be moved around.
    </Typography.Paragraph>
  </>
)

export default KeyBindingsGame
