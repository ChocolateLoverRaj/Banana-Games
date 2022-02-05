import GameComponent from '../../types/GameComponent'
import { Tag, Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions, useScreen } from '../../util/game-with-settings'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import centerStyles from '../../centerStyles'
import settings from './settings'
import { mobxIsInputPressed, usePressEmitter } from '../../util/boolean-game-settings'
import pauseSetting from './pauseSetting'
import MobxKeysPressed from '../../util/MobxKeysPressed'
import { useState } from 'react'
import { initialize } from '../../util/mobx-emitter-value'

export const Game: GameComponent = observer((_props, ref) => {
  const pauseEmitter = usePressEmitter(pauseSetting)
  const [mobxKeysPressed] = useState(() => new MobxKeysPressed())
  const [touchButtonsPressed] = useState(() => settings.map(({ context }) => initialize<[boolean]>(context, [false])))
  const screen = useScreen(pauseEmitter)

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ ref, settings, screen }}
      className={css(centerStyles)}
    >
      <div>
        <h1>Pressed Keys</h1>
        {settings.map(({ data }, index) =>
          <Tag.CheckableTag
            key={data.name}
            checked={mobxIsInputPressed(data, touchButtonsPressed[index], mobxKeysPressed)}
          >
            {data.name}
          </Tag.CheckableTag>)}
      </div>
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
