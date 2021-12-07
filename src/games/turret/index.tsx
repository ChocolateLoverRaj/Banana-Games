import GameComponent from '../../types/GameComponent'
import { observer } from 'mobx-react-lite'
import { GameWithActions, useScreen } from '../../util/game-with-actions'
import { useState } from 'react'
import TouchButtons from '../../util/action-inputs/TouchButtons'
import actionInputs from './actionInputs'
import { css } from '@emotion/css'
import centerStyles from '../../centerStyles'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import farContainerStyles from '../../farContainerStyles'
import farStyles from '../../farStyles'
import Canvas from './Canvas'
import { Screen } from '../../util/game-with-actions/useScreen'

export const Game: GameComponent = observer((_props, ref) => {
  const [touchButtons] = useState(() => new TouchButtons(actionInputs))

  const size = useComponentSize(ref as any)
  const scaledSize = getScaledSize(size, { width: 1, height: 1 })
  const useScreenResult = useScreen()
  const [screen] = useScreenResult

  return (
    <GameWithActions
      {...{ ref, useScreenResult }}
      inputs={{ touchButtons, back: 'back' }}
      className={css(centerStyles, farContainerStyles)}
    >
      <div
        className={css(farStyles)}
        style={scaledSize}
      >
        <Canvas size={scaledSize.width} playing={screen === Screen.PLAYING} />
      </div>
    </GameWithActions>
  )
}, { forwardRef: true })

export const description = (
  <>
    This game is a mini demo of an upcoming 2D tank game. In this game, you control the turret.
  </>
)
