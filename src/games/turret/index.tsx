import GameComponent from '../../types/GameComponent'
import { observer } from 'mobx-react-lite'
import { GameWithActions, useScreen } from '../../util/game-with-settings'
import settings from './settings'
import { css } from '@emotion/css'
import centerStyles from '../../centerStyles'
import useComponentSize from '@rehooks/component-size'
import getScaledSize from '../../util/getScaledSize'
import farContainerStyles from '../../farContainerStyles'
import farStyles from '../../farStyles'
import Canvas from './Canvas'
import { usePressEmitter } from '../../util/boolean-game-settings'
import pauseSetting from './pauseSetting'

export const Game: GameComponent = observer((_props, ref) => {
  const size = useComponentSize(ref as any)
  const scaledSize = getScaledSize(size, { width: 1, height: 1 })
  const pauseEmitter = usePressEmitter(pauseSetting)
  const screen = useScreen(pauseEmitter)

  return (
    <GameWithActions
      {...{ ref, settings, screen }}
      className={css(centerStyles, farContainerStyles)}
    >
      <div
        className={css(farStyles)}
        style={scaledSize}
      >
        <Canvas size={scaledSize.width} screen={screen} />
      </div>
    </GameWithActions>
  )
}, { forwardRef: true })

export const description = (
  <>
    This game is a mini demo of an upcoming 2D tank game. In this game, you control the turret.
  </>
)
