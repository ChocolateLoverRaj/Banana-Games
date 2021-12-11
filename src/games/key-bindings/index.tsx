import GameComponent from '../../types/GameComponent'
import { Tag, Typography } from 'antd'
import config from '../../config.json'
import { GameWithActions } from '../../util/game-with-settings'
import { css } from '@emotion/css'
import defaultPauseSetting from '../../defaultPauseSetting'
import { observer, useLocalObservable } from 'mobx-react-lite'
import centerStyles from '../../centerStyles'
import settings from './settings'
import { MobxInputPressed, usePressEmitter } from '../../util/boolean-game-settings'

export const Game: GameComponent = observer((_props, ref) => {
  const pauseEmitter = usePressEmitter(defaultPauseSetting)
  const settingInputs = useLocalObservable(
    () => settings.map(setting => new MobxInputPressed(setting)))

  // TODO - don't allow duplicate keybindings
  return (
    <GameWithActions
      {...{ ref, settings, pauseEmitter }}
      className={css(centerStyles)}
    >
      <div>
        <h1>Pressed Keys</h1>
        {settingInputs.map(({ booleanGameSetting, pressed }) =>
          <Tag.CheckableTag key={booleanGameSetting.displayName} checked={pressed}>
            {booleanGameSetting.displayName}
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
