import GameComponent from '../../types/GameComponent'
import { Tag, Typography } from 'antd'
import {
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import {
  ActionInputs,
  MobxActionsPressed
} from '../../util/action-inputs'
import Input from '../../util/action-inputs/types/Input'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import useComponentSize from '@rehooks/component-size'
import config from '../../config.json'
import useConstant from 'use-constant'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { css } from '@emotion/css'
import defaultPauseInput from '../../defaultPauseInput'
import getBackgroundColor from '../../getBackgroundColor'
import { observer, useLocalObservable } from 'mobx-react-lite'

const actions = ['up', 'down', 'left', 'right', 'back'] as const
type Action = typeof actions[number]

const arrowSize = 50
const arrowSpace = 10
const actionInputs = new ActionInputs<Action>(new Map<Action, Input>()
  .set('up', {
    keyboard: new Set(['ArrowUp', 'KeyW']),
    touch: {
      buttonContents: <UpOutlined />,
      buttons: new Set([{
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
      }])
    }
  })
  .set('down', {
    keyboard: new Set(['ArrowDown', 'KeyS']),
    touch: {
      buttonContents: <DownOutlined />,
      buttons: new Set([{
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
      }])
    }
  })
  .set('left', {
    keyboard: new Set(['ArrowLeft', 'KeyA']),
    touch: {
      buttonContents: <LeftOutlined />,
      buttons: new Set([{
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
      }])
    }
  })
  .set('right', {
    keyboard: new Set(['ArrowRight', 'KeyD']),
    touch: {
      buttonContents: <RightOutlined />,
      buttons: new Set([{
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
      }])
    }
  })
  .set('back', defaultPauseInput)
)

export const Game: GameComponent = observer((_props, ref) => {
  const touchButtons = useConstant(() => new TouchButtons(actionInputs))
  const actionsPressed =
    useLocalObservable(() => new MobxActionsPressed(touchButtons))
  const size = useComponentSize(ref as any)
  const useScreenResult = useScreen()

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ size, ref }}
      loadedGameConfig={{ useScreenResult, inputs: { touchButtons, back: 'back' } }}
      className={css({
        textAlign: 'center',
        backgroundColor: getBackgroundColor()
      })}
    >
      <h1>Pressed Keys</h1>
      {actions.map(action =>
        <Tag.CheckableTag key={action} checked={actionsPressed.actionsPressed.has(action)}>
          {action}
        </Tag.CheckableTag>)}
    </GameWithActions>
  )
}, { forwardRef: true })

export const description = (
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
