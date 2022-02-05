import GameComponent from '../../types/GameComponent'
import { Typography } from 'antd'
import arrayJoin from '../../util/arrayJoin'
import { GameWithActions, ScreenEnum, useScreen } from '../../util/game-with-settings'
import useComponentSize from '@rehooks/component-size'
import pauseSettingData from '../../pauseSettingData'
import { css } from '@emotion/css'
import centerStyles from '../../centerStyles'
import { observer } from 'mobx-react-lite'
import { GameSetting } from '../../util/game-setting'
import { Context, Data as BooleanSettingData, booleanGameSettingFns, usePressEmitter } from '../../util/boolean-game-settings'
import { get } from '../../util/mobx-emitter-value'

const context: Context = new Set()
const settings: Array<GameSetting<BooleanSettingData, Context>> = [{
  data: pauseSettingData,
  fns: booleanGameSettingFns,
  context
}]

export const Game: GameComponent = observer((_props, ref) => {
  const size = useComponentSize(ref as any)
  const pauseEmitter = usePressEmitter({ data: pauseSettingData, context })
  const screen = useScreen(pauseEmitter)
  const [currentScreen] = get(screen.mobx)

  return (
    <GameWithActions
      {...{ size, ref, screen, settings }}
      className={css(centerStyles)}
    >
      <div>
        <h1>{currentScreen === ScreenEnum.PLAYING ? 'Playing Game' : 'Game Blurred'}</h1>
        Press {arrayJoin([...pauseSettingData.keyBindings].map(key =>
          <Typography.Text keyboard key={key}>{key}</Typography.Text>), ' or ')} to {' '}
        {currentScreen === ScreenEnum.PLAYING ? 'pause' : 'resume'} game
      </div>
    </GameWithActions>
  )
}, { forwardRef: true })

export const description = (
  <>
    <Typography.Paragraph>
      One key feature a game needs is a pause button. Besides pausing the game, a pause screen
      can lead to many more buttons and screens, for editing settings, viewing stats, and more.
    </Typography.Paragraph>
    <Typography.Paragraph>
      Games are automatically paused when the current tab stops being visible using the {' '}
      <a href='https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API'>
        Page Visibility API
      </a>. You can disable this in the settings.
    </Typography.Paragraph>
  </>
)
