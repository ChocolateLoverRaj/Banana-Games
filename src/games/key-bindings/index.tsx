import GameComponent from '../../types/GameComponent'
import { Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions } from '../../util/gameWithSettings'
import { css } from '@emotion/css'
import { observer } from 'mobx-react-lite'
import centerStyles from '../../centerStyles'
import settings from './settings'
import { useGameWithSettings } from '../../util/gameWithSettings/useGameWithSettings'
import pauseSetting from './pauseSetting'

export const Game: GameComponent = observer((_props, ref) => {
  const game = useGameWithSettings({
    settings,
    pauseSetting,
    idPrefix: 'key-bindings'
  })

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ ref, game }}
      className={css(centerStyles)}
    >
      <div>
        <h1>Pressed Keys</h1>
        {/* {[...settingsWithContext].map(([key, { defaultData: data }]) =>
          <Tag.CheckableTag
            key={key}
            checked={mobxIsInputPressed(
              data,
              touchButtonsPressed.get(key) ?? never(),
              mobxKeysPressed)}
          >
            {data.name}
          </Tag.CheckableTag>)} */}
      </div>
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
