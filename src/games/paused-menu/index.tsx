import GameComponent from '../../types/GameComponent'
import { Typography } from 'antd'
import arrayJoin from '../../util/arrayJoin'
import useScreen, { Screen } from '../../util/game-with-settings/useScreen'
import useComponentSize from '@rehooks/component-size'
import { GameWithActions } from '../../util/game-with-settings'
import defaultPauseSetting from '../../defaultPauseSetting'
import { css } from '@emotion/css'
import centerStyles from '../../centerStyles'
import { usePressEmitter } from '../../util/boolean-game-settings'
import { observer } from 'mobx-react-lite'

const settings = [defaultPauseSetting]

export const Game: GameComponent = observer((_props, ref) => {
  const useScreenResult = useScreen()
  const [screen] = useScreenResult
  const size = useComponentSize(ref as any)
  const pauseEmitter = usePressEmitter(defaultPauseSetting)

  return (
    <GameWithActions
      {...{ size, ref, useScreenResult, settings, pauseEmitter }}
      className={css(centerStyles)}
    >
      <div>
        <h1>{screen === Screen.PLAYING ? 'Playing Game' : 'Game Blurred'}</h1>
        Press {arrayJoin([...defaultPauseSetting.keyBindings].map(key =>
          <Typography.Text keyboard key={key}>{key}</Typography.Text>), ' or ')} to {' '}
        {screen === Screen.PLAYING ? 'pause' : 'resume'} game
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
