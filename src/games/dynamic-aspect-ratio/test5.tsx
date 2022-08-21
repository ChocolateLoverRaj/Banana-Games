import { forwardRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import GameComponent from '../../types/GameComponent'
import { GameWithActions } from '../../util/gameWithSettings'

export const Game: GameComponent = forwardRef((_props, ref) => {
  const { width, height } = useComponentSize(ref as any)

  return (
    <GameWithActions
      ref={ref}
    >
      <span>{width}x{height}</span>
    </GameWithActions>
  )
})

export const description = (
  <>
    Some games can work with a range of aspect ratios. Those games take up all the available
    space on the screen.
  </>
)

export const meta = { name: 'Test 5' }
