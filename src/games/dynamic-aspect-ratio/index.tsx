import * as React from 'react'
import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import GameComponent from '../../types/GameComponent'
import { GameWithActions, useScreen } from '../../util/game-with-actions'

const DynamicAspectRatio: GameComponent = forwardRef((_props, ref) => {
  const { width, height } = useComponentSize(ref as any)
  const useScreenResult = useScreen()

  return (
    <GameWithActions loadedGameConfig={{ useScreenResult }} ref={ref}>
      <span>{width}x{height}</span>
    </GameWithActions>
  )
})

DynamicAspectRatio.description = (
  <>
    Some games can work with a range of aspect ratios. Those games take up all the available
    space on the screen.
  </>
)

export default DynamicAspectRatio
