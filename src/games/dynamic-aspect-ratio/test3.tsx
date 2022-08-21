import { forwardRef } from 'react'
import GameComponent from '../../types/GameComponent'

export const Game: GameComponent = forwardRef((_props, ref) => {
  return (
    <>
      Game
    </>
  )
})

export const description = (
  <>
    Some games can work with a range of aspect ratios. Those games take up all the available
    space on the screen.
  </>
)

export const meta = { name: 'Test 3' }
