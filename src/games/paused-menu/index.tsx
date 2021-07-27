import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { game } from './index.module.scss'
import { Typography } from 'antd'
import never from 'never'
import arrayJoin from '../../util/arrayJoin'
import { ActionInputs, useCurrentInputs } from '../../util/action-inputs'
import { Map, Set } from 'immutable'
import useConstant from 'use-constant'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import useScreen, { Screen } from '../../util/game-with-actions/useScreen'
import useComponentSize from '@rehooks/component-size'

import { PauseOutlined } from '@ant-design/icons'
import { GameWithActions } from '../../util/game-with-actions'

type Action = 'back'

const actionInputs = new ActionInputs<Action>(Map([['back', {
  keyboard: Set.of('Escape', 'KeyP'),
  touch: {
    buttonContents: <PauseOutlined />,
    buttons: Set.of({
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
}]]))

const MenuGame: GameComponent = forwardRef((_props, ref) => {
  const touchButtons = useConstant(() => new TouchButtons(actionInputs))
  const useScreenResult = useScreen()
  const [screen] = useScreenResult
  const [currentInputs] = useCurrentInputs(actionInputs)
  const size = useComponentSize(ref as any)

  const backButtons = [...currentInputs.get('back')?.keyboard ?? never('No input for back action')]

  return (
    <div ref={ref} className={game}>
      <GameWithActions {...{ actionInputs, touchButtons, size, useScreenResult }} back='back'>
        <h1>{screen === Screen.PLAYING ? 'Playing Game' : 'Game Blurred'}</h1>
        Press {arrayJoin(backButtons.map(key =>
          <Typography.Text keyboard key={key}>{key}</Typography.Text>), ' or ')} to {' '}
        {screen === Screen.PLAYING ? 'pause' : 'resume'} game
      </GameWithActions>
    </div>
  )
})

MenuGame.description = (
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

export default MenuGame
