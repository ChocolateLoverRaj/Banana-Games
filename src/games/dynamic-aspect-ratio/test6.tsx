import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'
import { GameWithActions } from '../../util/gameWithSettings'
import { css } from '@emotion/css'
import borderStyles from '../../borderStyles'

export const Game: GameComponent = forwardRef((_props, ref) => {
  return (
    <GameWithActions
      ref={ref}
      className={css(borderStyles)}
    >
      Game
    </GameWithActions>
  )
})

export const description = (
  <>
    Some games can work with a range of aspect ratios. Those games take up all the available
    space on the screen.
  </>
)

export const meta = 'Test 6'
