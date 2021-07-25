import { useEffect, forwardRef } from 'react'
import { Typography } from 'antd'
import useVisible from '../../util/useVisible'
import arrayJoin from '../../util/arrayJoin'
import { ActionInputs, useCurrentInputs } from '../../util/action-inputs'
import { Map, Set } from 'immutable'
import useConstant from 'use-constant'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import useScreen, { Screen } from '../../util/game-with-actions/useScreen'
import useComponentSize from '@rehooks/component-size'
import never from 'never'
import { PauseOutlined } from '@ant-design/icons'
import { GameWithActions } from '../../util/game-with-actions'

export interface GameProps {
  pausedWhenNotVisible: boolean
}

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

const Game = forwardRef<HTMLDivElement, GameProps>((props, ref) => {
  const { pausedWhenNotVisible } = props

  const touchButtons = useConstant(() => new TouchButtons(actionInputs))
  const visible = useVisible()
  const useScreenResult = useScreen()
  const [screen, setScreen] = useScreenResult
  const [currentInputs] = useCurrentInputs(actionInputs)
  const size = useComponentSize(ref as any)

  useEffect(() => {
    if (!visible && pausedWhenNotVisible && screen === Screen.PLAYING) setScreen(Screen.PAUSED)
  }, [pausedWhenNotVisible, visible])

  const backButtons = [...currentInputs.get('back')?.keyboard ?? never('No input for back action')]

  return (
    <GameWithActions {...{ actionInputs, touchButtons, size, useScreenResult }} back='back'>
      <h1>{screen === Screen.PLAYING ? 'Playing Game' : 'Game Blurred'}</h1>
      Press {arrayJoin(backButtons.map(key =>
        <Typography.Text keyboard key={key}>{key}</Typography.Text>), ' or ')} to {' '}
      {screen === Screen.PLAYING ? 'pause' : 'resume'} game
    </GameWithActions>
  )
})

export default Game
