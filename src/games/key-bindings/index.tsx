import GameComponent from '../../types/GameComponent'
import { Tag, Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions, useScreen } from '../../util/gameWithSettings'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import centerStyles from '../../centerStyles'
import settings from './settings'
import { mobxIsInputPressed, usePressEmitter } from '../../util/booleanGameSettings'
import pauseSetting from './pauseSetting'
import MobxKeysPressed from '../../util/MobxKeysPressed'
import { useState } from 'react'
import { initialize as initializeEmitterValue } from '../../util/mobxEmitterValue'
import LoadSettings from './LoadSettings'

export const Game: GameComponent = observer((_props, ref) => {
  const pauseEmitter = usePressEmitter(pauseSetting)
  const [mobxKeysPressed] = useState(() => new MobxKeysPressed())
  const [touchButtonsPressed] = useState(() =>
    settings.map(({ context }) => initializeEmitterValue<[boolean]>(context, [false])))
  const screen = useScreen(pauseEmitter)

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ ref, settings, screen }}
      className={css(centerStyles)}
    >
      <LoadSettings settings={settings.map(setting => setting.data)} idPrefix='key-bindings'>
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
      </LoadSettings>
    </GameWithActions>
  )
}, { forwardRef: true })

export const description = (
  <>
    <h2>
      Reason
    </h2>
    <Typography.Paragraph>
      One of the most important things in a game is user input. Without user input, a game wouldn't
      be a game.
    </Typography.Paragraph>

    <h2>Devices</h2>
    <Typography.Paragraph>
      One of {config.appName}'s goals is to create games that are playable on most devices. Games
      have to support both keyboard input for devices like laptops and desktop computers, and touch
      input from tablets and phones. For touch inputs, there are buttons on the screen to press.
    </Typography.Paragraph>

    <h2>Customize</h2>
    <Typography.Paragraph>
      Another goal that comes with inputs is the ability to customize the inputs. For keyboard
      inputs, the keybindings can be changed, and multiple keys can also be used for the same
      action. For touch inputs, buttons can be moved around.
    </Typography.Paragraph>

    <h3>Saving</h3>
    <Typography.Paragraph>
      In this game, all settings are auto-saved when they are changed, and they are loaded at the
      beginning. This feature will be added to the other games.
    </Typography.Paragraph>
  </>
)
